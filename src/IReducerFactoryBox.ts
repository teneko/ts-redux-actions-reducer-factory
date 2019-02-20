import { Action } from "redux-actions";
import { ReducerIEmptyReducerFactory } from "./IEmptyReducerFactory";
import { IReducerFactoryBase } from "./IReducerFactoryBase";
import { ExpandedInterState, FinalState, IndefinableReducerFactoryExpandStateMode, Knowledge, Prefer$OverExpandStateMode, ReducerContext, ReducerFactoryExpandStateMode, ReducerFactoryReducerInference } from "./projectTypes";

export interface IReducerFactoryBox<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > extends IReducerFactoryBase<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown,
    $IsUnknownStateKnown,
    $ExpandStateMode
    > {
    addReducer<_InterState, _InterPayload, _InterExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_InterPayload, _InterExpandStateMode>,
        reducer: (this: ReducerContext<$KnownState, $UnknownState>,
            state: FinalState<$KnownState, $UnknownState>,
            action: Action<_InterPayload>) => ExpandedInterState<
                _InterState,
                Prefer$OverExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): ReducerIEmptyReducerFactory<
        _InterState,
        _InterPayload,
        Prefer$OverExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode
    >;

    addPayloadReducer<_InterState, _InterPayload, _InterExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_InterPayload, _InterExpandStateMode>,
        actionReducer: (this: ReducerContext<$KnownState, $UnknownState>, action: Action<_InterPayload>) => ExpandedInterState<_InterState,
            Prefer$OverExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
            $KnownState,
            $UnknownState>,
    ): ReducerIEmptyReducerFactory<
        _InterState,
        _InterPayload,
        Prefer$OverExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode
    >;
}
