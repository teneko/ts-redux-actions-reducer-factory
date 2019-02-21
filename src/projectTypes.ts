import { ExcludeObjectExceptArray, Extends, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ReducerMap } from "redux-actions";
import { If, Or } from "typescript-logic";
import { ActionTypeOrActionCreator, TakeFirstIfFirstExtendsNotCase, PreferPrimitivesOverEmptyProps, PropsAndTypesExcept, UnionPrimitiveTypesAndArrays, UnionProps, UnionPropsAndTypes, UnionPropsAndTypesExcept, UnionPropsExcept } from "./utilityTypes";

export type Known = "known";
export type Unknown = "unknown";
export type Knowledge = Known | Unknown;


export type ReducerFactoryExtendStateMode = "ExtendState";
export type ReducerFactoryInheritStateMode = "InheritState";
export type ReducerFactoryRetainStateMode = "RetainState";

export type ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode | ReducerFactoryInheritStateMode | ReducerFactoryRetainStateMode;
export type DefaultReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode;
export type IndefinableReducerFactoryExpandStateMode = ReducerFactoryExpandStateMode | undefined;

export type Prefer$OverExpandStateMode<$ExpandStateMode extends ReducerFactoryExpandStateMode, InterExpandStateMode extends IndefinableReducerFactoryExpandStateMode> =
    InterExpandStateMode extends undefined ? $ExpandStateMode : InterExpandStateMode;

/** Only for view, not calulcating. */
export type InheritedInterState<InterState, $KnownState, $UnknownState> = TakeFirstIfFirstExtendsNotCase<UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState>, ExcludeObjectExceptArray<InterState>> |
    (ExtractObjectExceptArray<InterState> &
        ExtractObjectExceptArray<$KnownState> &
        ExtractObjectExceptArray<$UnknownState>);

/** Only for view, not calulcating. */
export type ExtendedInterState<InterState, $KnownState, $UnknownState> = ExcludeObjectExceptArray<InterState> | ExcludeObjectExceptArray<$KnownState> | ExcludeObjectExceptArray<$UnknownState> |
    (ExtractObjectExceptArray<InterState> &
        UnionPropsExcept<ExtractObjectExceptArray<$KnownState>, ExtractObjectExceptArray<InterState>> &
        UnionPropsExcept<ExtractObjectExceptArray<$UnknownState>, ExtractObjectExceptArray<InterState>>);

/** Only for view, not calulcating. */
export type RetainedInterState<$KnownState, $UnknownState> = UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState> |
    (FinalState<$KnownState, $UnknownState>);

/** Only for view, not calulcating. */
export type ExpandedInterState<InterState, PreferredExpandStateMode extends ReducerFactoryExpandStateMode, $KnownState, $UnknownState> = If<
    Extends<PreferredExpandStateMode, ReducerFactoryInheritStateMode>,
    InheritedInterState<InterState, $KnownState, $UnknownState>,
    If<
        Extends<PreferredExpandStateMode, ReducerFactoryRetainStateMode>,
        RetainedInterState<$KnownState, $UnknownState>,
        ExtendedInterState<InterState, $KnownState, $UnknownState>
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

/** Used in the return type of any reducer addition. It exclude InterState from $KnownState. */
export type ReducerFactoryReducedKnownState<InterState, $KnownState, $IsKnownStateKnown> = If<
    Extends<$IsKnownStateKnown, Known>,
    UnionPropsAndTypesExcept<$KnownState, InterState>,
    $KnownState
>;

export type ReducerFactoryReducerInference<InterPayload, InterExpandStateMode extends IndefinableReducerFactoryExpandStateMode> = ActionTypeOrActionCreator<InterPayload> | [ActionTypeOrActionCreator<InterPayload>, InterExpandStateMode];


// too hard lagging
// export type InferableReducerReducerFactory<
//     State,
//     Payload,
//     ExpandStateMode extends ReducerFactoryExpandStateMode,
//     $KnownState,
//     $KnownStatePayload,
//     $UnknownState,
//     $UnknownStatePayload,
//     $IsKnownStateKnown extends Knowledge,
//     $IsUnknownStateKnown extends Knowledge,
//     $ExpandStateMode extends ReducerFactoryExpandStateMode,
//     __KnownState extends ReducerKnownState<State, $KnownState, $IsKnownStateKnown>,
//     __KnownStatePayload extends $KnownStatePayload,
//     __UnknownState extends ExtendedUnknownState<
//         State,
//         ExpandStateMode,
//         $KnownState,
//         $IsKnownStateKnown,
//         $UnknownState,
//         $IsUnknownStateKnown
//     >,
//     __UnknownStatePayload extends $UnknownStatePayload | Payload,
//     __IsKnownStateKnown extends $IsKnownStateKnown,
//     __IsUnknownStateKnown extends Known,
//     __ExpandStateMode extends $ExpandStateMode
//     > = any;


export type ReducerFactoryReducedState<State, $KnownState, $IsKnownStateKnown> = If<
    Extends<$IsKnownStateKnown, Known>,
    PropsAndTypesExcept<State, $KnownState>,
    State
>;

/**
 * We want the same behaviour like `UnionPropsAndTypes<UnknownState, ReducedState>`,
 * but we want prevent that the primitive export type gets extended for example by `any[]`
 */
export type InheritedStateUnionPropsAndTypes<State, $KnownState, $UnknownState> = PreferPrimitivesOverEmptyProps<
    UnionProps<ExtractObjectExceptArray<$UnknownState>, ExtractObjectExceptArray<State>>,
    TakeFirstIfFirstExtendsNotCase<UnionPrimitiveTypesAndArrays<$KnownState, $UnknownState>, ExcludeObjectExceptArray<State>>
>;

/** Whenever you need to expand unknown state, you would need it. */
export type ReducerFactoryExpandedUnknownState<
    InterState,
    PreferredExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $IsKnownStateKnown,
    $UnknownState,
    $IsUnknownStateKnown,
    __ReducedState extends ReducerFactoryReducedState<InterState, $KnownState, $IsKnownStateKnown> = ReducerFactoryReducedState<InterState, $KnownState, $IsKnownStateKnown>
    > = (
        If< // If $IsUnknownStateKnown is equals Known, ..
            Extends<$IsUnknownStateKnown, Known>,
            If< // If $UnknownState has the *same* type signature like State, or the retain expand mode is enabled, ..
                Or<Extends<$UnknownState, InterState>, Extends<PreferredExpandStateMode, ReducerFactoryRetainStateMode>>,
                // .. then we don't want to expand UnknownState, but rather we want to retain the type signature of UnknownState
                $UnknownState,
                If<
                    Extends<PreferredExpandStateMode, ReducerFactoryInheritStateMode>,
                    InheritedStateUnionPropsAndTypes<__ReducedState, $KnownState, $UnknownState>,
                    // If else we want to *extend* $UnknownState
                    UnionPropsAndTypes<$UnknownState, __ReducedState>
                >
            >,
            __ReducedState
        >
    );

/** This represents the final state type. DO NOT use it for intermediate type calculation. */
export type FinalState<$KnownState, $UnknownState> = UnionPropsAndTypes<$KnownState, $UnknownState>;

export type ReducerContext<$KnownState, $UnknownState> = {
    initialKnownState: FinalState<$KnownState, $UnknownState>,
};
