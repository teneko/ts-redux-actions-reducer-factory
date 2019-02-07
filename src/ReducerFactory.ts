import { autoBind } from "@teronis/ts-auto-bind-es6";
import { ReducerMap, ActionFunctions, Action, handleActions } from "redux-actions";
import { Not, If, Or, And } from "typescript-logic";

export type Extends<A, B> = [A] extends [B] ? true : false;
export type ExtractObject<A> = Extract<A, object>;
export type ExtractObjectExceptArray<A> = Exclude<ExtractObject<A>, any[]>;
export type ExcludeObject<A> = Exclude<A, object>;
export type ExtractArray<A, TArray extends any[]= any[]> = Extract<A, TArray>;
export type ExcludeObjectExceptArray<A> = ExtractArray<A> | Exclude<A, object>;
export type AnyKeys<T> = T extends any ? keyof T : never;

export type IfNotNever2<A, B> = If<
    Not<Extends<A, never>>,
    A,
    B
>

export type IfNotNever3<N, A, B> = If<
    Not<Extends<N, never>>,
    A,
    B
>

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>
    > = { [K in MutualKeys extends AnyKeys<A> & AnyKeys<B> ? MutualKeys : never]: A[K] | B[K] };

/** Does A have any object in his union? Returns type of true or false. */
export type HasExtractableObject<A> = Not<Extends<ExtractObject<A>, never>>;

export type HasExtractableObjectWithoutArray<A> = Not<Extends<ExtractObjectExceptArray<A>, never>>;

/** Creates an union of any extractable objects. */
export type UnionExtractableObjects<A, B> = If<
    // If A or B has object ..
    Or<HasExtractableObject<A>, HasExtractableObject<B>>,
    // .. then return the one or the other object
    ExtractObject<A> | ExtractObject<B>,
    // .. else
    {}
>;

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. This function is only applicable on object types. */
export type UnionPropsExcept<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    // > = TakeoverProps<IntersectProps<A, B, MutualKeys>, A, LeftKeys>
    > = IntersectProps<A, B, MutualKeys> & Pick<A, LeftKeys>

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. This function is only applicable on object types. */
export type UnionProps<
    A,
    B,
    MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
    LeftKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<A>, MutualKeys>, AnyKeys<A>>,
    RightKeys extends IfNotNever3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>> = IfNotNever3<MutualKeys, Exclude<AnyKeys<B>, MutualKeys>, AnyKeys<B>>
    // > = TakeoverProps<UnionPropsExcept<A, B, MutualKeys, LeftKeys>, B, RightKeys>;
    > = UnionPropsExcept<A, B, MutualKeys, LeftKeys> & Pick<B, RightKeys>;

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

export type IntersectPrimitiveTypesAndArrays<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
    > = ExcludeObjectExceptArray<Exclude<A2 | B2, Exclude<A2, B2> | Exclude<B2, A2>>>;

export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

export type UnionPrimitiveTypesAndArraysExcept<
    A, B,
    A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
    B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
    > = Exclude<A2 | B2, Exclude<B2, A2>>;

/** Create an union of the primitive types of Object A and Object B. */
export type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;

export type UnionPrimitiveTypesAndArrays<A, B> = ExcludeObjectExceptArray<A | B>;

export type PreferPrimitivesOverProps<Props, Primitives> = If<
    And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
    Primitives,
    Props | Primitives
>;

export type IntersectPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<IntersectProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, IntersectPrimitiveTypesAndArrays<A, B>>;

export type UnionPropsAndTypesExcept<
    A, B,
    > = PreferPrimitivesOverProps<UnionPropsExcept<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArraysExcept<A, B>>;

export type UnionPropsAndTypes<
    A, B,
    > = PreferPrimitivesOverProps<UnionProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArrays<A, B>>;

export type PropsAndTypesExcept<A, B> = If<
    And<HasExtractableObjectWithoutArray<A>, HasExtractableObjectWithoutArray<B>>,
    Pick<ExtractObjectExceptArray<A>, Exclude<AnyKeys<ExtractObjectExceptArray<A>>, AnyKeys<ExtractObjectExceptArray<B>>>>,
    ExtractObjectExceptArray<A>
> | Exclude<ExcludeObjectExceptArray<A>, ExcludeObjectExceptArray<B>>;

type ActionTypeOrActionCreator<P> = ActionFunctions<P> | string;

function as<T>(value: any): T {
    return value;
}

type StateReturnType<State, KnownState, UnknownState> = ExcludeObject<State> | ExcludeObject<KnownState> | ExcludeObject<UnknownState> |
    (ExtractObject<State> & UnionPropsExcept<KnownState, State> & UnionPropsExcept<UnknownState, State>);

type FinalState<KnownState, UnknownState> = UnionPropsAndTypes<KnownState, UnknownState>

type PartialReducerContextGetInitialKnownState<KnownState, UnknownState> = {
    getInitialKnownState: () => FinalState<KnownState, UnknownState>
}

export class ReducerFactory<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null = undefined,
    IsUnknownStateKnown extends undefined | null = undefined
    > {
    static create() {
        return new ReducerFactory();
    }

    static createWithKnownState<KnownState>(knownState: KnownState) {
        return new ReducerFactory({
            knownState,
            isKnownStateKnown: null
        });
    }

    static createWithUnknownState<UnknownState>() {
        return ReducerFactory
            .create()
            .extendUnknownState<UnknownState>();
    }

    private knownState?: KnownState;
    private isKnownStateKnown?: IsKnownStateKnown;
    private knownReducerMap: ReducerMap<KnownState, KnownStatePayload>;
    private unknownState?: UnknownState;
    private isUnknownStateKnown?: IsUnknownStateKnown;
    private unknownReducerMap: ReducerMap<UnknownState, UnknownStatePayload>;

    protected constructor(options: {
        knownState?: KnownState;
        isKnownStateKnown?: IsKnownStateKnown;
        knownReducerMap?: ReducerMap<KnownState, KnownStatePayload>;
        unknownState?: UnknownState;
        isUnknownStateKnown?: IsUnknownStateKnown;
        unknownReducerMap?: ReducerMap<UnknownState, UnknownStatePayload>;
    } = {}) {
        autoBind(this);
        this.knownState = options.knownState;
        this.isKnownStateKnown = options.isKnownStateKnown;
        this.knownReducerMap = options.knownReducerMap || {};
        this.unknownState = options.unknownState;
        this.isUnknownStateKnown = options.isUnknownStateKnown;
        this.unknownReducerMap = options.unknownReducerMap || {};
    }

    private getReducedStateType<State>() {
        return {} as If<
            Extends<IsKnownStateKnown, null>,
            PropsAndTypesExcept<State, KnownState>,
            State
        >;
    }

    private getUnknownStateType<State>() {
        const ReducedStateDummy = this.getReducedStateType<State>();

        return {} as If<
            Extends<IsUnknownStateKnown, null>,
            UnionPropsAndTypes<typeof ReducedStateDummy, UnknownState>,
            typeof ReducedStateDummy
        >;
    };

    public extendUnknownState<State>() {
        const unknownState = this.getUnknownStateType<State>();

        const unknownReducerMap = as<ReducerMap<typeof unknownState, UnknownStatePayload>>(this.unknownReducerMap);

        return new ReducerFactory({
            knownState: this.knownState,
            isKnownStateKnown: this.isKnownStateKnown,
            knownReducerMap: this.knownReducerMap,
            unknownState,
            unknownReducerMap,
            isUnknownStateKnown: null,
        });
    }

    /** 
     * Get the initial known state you build up with `acceptUnknownState` and `toReducer`.
     * Use it when you are in the callback function of `watchItself`.
     */
    public getInitialKnownState(): UnionPropsAndTypes<KnownState, UnknownState> {
        return <any>this.knownState!;
    }

    public addReducer<State, Payload>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        reducer: (this: PartialReducerContextGetInitialKnownState<KnownState, UnknownState>, state: FinalState<KnownState, UnknownState>, action: Action<Payload>) => StateReturnType<State, KnownState, UnknownState>
    ) {
        reducer = reducer.bind({
            getInitialKnownState: this.getInitialKnownState
        });

        const knownState: If<
            Extends<IsKnownStateKnown, null>,
            UnionPropsAndTypesExcept<KnownState, State>,
            KnownState
        > = <any>this.knownState;

        // @ts-ignore
        let UnknownStatePayloadDummy: UnknownStatePayload | Payload;
        const knownReducerMap: ReducerMap<typeof knownState, KnownStatePayload> = <any>this.knownReducerMap;
        const unknownState = this.getUnknownStateType<State>();
        const unknownReducerMap: ReducerMap<typeof unknownState, typeof UnknownStatePayloadDummy> = <any>Object.assign(this.unknownReducerMap, { [actionTypeOrActionCreator.toString()]: reducer });

        return new ReducerFactory({
            knownState,
            isKnownStateKnown: this.isKnownStateKnown,
            knownReducerMap,
            unknownState,
            isUnknownStateKnown: null,
            unknownReducerMap,
        });
    }

    public addPayloadReducer<Payload, State>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        defineNextState: (this: PartialReducerContextGetInitialKnownState<KnownState, UnknownState>, action: Action<Payload>) => StateReturnType<State, KnownState, UnknownState>
    ) {
        const reducer = (_state: UnionPropsAndTypes<KnownState, UnknownState>, action: Action<Payload>) => defineNextState.call({
            getInitialKnownState: this.getInitialKnownState
        }, action)
        return this.addReducer<State, Payload>(actionTypeOrActionCreator, reducer);
    }

    public acceptUnknownState(unknownState: UnknownState) {
        type _FinalState = FinalState<KnownState, UnknownState>;
        const reducerMaps = <ReducerMap<_FinalState, KnownStatePayload | UnknownStatePayload>>Object.assign(this.unknownReducerMap, this.knownReducerMap);
        const knownState = <_FinalState>Object.assign(unknownState, this.knownState);

        return new ReducerFactory({
            knownState,
            isKnownStateKnown: null,
            knownReducerMap: reducerMaps,
        });
    }

    private handleActions() {
        return handleActions(this.knownReducerMap, <KnownState>this.knownState);
    }

    public toReducer(unknownState: UnknownState) {
        return this.acceptUnknownState(unknownState)
            .handleActions();
    }
}

export type CombinableReducer<R> = R extends (state: infer S, action: infer A) => any ? (state: S | undefined, action: A) => S : never;

export function asCombinableReducer<S, A>(reducer: (state: S, action: A) => S){
    return  <CombinableReducer<typeof reducer>>reducer;
}