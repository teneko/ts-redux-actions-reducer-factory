import { Inferable } from "@teronis/ts-definitions";
import { Action } from "redux-actions";
import { IEmptyReducerFactory } from "./IEmptyReducerFactory";
import { IPostReducerFactory } from "./IPostReducerFactory";
import { IReducerFactoryBase } from "./IReducerFactoryBase";
import { IReducerFactoryBox } from "./IReducerFactoryBox";
import { ExpandedState, ExtendedUnknownState, FinalState, IndefinableReducerFactoryExpandStateMode, InferableReducerReducerFactory, Knowledge, Known, Prefer$OverExpandStateMode, ReducerContext, ReducerFactoryExpandStateMode, ReducerFactoryExtendStateMode, ReducerFactoryReducerInference, ReducerKnownState, Unknown } from "./projectTypes";
import { UnionPropsAndTypes } from "./utilityTypes";

export interface IReducerFactory<
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
    initialKnownState: UnionPropsAndTypes<$KnownState, $UnknownState>;

    setExpandStateMode<_ExpandStateMode extends ReducerFactoryExpandStateMode>(expandStateMode: _ExpandStateMode): IReducerFactory<
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        _ExpandStateMode
    >;

    extendUnknownState<State, _ExpandStateMode extends ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode>(): IReducerFactory<
        $KnownState,
        $KnownStatePayload,
        ExtendedUnknownState<
            State,
            _ExpandStateMode,
            $KnownState,
            $IsKnownStateKnown,
            $UnknownState,
            $IsUnknownStateKnown
        >,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        Known,
        $ExpandStateMode
    >;

    /**
     * You will be able to have access to the boxed version of "this". This is an alternative to have access to "this" over the context of a function.
     * So, it makes only sense to prefer this method over a "this"-context-function when you need an arrow function. Because this method makes
     * heavy use of inference, the type lookup perfomance may be much decreased. (fixed due to any casts, needs confirmation)
     */
    watchItself<
        _KnownState,
        _knownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown extends Knowledge,
        _IsUnknownStateKnown extends Knowledge,
        _ExpandStateMode extends ReducerFactoryExpandStateMode
    >(callback:
        (self:
            IReducerFactoryBox<
                $KnownState,
                $KnownStatePayload,
                $UnknownState,
                $UnknownStatePayload,
                $IsKnownStateKnown,
                $IsUnknownStateKnown,
                $ExpandStateMode>) =>
            IEmptyReducerFactory<
                _KnownState,
                _knownStatePayload,
                _UnknownState,
                _UnknownStatePayload,
                _IsKnownStateKnown,
                _IsUnknownStateKnown,
                _ExpandStateMode>,
    ): IReducerFactory<
        _KnownState,
        _knownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown,
        _IsUnknownStateKnown,
        _ExpandStateMode
    >;

    addReducer<_State, _Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        reducer: (
            this: ReducerContext<$KnownState, $UnknownState>,
            state: FinalState<$KnownState, $UnknownState>,
            action: Action<_Payload>) => ExpandedState<
                _State,
                Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): ReducerIReducerFactory<
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
        actionReducer: (this: ReducerContext<$KnownState, $UnknownState>, action: Action<_Payload>) =>
            ExpandedState<
                _State,
                Prefer$OverExpandStateMode<$ExpandStateMode, _ExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): ReducerIReducerFactory<
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

    acceptUnknownState: never extends Inferable<IPostReducerFactory<
        FinalState<$KnownState, $UnknownState>,
        $KnownStatePayload | $UnknownStatePayload,
        {},
        {},
        Known,
        Unknown,
        $ExpandStateMode
    >, infer T> ? (Known extends $IsUnknownStateKnown ? (unknownState: $UnknownState) => T : () => T) : never;
}

// // too hard lagging
// export type ReducerIReducerFactory<
//     State,
//     Payload,
//     ExpandStateMode extends ReducerFactoryExpandStateMode,
//     $KnownState,
//     $KnownStatePayload,
//     $UnknownState,
//     $UnknownStatePayload,
//     $IsKnownStateKnown extends Knowledge,
//     $IsUnknownStateKnown extends Knowledge,
//     $ExpandStateMode extends ReducerFactoryExpandStateMode
//     > = never extends InferableReducerReducerFactory<
//         State,
//         Payload,
//         ExpandStateMode,
//         $KnownState,
//         $KnownStatePayload,
//         $UnknownState,
//         $UnknownStatePayload,
//         $IsKnownStateKnown,
//         $IsUnknownStateKnown,
//         $ExpandStateMode,
//         infer __KnownState,
//         infer __KnownStatePayload,
//         infer __UnknownState,
//         infer __UnknownStatePayload,
//         infer __IsKnownStateKnown,
//         infer __IsUnknownStateKnown,
//         infer __ExpandStateMode
//     > ? IReducerFactory<
//         __KnownState,
//         __KnownStatePayload,
//         __UnknownState,
//         __UnknownStatePayload,
//         __IsKnownStateKnown,
//         __IsUnknownStateKnown,
//         __ExpandStateMode
//     > : never;

export type ReducerIReducerFactory<
    State,
    Payload,
    ExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > = IReducerFactory<
        ReducerKnownState<State, $KnownState, $IsKnownStateKnown>,
        $KnownStatePayload,
        ExtendedUnknownState<
            State,
            ExpandStateMode,
            $KnownState,
            $IsKnownStateKnown,
            $UnknownState,
            $IsUnknownStateKnown
        >,
        $UnknownStatePayload | Payload,
        $IsKnownStateKnown,
        Known,
        $ExpandStateMode
    >;
