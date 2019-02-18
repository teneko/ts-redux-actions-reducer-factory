import { Action } from "redux-actions";
import { EmptyReducerFactory } from "./IEmptyReducerFactory";
import { IReducerFactoryBase } from "./IReducerFactoryBase";
import { ExpandedState, FinalState, IndefinableReducerFactoryExpandStateMode, Prefer$OverExpandStateMode, ReducerContext, ReducerFactoryExpandStateMode, ReducerFactoryReducerInference } from "./projectTypes";

export interface IReducerFactoryBox<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends undefined | null,
    $IsUnknownStateKnown extends undefined | null,
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
    addReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        reducer: (this: ReducerContext<$KnownState, $UnknownState>,
            state: FinalState<$KnownState, $UnknownState>,
            action: Action<_Payload>) => ExpandedState<
                _State,
                Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): EmptyReducerFactory<
        _State,
        _Payload,
        Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode
    >;

    addPayloadReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        actionReducer: (this: ReducerContext<$KnownState, $UnknownState>, action: Action<_Payload>) => ExpandedState<_State,
            Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
            $KnownState,
            $UnknownState>,
    ): EmptyReducerFactory<
        _State,
        _Payload,
        Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode
    >;
}
