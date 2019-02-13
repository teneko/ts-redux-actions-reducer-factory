import { Action, handleActions, Reducer } from "redux-actions";
import { ActionTypeOrActionCreator, DefaultReducerFactoryExpandStateMode, ExpandedState, ExtendedUnknownState, FinalState, IndefinableReducerFactoryExpandStateMode, PartialReducerContext, PreferLocalOverGlobalExpandStateMode, ReducerFactoryBase, ReducerFactoryExpandStateMode, ReducerFactoryExtendStateMode, ReducerFactoryOptions, ReducerFactoryReducerInference, ReducerReducerFactory } from "./ReducerFactoryBase";
import { ReducerFactoryBox } from "./ReducerFactoryBox";
import { ReducerFactoryWithKnownState } from "./ReducerFactoryWithKnownState";
import { CombinableReducer } from "./combinableReducer";

/* UTILITY: TYPES */

// type IfNot2<A, B, NotWhen = never> = If<
//     Not<Extends<A, NotWhen>>,
//     A,
//     B
// >;

// type IfNot2AndAssign<A, B, Assignment, NotWhen = never> = Extract<IfNot2<A, B, NotWhen>, Assignment>;

// type IfNot3<N, A, B, NotWhen = never> = If<
//     Not<Extends<N, NotWhen>>,
//     A,
//     B
// >;

// /** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
// type IntersectProps<
//     A,
//     B,
//     _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>
//     > = { [K in _MutualKeys extends AnyKeys<A> & AnyKeys<B> ? _MutualKeys : never]: A[K] | B[K] };

// /** Does A have any object in his union? Returns export type of true or false. */
// type HasExtractableObject<A> = Not<Extends<ExtractObject<A>, never>>;

// type HasExtractableObjectWithoutArray<A> = Not<Extends<ExtractObjectExceptArray<A>, never>>;

// /** Creates an union of any extractable objects. */
// type UnionExtractableObjects<A, B> = If<
//     // If A or B has object ..
//     Or<HasExtractableObject<A>, HasExtractableObject<B>>,
//     // .. then return the one or the other object
//     ExtractObject<A> | ExtractObject<B>,
//     // .. else
//     {}
// >;

// /** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. */
// type UnionPropsExcept<
//     A,
//     B,
//     _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
//     _LeftKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>> = IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>>,
//     > = IntersectProps<A, B, _MutualKeys> & Pick<A, _LeftKeys>;

// /** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
// type UnionProps<
//     A,
//     B,
//     _MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
//     _LeftKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>> = IfNot3<_MutualKeys, Exclude<AnyKeys<A>, _MutualKeys>, AnyKeys<A>>,
//     _RightKeys extends IfNot3<_MutualKeys, Exclude<AnyKeys<B>, _MutualKeys>, AnyKeys<B>> = IfNot3<_MutualKeys, Exclude<AnyKeys<B>, _MutualKeys>, AnyKeys<B>>
//     > = UnionPropsExcept<A, B, _MutualKeys, _LeftKeys> & Pick<B, _RightKeys>;

// /** Intersect only the primitive types of Object A and Object B. */
// type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;

// type IntersectPrimitiveTypesAndArrays<
//     A, B,
//     _A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
//     _B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
//     > = ExcludeObjectExceptArray<Exclude<_A2 | _B2, Exclude<_A2, _B2> | Exclude<_B2, _A2>>>;

// type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

// type UnionPrimitiveTypesAndArraysExcept<
//     A, B,
//     _A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
//     _B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
//     > = Exclude<_A2 | _B2, Exclude<_B2, _A2>>;

// /** Create an union of the primitive types of Object A and Object B. */
// type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;

// type UnionPrimitiveTypesAndArrays<A, B> = ExcludeObjectExceptArray<A | B>;

// type PreferPrimitivesOverProps<Props, Primitives> = If<
//     And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
//     Primitives,
//     Props | Primitives
// >;

// type IntersectPropsAndTypes<
//     A, B,
//     > = PreferPrimitivesOverProps<IntersectProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, IntersectPrimitiveTypesAndArrays<A, B>>;

// type UnionPropsAndTypesExcept<
//     A, B,
//     > = PreferPrimitivesOverProps<UnionPropsExcept<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArraysExcept<A, B>>;

// type UnionPropsAndTypes<
//     A, B,
//     > = PreferPrimitivesOverProps<UnionProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArrays<A, B>>;

// type PropsAndTypesExcept<A, B> = PreferPrimitivesOverProps<If<
//     And<HasExtractableObjectWithoutArray<A>, HasExtractableObjectWithoutArray<B>>,
//     Pick<ExtractObjectExceptArray<A>, Exclude<AnyKeys<ExtractObjectExceptArray<A>>, AnyKeys<ExtractObjectExceptArray<B>>>>,
//     ExtractObjectExceptArray<A>
// >, Exclude<ExcludeObjectExceptArray<A>, ExcludeObjectExceptArray<B>>>;

/* UTILITY: TYPES & FUNCTIONS */



/* PROJECT: TYPES & CLASSES */

export class ReducerFactory<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null = undefined,
    IsUnknownStateKnown extends undefined | null = undefined,
    ExpandStateMode extends ReducerFactoryExpandStateMode = DefaultReducerFactoryExpandStateMode
    > extends ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown,
    IsUnknownStateKnown,
    ExpandStateMode
    > {
    public static create() {
        return new ReducerFactoryWithKnownState();
    }

    protected constructor(options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode> = {
            knownReducerMap: {},
            unknownReducerMap: {},
        }) {
        super(options);
    }

    public setExpandStateMode<LocalExpandStateMode extends ReducerFactoryExpandStateMode>(expandStateMode: LocalExpandStateMode): ReducerFactory<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        LocalExpandStateMode
    > {
        return this as any;
    }

    public extendUnknownState<State, LocalExpandStateMode extends ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode>(): ReducerFactory<
        KnownState,
        KnownStatePayload,
        ExtendedUnknownState<
            State,
            LocalExpandStateMode,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload,
        IsKnownStateKnown,
        null,
        ExpandStateMode
    > {
        return new ReducerFactory({
            knownState: this.options.knownState,
            knownReducerMap: this.options.knownReducerMap,
        } as any) as any;
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
                IsUnknownStateKnown,
                ExpandStateMode>) =>
            ReducerFactoryOptions<
                _KnownState,
                _knownStatePayload,
                _UnknownState,
                _UnknownStatePayload,
                _IsKnownStateKnown,
                _IsUnknownStateKnown,
                _ExpandStateMode>,
    ): ReducerFactory<
        _KnownState,
        _knownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown,
        _IsUnknownStateKnown,
        _ExpandStateMode> {
        return new ReducerFactory(callback(new ReducerFactoryBox(this as any) as any) as any) as any;
    }

    public addReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ActionTypeOrActionCreator<_Payload> | [ActionTypeOrActionCreator<_Payload>, _ExpandStateMode],
        reducer: (
            this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<_Payload>) => ExpandedState<
                _State,
                PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
                KnownState,
                UnknownState>,
    ): ReducerReducerFactory<
        _State,
        _Payload,
        PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    > {
        return new ReducerFactory(new ReducerFactoryBox(this as any).addReducer(inference as any, reducer as any) as any) as any;
    }

    public addPayloadReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<_Payload>) =>
            ExpandedState<
                _State,
                PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
                KnownState,
                UnknownState>,
    ): ReducerReducerFactory<
        _State,
        _Payload,
        PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    > {
        return new ReducerFactory(new ReducerFactoryBox(this as any).addPayloadReducer(inference as any, actionReducer as any) as any) as any;
    }

    public toReducer(unknownState: UnknownState):
        Reducer<
            FinalState<KnownState, UnknownState>,
            KnownStatePayload | UnknownStatePayload
        > {
        return this.acceptUnknownState(unknownState)
            .handleActions() as any;
    }

    /** Returns a reducer that is compatible to `combineReducers` (@redux). */
    public toCombinableReducer(unknownState: UnknownState): CombinableReducer<
        Reducer<
            FinalState<KnownState, UnknownState>,
            KnownStatePayload | UnknownStatePayload
        >
    > {
        return this.toReducer(unknownState) as any;
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

        return new ReducerFactory({
            knownState,
            knownReducerMap: reducerMaps,
        } as any) as any;
    }

    private handleActions() {
        return handleActions<KnownState, KnownStatePayload>(this.options.knownReducerMap, this.options.knownState!);
    }
}
