import { ExcludeObjectExceptArray, Extends, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ActionFunctions, ReducerMap } from "redux-actions";
import { If } from "typescript-logic";
import { ReducerFactory } from "./ReducerFactory";
import { IfNot2, PreferPrimitivesOverProps, PropsAndTypesExcept, UnionPrimitiveTypesAndArrays, UnionProps, UnionPropsAndTypes, UnionPropsAndTypesExcept, UnionPropsExcept } from "./utilityTypes";

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
        If< // If
            Extends<MixedExpandStateMode, ReducerFactoryInheritStateMode>,
            InheritedStateUnionPropsAndTypes<_ReducedState, KnownState, UnknownState>,
            If< // Else if
                Extends<MixedExpandStateMode, ReducerFactoryRetainStateMode>,
                // UnionPropsAndTypes<UnknownState, _ReducedState>,
                /*
                If we want to retain the UnknownState, then we only want UnknownState as *next* state
                This logic eliminates the bug, that any[] or [] gets unioned, that are assignable to any other typed arrays,
                The behaviour is reflected in the tests.
                */
                UnknownState,
                // Else
                UnionPropsAndTypes<UnknownState, _ReducedState>
            >
        >,
        _ReducedState
    >;

export type FinalState<KnownState, UnknownState> = UnionPropsAndTypes<KnownState, UnknownState>;

export type PartialReducerContext<KnownState, UnknownState> = {
    initialKnownState: FinalState<KnownState, UnknownState>,
};

export type ReducerFactoryOptions<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    /* They are needed for inference purposes */
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = {
        knownState?: KnownState;
        knownReducerMap: ReducerMap<KnownState, KnownStatePayload>;
        unknownReducerMap: ReducerMap<UnknownState, UnknownStatePayload>;
    };

export type ReducerKnownState<_State, KnownState, IsKnownStateKnown> = If<
    Extends<IsKnownStateKnown, null>,
    UnionPropsAndTypesExcept<KnownState, _State>,
    KnownState
>;

export type ReducerReducerFactoryOptions<
    LocalState,
    LocalPayload,
    LocalExpandStateMode extends ReducerFactoryExpandStateMode,
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = ReducerFactoryOptions<
        ReducerKnownState<LocalState, KnownState, IsKnownStateKnown>,
        KnownStatePayload,
        ExtendedUnknownState<
            LocalState,
            LocalExpandStateMode,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload | LocalPayload,
        IsKnownStateKnown,
        null,
        ExpandStateMode>;


export type ReducerReducerFactory<
    LocalState,
    LocalPayload,
    LocalExpandStateMode extends ReducerFactoryExpandStateMode,
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = ReducerFactory<
        ReducerKnownState<LocalState, KnownState, IsKnownStateKnown>,
        KnownStatePayload,
        ExtendedUnknownState<
            LocalState,
            LocalExpandStateMode,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload | LocalPayload,
        IsKnownStateKnown,
        null,
        ExpandStateMode
    >;

export class ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > {
    protected options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    >;

    public constructor(options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    >) {
        this.options = {
            knownState: options.knownState,
            knownReducerMap: options.knownReducerMap || {},
            unknownReducerMap: options.unknownReducerMap || {},
        };
    }

    /** Get the initial known state you build up with `acceptUnknownState` and `toReducer`. */
    public get initialKnownState(): UnionPropsAndTypes<KnownState, UnknownState> {
        return this.options.knownState! as any;
    }
}
