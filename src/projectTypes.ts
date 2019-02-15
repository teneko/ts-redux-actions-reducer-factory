import { ExcludeObjectExceptArray, Extends, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { If, Or } from "typescript-logic";
import { IfNot2, PreferPrimitivesOverProps, PropsAndTypesExcept, UnionPrimitiveTypesAndArrays, UnionProps, UnionPropsAndTypes, UnionPropsExcept } from "./utilityTypes";

export type ActionTypeOrActionCreator<Payload> = ActionFunctions<Payload> | string;


export type ReducerFactoryExtendStateMode = "ExtendState";
export type ReducerFactoryInheritStateMode = "InheritState";
export type ReducerFactoryRetainStateMode = "RetainState";
export type ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode | ReducerFactoryInheritStateMode | ReducerFactoryRetainStateMode;

export type DefaultReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode;
export type IndefinableReducerFactoryExpandStateMode = ReducerFactoryExpandStateMode | undefined;

export type PreferLocalOverGlobalExpandStateMode<GlobalExpandStateMode extends ReducerFactoryExpandStateMode, LocalExpandStateMode extends IndefinableReducerFactoryExpandStateMode> =
    LocalExpandStateMode extends undefined ? GlobalExpandStateMode : LocalExpandStateMode;


export type InheritedState<State, KnownState, UnknownState> = IfNot2<UnionPrimitiveTypesAndArrays<KnownState, UnknownState>, ExcludeObjectExceptArray<State>> |
    (ExtractObjectExceptArray<State> &
        ExtractObjectExceptArray<KnownState> &
        ExtractObjectExceptArray<UnknownState>);

export type ExtendedState<State, KnownState, UnknownState> = ExcludeObjectExceptArray<State> | ExcludeObjectExceptArray<KnownState> | ExcludeObjectExceptArray<UnknownState> |
    (ExtractObjectExceptArray<State> &
        UnionPropsExcept<ExtractObjectExceptArray<KnownState>, ExtractObjectExceptArray<State>> &
        UnionPropsExcept<ExtractObjectExceptArray<UnknownState>, ExtractObjectExceptArray<State>>);

export type RetainedState<KnownState, UnknownState> = UnionPrimitiveTypesAndArrays<KnownState, UnknownState> |
    (FinalState<KnownState, UnknownState>);

export type ExpandedState<State, Mode extends ReducerFactoryExpandStateMode, KnownState, UnknownState> = If< // If
    Extends<Mode, ReducerFactoryInheritStateMode>,
    InheritedState<State, KnownState, UnknownState>,
    If< // else if
        Extends<Mode, ReducerFactoryRetainStateMode>,
        RetainedState<KnownState, UnknownState>,
        // else
        ExtendedState<State, KnownState, UnknownState>
    >
>;


export type ReducerFactoryReducerInference<Payload, Mode extends IndefinableReducerFactoryExpandStateMode> = ActionTypeOrActionCreator<Payload> | [ActionTypeOrActionCreator<Payload>, Mode];

export type ReducerFactoryReducedState<State, KnownState, IsKnownStateKnown> = If<
    Extends<IsKnownStateKnown, null>,
    PropsAndTypesExcept<State, KnownState>,
    State
>;

/**
 * We want the same behaviour like `UnionPropsAndTypes<UnknownState, ReducedState>`,
 * but we want prevent that the primitive export type gets extended for example by `any[]`
 */
export type InheritedStateUnionPropsAndTypes<ReducedState, KnownState, UnknownState> = PreferPrimitivesOverProps<
    UnionProps<ExtractObjectExceptArray<UnknownState>, ExtractObjectExceptArray<ReducedState>>,
    IfNot2<UnionPrimitiveTypesAndArrays<KnownState, UnknownState>, ExcludeObjectExceptArray<ReducedState>>
>;

export type ExtendedUnknownState<
    LocalState,
    MixedExpandStateMode extends ReducerFactoryExpandStateMode,
    KnownState,
    IsKnownStateKnown,
    UnknownState,
    IsUnknownStateKnown,
    _ReducedState extends ReducerFactoryReducedState<LocalState, KnownState, IsKnownStateKnown> = ReducerFactoryReducedState<LocalState, KnownState, IsKnownStateKnown>
    > = If<
        Extends<IsUnknownStateKnown, null>,
        If< // If LocalState has the *same* type signature like UnknownState, or the retain expand mode is enabled, ..
            Or<Extends<UnknownState, LocalState>, Extends<MixedExpandStateMode, ReducerFactoryRetainStateMode>>,
            // .. then we don't want to expand UnknownState, but rather we want to retain the type signature of UnknownState
            UnknownState,
            If<
                Extends<MixedExpandStateMode, ReducerFactoryInheritStateMode>,
                InheritedStateUnionPropsAndTypes<_ReducedState, KnownState, UnknownState>,
                UnionPropsAndTypes<UnknownState, _ReducedState>
            >
        >,
        _ReducedState
    >;

export type FinalState<KnownState, UnknownState> = UnionPropsAndTypes<KnownState, UnknownState>;

export type PartialReducerContext<KnownState, UnknownState> = {
    initialKnownState: FinalState<KnownState, UnknownState>,
};
