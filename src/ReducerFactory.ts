import { ReducerMap, ActionFunctions, Action, handleActions, Reducer } from "redux-actions";
import { If } from "typescript-logic";
import { Extends, ExtractObject, ExcludeObject } from "@teronis/ts-definitions";
import { PropsAndTypesExcept, UnionPropsAndTypes, UnionPropsExcept, UnionPropsAndTypesExcept } from "./utilityTypes";
import { CombinableReducer } from "./utilityFunctions";

type ActionTypeOrActionCreator<P> = ActionFunctions<P> | string;

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

type StateReturnType<State, KnownState, UnknownState> = ExcludeObject<State> | ExcludeObject<KnownState> | ExcludeObject<UnknownState> |
    (ExtractObject<State> & UnionPropsExcept<KnownState, State> & UnionPropsExcept<UnknownState, State>);

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

    public addReducer<State, Payload>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        reducer: (this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<Payload>) => StateReturnType<State, KnownState, UnknownState>
    ): ReducerReducerFactoryOptions<
        State,
        Payload,
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

        const unknownReducerMap = <any>Object.assign(this.options.unknownReducerMap, { [actionTypeOrActionCreator.toString()]: reducer });

        return <any>({
            knownState: this.options.knownState,
            knownReducerMap: this.options.knownReducerMap,
            unknownReducerMap,
        });
    }

    public addPayloadReducer<Payload, State>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<Payload>) => StateReturnType<State, KnownState, UnknownState>
    ): ReducerReducerFactoryOptions<
        State,
        Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    > {
        const reducer = (_state: UnionPropsAndTypes<KnownState, UnknownState>, action: Action<Payload>) => actionReducer.call({
            initialKnownState: this.initialKnownState
        }, action)

        return this.addReducer<State, Payload>(actionTypeOrActionCreator, reducer);
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
    IsUnknownStateKnown extends undefined | null
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
        null
    >;

export class ReducerFactory<
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
    static create() {
        return new ReducerFactory();
    }

    static createWithKnownState<KnownState>(knownState: KnownState) {
        return ReducerFactory
            .create()
            .acceptUnknownState<KnownState>(knownState);
    }

    static createWithUnknownState<UnknownState>() {
        return ReducerFactory
            .create()
            .extendUnknownState<UnknownState>();
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

    public extendUnknownState<State>(): ReducerFactory<
        KnownState,
        KnownStatePayload,
        ExtendedUnknownState<
            State, KnownState, IsKnownStateKnown, UnknownState, IsUnknownStateKnown
        >,
        UnknownStatePayload,
        IsKnownStateKnown,
        null
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
        _IsUnknownStateKnown extends undefined | null
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
        _IsUnknownStateKnown> {
        return <any>new ReducerFactory(callback(new ReducerFactoryBox(this)));
    }

    public addReducer<State, Payload>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        reducer: (
            this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<Payload>) => StateReturnType<
                State,
                KnownState,
                UnknownState
            >
    ): ReducerReducerFactory<
        State,
        Payload,
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown
    > {
        return <any>new ReducerFactory(new ReducerFactoryBox(this).addReducer(actionTypeOrActionCreator, reducer));
    }

    public addPayloadReducer<Payload, State>(
        actionTypeOrActionCreator: ActionTypeOrActionCreator<Payload>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<Payload>) =>
            StateReturnType<State, KnownState, UnknownState>): ReducerReducerFactory<
                State,
                Payload,
                KnownState,
                KnownStatePayload,
                UnknownState,
                UnknownStatePayload,
                IsKnownStateKnown,
                IsUnknownStateKnown
            > {
        return <any>new ReducerFactory(new ReducerFactoryBox(this).addPayloadReducer(actionTypeOrActionCreator, actionReducer));
    }

    private acceptUnknownState<_UnknownState extends UnknownState>(unknownState: _UnknownState): ReducerFactory<
        FinalState<KnownState, _UnknownState>,
        KnownStatePayload | UnknownStatePayload,
        {},
        {},
        null,
        undefined
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