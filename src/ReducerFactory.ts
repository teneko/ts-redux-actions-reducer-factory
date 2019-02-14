import { Action, handleActions, Reducer } from "redux-actions";
import { CombinableReducer } from "./combinableReducer";
import { ActionTypeOrActionCreator, DefaultReducerFactoryExpandStateMode, ExpandedState, ExtendedUnknownState, FinalState, IndefinableReducerFactoryExpandStateMode, PartialReducerContext, PreferLocalOverGlobalExpandStateMode, ReducerFactoryExpandStateMode, ReducerFactoryExtendStateMode, ReducerFactoryReducerInference } from "./projectTypes";
import { ReducerFactoryBase, ReducerFactoryOptions, ReducerKnownState } from "./ReducerFactoryBase";
import { ReducerFactoryBox } from "./ReducerFactoryBox";
import { ReducerFactoryWithKnownState } from "./ReducerFactoryWithKnownState";

type ReducerReducerFactory<
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
