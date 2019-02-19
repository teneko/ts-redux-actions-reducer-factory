import { ExcludeObjectExceptArray, Extends, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ReducerMap } from "redux-actions";
import { If, Or } from "typescript-logic";
import { ActionTypeOrActionCreator, IfNot2, PreferPrimitivesOverProps, PropsAndTypesExcept, UnionPrimitiveTypesAndArrays, UnionProps, UnionPropsAndTypes, UnionPropsAndTypesExcept, UnionPropsExcept } from "./utilityTypes";

export type Known = "known";
export type Unknown = "unknown";
export type Knowledge = Known | Unknown;


export type ReducerFactoryExtendStateMode = "ExtendState";
export type ReducerFactoryInheritStateMode = "InheritState";
export type ReducerFactoryRetainStateMode = "RetainState";

export type ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode | ReducerFactoryInheritStateMode | ReducerFactoryRetainStateMode;
export type DefaultReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode;
export type IndefinableReducerFactoryExpandStateMode = ReducerFactoryExpandStateMode | undefined;

export type Prefer$OverExpandStateMode<$ExpandStateMode extends ReducerFactoryExpandStateMode, ExpandStateMode extends IndefinableReducerFactoryExpandStateMode> =
    ExpandStateMode extends undefined ? $ExpandStateMode : ExpandStateMode;


export type InheritedState<State, $KnownState, $UnknownState> = IfNot2<UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState>, ExcludeObjectExceptArray<State>> |
    (ExtractObjectExceptArray<State> &
        ExtractObjectExceptArray<$KnownState> &
        ExtractObjectExceptArray<$UnknownState>);

export type ExtendedState<State, $KnownState, $UnknownState> = ExcludeObjectExceptArray<State> | ExcludeObjectExceptArray<$KnownState> | ExcludeObjectExceptArray<$UnknownState> |
    (ExtractObjectExceptArray<State> &
        UnionPropsExcept<ExtractObjectExceptArray<$KnownState>, ExtractObjectExceptArray<State>> &
        UnionPropsExcept<ExtractObjectExceptArray<$UnknownState>, ExtractObjectExceptArray<State>>);

export type RetainedState<$KnownState, $UnknownState> = UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState> |
    (FinalState<$KnownState, $UnknownState>);

export type ExpandedState<State, ExpandStateMode extends ReducerFactoryExpandStateMode, $KnownState, $UnknownState> = If<
    Extends<ExpandStateMode, ReducerFactoryInheritStateMode>,
    InheritedState<State, $KnownState, $UnknownState>,
    If<
        Extends<ExpandStateMode, ReducerFactoryRetainStateMode>,
        RetainedState<$KnownState, $UnknownState>,
        ExtendedState<State, $KnownState, $UnknownState>
    >
>;


export type ReducerFactoryOptions<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    /* They are needed for inference purposes */
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > = {
        knownState?: $KnownState;
        knownReducerMap: ReducerMap<$KnownState, $KnownStatePayload>;
        unknownReducerMap: ReducerMap<$UnknownState, $UnknownStatePayload>;
        expandStateMode: $ExpandStateMode;
    };


export type ReducerKnownState<State, $KnownState, $IsKnownStateKnown> = If<
    Extends<Known, $IsKnownStateKnown>,
    UnionPropsAndTypesExcept<$KnownState, State>,
    $KnownState
>;

export type ReducerFactoryReducerInference<Payload, ExpandStateMode extends IndefinableReducerFactoryExpandStateMode> = ActionTypeOrActionCreator<Payload> | [ActionTypeOrActionCreator<Payload>, ExpandStateMode];


export type InferableReducerReducerFactory<
    State,
    Payload,
    ExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode,
    __KnownState extends ReducerKnownState<State, $KnownState, $IsKnownStateKnown>,
    __KnownStatePayload extends $KnownStatePayload,
    __UnknownState extends ExtendedUnknownState<
        State,
        ExpandStateMode,
        $KnownState,
        $IsKnownStateKnown,
        $UnknownState,
        $IsUnknownStateKnown
    >,
    __UnknownStatePayload extends $UnknownStatePayload | Payload,
    __IsKnownStateKnown extends $IsKnownStateKnown,
    __IsUnknownStateKnown extends Known,
    __ExpandStateMode extends $ExpandStateMode
    > = any;


export type ReducerFactoryReducedState<State, $KnownState, $IsKnownStateKnown> = If<
    Extends<Known, $IsKnownStateKnown>,
    PropsAndTypesExcept<State, $KnownState>,
    State
>;

/**
 * We want the same behaviour like `UnionPropsAndTypes<UnknownState, ReducedState>`,
 * but we want prevent that the primitive export type gets extended for example by `any[]`
 */
export type InheritedStateUnionPropsAndTypes<State, $KnownState, $UnknownState> = PreferPrimitivesOverProps<
    UnionProps<ExtractObjectExceptArray<$UnknownState>, ExtractObjectExceptArray<State>>,
    IfNot2<UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState>, ExcludeObjectExceptArray<State>>
>;

export type ExtendedUnknownState<
    State,
    ExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $IsKnownStateKnown,
    $UnknownState,
    $IsUnknownStateKnown,
    __ReducedState extends ReducerFactoryReducedState<State, $KnownState, $IsKnownStateKnown> = ReducerFactoryReducedState<State, $KnownState, $IsKnownStateKnown>
    > = If<
        Extends<Known, $IsUnknownStateKnown>,
        If< // If LocalState has the *same* type signature like UnknownState, or the retain expand mode is enabled, ..
            Or<Extends<$UnknownState, State>, Extends<ExpandStateMode, ReducerFactoryRetainStateMode>>,
            // .. then we don't want to expand UnknownState, but rather we want to retain the type signature of UnknownState
            $UnknownState,
            If<
                Extends<ExpandStateMode, ReducerFactoryInheritStateMode>,
                InheritedStateUnionPropsAndTypes<__ReducedState, $KnownState, $UnknownState>,
                UnionPropsAndTypes<$UnknownState, __ReducedState>
            >
        >,
        __ReducedState
    >;

export type FinalState<$KnownState, $UnknownState> = UnionPropsAndTypes<$KnownState, $UnknownState>;

export type ReducerContext<$KnownState, $UnknownState> = {
    initialKnownState: FinalState<$KnownState, $UnknownState>,
};
