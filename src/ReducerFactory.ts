import { ReducerMap, ActionFunctions, Action, handleActions, Reducer } from "redux-actions";
import { If, Not, Or, And } from "typescript-logic";
import { Extends, ExtractObject, ExcludeObject, AnyKeys, ExtractObjectExceptArray, ExcludeObjectExceptArray } from "@teronis/ts-definitions";

/* UTILITY: TYPES */

type IfNot2<A, B, NotWhen = never> = If<
    Not<Extends<A, NotWhen>>,
    A,
    B
>;

type IfNot2AndAssign<A, B, Assignment, NotWhen = never> = Extract<IfNot2<A, B, NotWhen>, Assignment>

type IfNot3<N, A, B, NotWhen = never> = If<
    Not<Extends<N, NotWhen>>,
    A,
    B
>;

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
type IntersectProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>
    > = { [K in MutualKeys extends AnyKeys<A> & AnyKeys<B> ? MutualKeys : never]: A[K] | B[K] };

/** Does A have any object in his union? Returns export type of true or false. */
type HasExtractableObject<A> = Not<Extends<ExtractObject<A>, never>>;

type HasExtractableObjectWithoutArray<A> = Not<Extends<ExtractObjectExceptArray<A>, never>>;

/** Creates an union of any extractable objects. */
type UnionExtractableObjects<A, B> = If<
    // If A or B has object ..
    Or<HasExtractableObject<A>, HasExtractableObject<B>>,
    // .. then return the one or the other object
    ExtractObject<A> | ExtractObject<B>,
    // .. else
    {}
>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. */
type UnionPropsExcept<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNot3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNot3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    // > = TakeoverProps<IntersectProps<A, B, MutualKeys>, A, LeftKeys>
    > = IntersectProps<A, B, MutualKeys> & Pick<A, LeftKeys>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
type UnionProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNot3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNot3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    RightKeys extends IfNot3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>> = IfNot3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>>
    // > = TakeoverProps<UnionPropsExcept<A, B, MutualKeys, LeftKeys>, B, RightKeys>;
    > = UnionPropsExcept<A, B, MutualKeys, LeftKeys> & Pick<B, RightKeys>;

/** Intersect only the primitive types of Object A and Object B. */
type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

type IntersectPrimitiveTypesAndArrays<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
    > = ExcludeObjectExceptArray<Exclude<A2 | B2, Exclude<A2, B2> | Exclude<B2, A2>>>;

type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

type UnionPrimitiveTypesAndArraysExcept<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
    > = Exclude<A2 | B2, Exclude<B2, A2>>;

/** Create an union of the primitive types of Object A and Object B. */
type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;

type UnionPrimitiveTypesAndArrays<A, B> = ExcludeObjectExceptArray<A | B>;

type PreferPrimitivesOverProps<Props, Primitives> = If<
    And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
    Primitives,
    Props | Primitives
>;

type IntersectPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<IntersectProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, IntersectPrimitiveTypesAndArrays<A, B>>;

type UnionPropsAndTypesExcept<
    A, B,
    > = PreferPrimitivesOverProps<UnionPropsExcept<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArraysExcept<A, B>>;

type UnionPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<UnionProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArrays<A, B>>;

type PropsAndTypesExcept<A, B> = PreferPrimitivesOverProps<If<
    And<HasExtractableObjectWithoutArray<A>, HasExtractableObjectWithoutArray<B>>,
    Pick<ExtractObjectExceptArray<A>, Exclude<AnyKeys<ExtractObjectExceptArray<A>>, AnyKeys<ExtractObjectExceptArray<B>>>>,
    ExtractObjectExceptArray<A>
>, Exclude<ExcludeObjectExceptArray<A>, ExcludeObjectExceptArray<B>>>;

// type PreferFirstArray<A, B> = If<
//     And<Extends<A, any[]>, Extends<B, any[]>
//     >

/* UTILITY: TYPES & FUNCTIONS */

export type CombinableReducer<InvalidReduxReducer> = InvalidReduxReducer extends (state: infer S, action: infer A) => any ? (state: S | undefined, action: A) => S : never;

/** An utility function, that makes a reducer type defintion for `combineReducers` (@redux) valid by adding `undefined` to the state type definition. */
export function asCombinableReducer<S, A>(reducer: (state: S, action: A) => S) {
    return <CombinableReducer<typeof reducer>>reducer;
}

/* PROJECT: TYPES & CLASSES */

type ActionTypeOrActionCreator<Payload> = ActionFunctions<Payload> | string;

type ReducerFactoryExtendStateMode = "ExtendState";
type ReducerFactoryInheritStateMode = "InheritState";
type ReducerFactoryRetainStateMode = "RetainState";
type ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode | ReducerFactoryInheritStateMode | ReducerFactoryRetainStateMode;
type DefaultReducerFactoryExpandStateMode = ReducerFactoryExpandStateMode | undefined;

type PreferLocalOverGlobalExpandStateMode<GlobalExpandStateMode extends ReducerFactoryExpandStateMode, LocalExpandStateMode extends DefaultReducerFactoryExpandStateMode> = IfNot2AndAssign<
    LocalExpandStateMode,
    GlobalExpandStateMode,
    ReducerFactoryExpandStateMode,
    undefined>

type ReducerInference<Payload, Mode extends ReducerFactoryExpandStateMode | undefined> = ActionTypeOrActionCreator<Payload> | [ActionTypeOrActionCreator<Payload>, Mode];

type ReducedState<State, KnownState, IsKnownStateKnown> = If<
    Extends<IsKnownStateKnown, null>,
    PropsAndTypesExcept<State, KnownState>,
    State
>;

type ExtendedUnknownState<
    State,
    KnownState,
    IsKnownStateKnown,
    UnknownState,
    IsUnknownStateKnown,
    _ReducedState extends ReducedState<State, KnownState, IsKnownStateKnown> = ReducedState<State, KnownState, IsKnownStateKnown>
    > = If<
        Extends<IsUnknownStateKnown, null>,
        UnionPropsAndTypes<_ReducedState, UnknownState>,
        _ReducedState
    >;

type InheritedState<State, KnownState, UnknownState> = IfNot2<UnionPrimitiveTypesAndArrays<KnownState, UnknownState>, ExcludeObjectExceptArray<State>> |
    (ExtractObjectExceptArray<State> & KnownState & UnknownState);

type ExtendedState<State, KnownState, UnknownState> = ExcludeObjectExceptArray<State> | ExcludeObjectExceptArray<KnownState> | ExcludeObjectExceptArray<UnknownState> |
    (ExtractObjectExceptArray<State> & UnionPropsExcept<KnownState, State> & UnionPropsExcept<UnknownState, State>);

type RetainedState<KnownState, UnknownState> = UnionPrimitiveTypesAndArrays<KnownState, UnknownState> |
    KnownState & UnknownState;

type ExpandedState<State, Mode extends ReducerFactoryExpandStateMode, KnownState, UnknownState> = If<
    Extends<Mode, ReducerFactoryInheritStateMode>,
    InheritedState<State, KnownState, UnknownState>,
    If<
        Extends<Mode, ReducerFactoryRetainStateMode>,
        RetainedState<KnownState, UnknownState>,
        ExtendedState<State, KnownState, UnknownState>
    >
>;

type FinalState<KnownState, UnknownState> = UnionPropsAndTypes<KnownState, UnknownState>;

type PartialReducerContext<KnownState, UnknownState> = {
    initialKnownState: FinalState<KnownState, UnknownState>
};

export type ReducerFactoryOptions<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    /* They are needed for inference purposes */
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    > = {
        knownState?: KnownState;
        knownReducerMap: ReducerMap<KnownState, KnownStatePayload>;
        unknownReducerMap: ReducerMap<UnknownState, UnknownStatePayload>;
    };

type ReducerReducerFactoryOptions<
    State,
    Payload,
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null
    > = ReducerFactoryOptions<
        If<
            Extends<IsKnownStateKnown, null>,
            UnionPropsAndTypesExcept<KnownState, State>,
            KnownState
        >,
        KnownStatePayload,
        ExtendedUnknownState<
            State,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload | Payload,
        IsKnownStateKnown,
        null>;

export class ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    > {
    protected options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    >;

    public constructor(options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    >) {
        this.options = {
            knownState: options.knownState,
            knownReducerMap: options.knownReducerMap || {},
            unknownReducerMap: options.unknownReducerMap || {}
        };
    }

    /** Get the initial known state you build up with `acceptUnknownState` and `toReducer`. */
    public get initialKnownState(): UnionPropsAndTypes<KnownState, UnknownState> {
        return <any>this.options.knownState!;
    }
}

export class ReducerFactoryBox<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null = undefined,
    IsUnknownStateKnown extends undefined | null = undefined
    > extends ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown,
    IsUnknownStateKnown
    > {
    public constructor(base: ReducerFactoryBase<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    >) {
        // @ts-ignore Intended access.. (There is currently no "internal"-modifier)
        super(base.options);
    }

    public addReducer<_State, _Payload, _Mode extends ReducerFactoryExpandStateMode>(
        inference: ReducerInference<_Payload, _Mode>,
        reducer: (this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<_Payload>) => ExpandedState<_State, _Mode, KnownState, UnknownState>
    ): ReducerReducerFactoryOptions<
        _State,
        _Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    > {
        reducer = reducer.bind({
            initialKnownState: this.initialKnownState
        });

        const actionTypeOrCreator = Array.isArray(inference) ? inference[0] : inference;
        const unknownReducerMap = <any>Object.assign(this.options.unknownReducerMap, { [actionTypeOrCreator.toString()]: reducer });

        return <any>({
            knownState: this.options.knownState,
            knownReducerMap: this.options.knownReducerMap,
            unknownReducerMap,
        });
    }

    public addPayloadReducer<_State, _Payload, _Mode extends ReducerFactoryExpandStateMode>(
        inference: ReducerInference<_Payload, _Mode>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<_Payload>) => ExpandedState<_State, _Mode, KnownState, UnknownState>
    ): ReducerReducerFactoryOptions<
        _State,
        _Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    > {
        const reducer = (_state: UnionPropsAndTypes<KnownState, UnknownState>, action: Action<_Payload>) => actionReducer.call({
            initialKnownState: this.initialKnownState
        }, action)

        return <any>this.addReducer<_State, _Payload, _Mode>(inference, reducer);
    }
}

type ReducerReducerFactory<
    State,
    Payload,
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = ReducerFactory<
        If<
            Extends<IsKnownStateKnown, null>,
            UnionPropsAndTypesExcept<KnownState, State>,
            KnownState
        >,
        KnownStatePayload,
        ExtendedUnknownState<
            State,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload | Payload,
        IsKnownStateKnown,
        null,
        ExpandStateMode
    >;

export class ReducerFactory<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null = undefined,
    IsUnknownStateKnown extends undefined | null = undefined,
    ExpandStateMode extends ReducerFactoryExpandStateMode = "ExtendState"
    > extends ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown,
    IsUnknownStateKnown
    > {
    static create() {
        return new ReducerFactoryWithKnownState();
    }

    protected constructor(options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown> = {
            knownReducerMap: {},
            unknownReducerMap: {}
        }) {
        super(options);
    }

    public setExpandStateMode<ExpandStateMode extends ReducerFactoryExpandStateMode>(expandStateMode: ExpandStateMode): ReducerFactory<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    > {
        return <any>this;
    }

    public extendUnknownState<State>(): ReducerFactory<
        KnownState,
        KnownStatePayload,
        ExtendedUnknownState<
            State, KnownState, IsKnownStateKnown, UnknownState, IsUnknownStateKnown
        >,
        UnknownStatePayload,
        IsKnownStateKnown,
        null,
        ExpandStateMode
    > {
        return <any>new ReducerFactory(<any>{
            knownState: this.options.knownState,
            knownReducerMap: this.options.knownReducerMap,
        });
    }

    /** 
     * You will be able to have access to the boxed version of "this". This is an alternative to have access to "this" over the context of a function. 
     * So, it makes only sense to prefer this method over a "this"-context-function when you need an arrow function.
     * Because this method makes heavy use of inference, the perfomance is much decreased.
     */
    public watchItself<
        _KnownState,
        _knownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown extends undefined | null,
        _IsUnknownStateKnown extends undefined | null,
        _ExpandStateMode extends ReducerFactoryExpandStateMode
    >(callback:
        (self:
            ReducerFactoryBox<
                KnownState,
                KnownStatePayload,
                UnknownState,
                UnknownStatePayload,
                IsKnownStateKnown,
                IsUnknownStateKnown>) =>
            ReducerFactoryOptions<
                _KnownState,
                _knownStatePayload,
                _UnknownState,
                _UnknownStatePayload,
                _IsKnownStateKnown,
                _IsUnknownStateKnown>
    ): ReducerFactory<
        _KnownState,
        _knownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown,
        _IsUnknownStateKnown,
        _ExpandStateMode> {
        return <any>new ReducerFactory(<any>callback(<any>new ReducerFactoryBox(<any>this)));
    }

    public addReducer<_State, _Payload, _ExpandStateMode extends DefaultReducerFactoryExpandStateMode = undefined>(
        inference: ReducerInference<_Payload, _ExpandStateMode>,
        reducer: (
            this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<_Payload>) => ExpandedState<
                _State,
                PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
                KnownState,
                UnknownState>
    ): ReducerReducerFactory<
        _State,
        _Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>
    > {
        return <any>new ReducerFactory(<any>new ReducerFactoryBox(<any>this).addReducer(<any>inference, <any>reducer));
    }

    public addPayloadReducer<_State, _Payload, _ExpandStateMode extends DefaultReducerFactoryExpandStateMode = undefined>(
        inference: ReducerInference<_Payload, _ExpandStateMode>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<_Payload>) =>
            ExpandedState<
                _State,
                PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
                KnownState,
                UnknownState>
    ): ReducerReducerFactory<
        _State,
        _Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>
    > {
        return <any>new ReducerFactory(<any>new ReducerFactoryBox(<any>this).addPayloadReducer(<any>inference, <any>actionReducer));
    }

    protected acceptUnknownState<_UnknownState extends UnknownState>(unknownState: _UnknownState): ReducerFactory<
        FinalState<KnownState, _UnknownState>,
        KnownStatePayload | UnknownStatePayload,
        {},
        {},
        null,
        undefined,
        ExpandStateMode
    > {
        let knownState;

        // As typeof unknownState === "object" results in true, if it is equals null, we ask for it
        if (typeof unknownState === "object" && unknownState !== null && !Array.isArray(unknownState)) {
            // As we do not know, if knownState is initialized, we have to assign into unknownState
            knownState = Object.assign(unknownState, this.options.knownState);
        } else {
            knownState = unknownState;
        }

        const reducerMaps = Object.assign(this.options.knownReducerMap, this.options.unknownReducerMap);

        return <any>new ReducerFactory(<any>{
            knownState,
            knownReducerMap: reducerMaps,
        });
    }

    private handleActions() {
        return handleActions<KnownState, KnownStatePayload>(this.options.knownReducerMap, this.options.knownState!);
    }

    public toReducer(unknownState: UnknownState):
        Reducer<
            FinalState<KnownState, UnknownState>,
            KnownStatePayload | UnknownStatePayload
        > {
        return <any>this.acceptUnknownState(unknownState)
            .handleActions();
    }

    /** Returns a reducer that is compatible to `combineReducers` (@redux). */
    public toCombinableReducer(unknownState: UnknownState): CombinableReducer<
        Reducer<
            FinalState<KnownState, UnknownState>,
            KnownStatePayload | UnknownStatePayload
        >
    > {
        return <any>this.toReducer(unknownState);
    }
}

class ReducerFactoryWithKnownState extends ReducerFactory<{}, {}, {}, {}> {
    public withKnownState(unknownState: {}) {
        return this.acceptUnknownState(unknownState);
    }
}