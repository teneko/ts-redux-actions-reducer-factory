import { Reducer } from "redux-actions";
import { UndefinifiedStateReducer } from "./combinableReducer";
import { IReducerFactoryBase } from "./IReducerFactoryBase";
import { FinalState, Knowledge, ReducerFactoryExpandStateMode } from "./projectTypes";

export type UndefinifiedStateReducerString = "undefinifiedState";

export interface IPostReducerFactory<
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
        /**
         * The function calls `handleActions` (@redux) internally. The reducer might get incompatible
         * for `combineReducers` (@redux) if third party reducers are passed as arguments too, so you
         * might try one of the following compatiblity type conversions/additionals:
         * - "undefinifiedState" add undefined type to state
         */
    toReducer<
        _Combinable extends UndefinifiedStateReducerString | undefined = undefined,
        __Reducer extends Reducer<
            FinalState<$KnownState, $UnknownState>,
            $KnownStatePayload | $UnknownStatePayload> = Reducer<
                FinalState<$KnownState, $UnknownState>,
                $KnownStatePayload | $UnknownStatePayload>
    >(compatibility?: _Combinable): UndefinifiedStateReducerString extends _Combinable ? UndefinifiedStateReducer<__Reducer> : __Reducer;
}
