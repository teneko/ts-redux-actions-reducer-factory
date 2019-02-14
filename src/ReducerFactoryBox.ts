import { Action } from "redux-actions";
import { ExpandedState, FinalState, IndefinableReducerFactoryExpandStateMode, PartialReducerContext, PreferLocalOverGlobalExpandStateMode, ReducerFactoryExpandStateMode, ReducerFactoryReducerInference } from "./projectTypes";
import { ReducerFactoryBase, ReducerReducerFactoryOptions } from "./ReducerFactoryBase";
import { UnionPropsAndTypes } from "./utilityTypes";

export class ReducerFactoryBox<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > extends ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown,
    IsUnknownStateKnown,
    ExpandStateMode
    > {
    public constructor(base: ReducerFactoryBase<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    >) {
        // @ts-ignore Intended access.. (There is currently no "internal"-modifier)
        super(base.options);
    }

    public addReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        reducer: (this: PartialReducerContext<KnownState, UnknownState>,
            state: FinalState<KnownState, UnknownState>,
            action: Action<_Payload>) => ExpandedState<
                _State,
                PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
                KnownState,
                UnknownState>,
    ): ReducerReducerFactoryOptions<
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
        reducer = reducer.bind({
            initialKnownState: this.initialKnownState,
        });

        const actionTypeOrCreator = Array.isArray(inference) ? inference[0] : inference;
        const unknownReducerMap = Object.assign(this.options.unknownReducerMap, { [actionTypeOrCreator.toString()]: reducer }) as any;

        return ({
            knownState: this.options.knownState,
            knownReducerMap: this.options.knownReducerMap,
            unknownReducerMap,
        }) as any;
    }

    public addPayloadReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        actionReducer: (this: PartialReducerContext<KnownState, UnknownState>, action: Action<_Payload>) => ExpandedState<_State,
            PreferLocalOverGlobalExpandStateMode<ExpandStateMode, _ExpandStateMode>,
            KnownState,
            UnknownState>,
    ): ReducerReducerFactoryOptions<
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
        const reducer = (_state: UnionPropsAndTypes<KnownState, UnknownState>, action: Action<_Payload>) => actionReducer.call({
            initialKnownState: this.initialKnownState,
        }, action);

        return this.addReducer<_State, _Payload, _ExpandStateMode>(inference as any, reducer as any) as any;
    }
}
