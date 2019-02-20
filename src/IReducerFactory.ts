import { Inferable } from "@teronis/ts-definitions";
import { Action } from "redux-actions";
import { IEmptyReducerFactory } from "./IEmptyReducerFactory";
import { IPostReducerFactory } from "./IPostReducerFactory";
import { IReducerFactoryBase } from "./IReducerFactoryBase";
import { IReducerFactoryBox } from "./IReducerFactoryBox";
import { ExpandedInterState, ReducerFactoryExpandedUnknownState, FinalState, IndefinableReducerFactoryExpandStateMode, Knowledge, Known, Prefer$OverExpandStateMode as Prefer$OverInterExpandStateMode, ReducerContext, ReducerFactoryExpandStateMode, ReducerFactoryExtendStateMode, ReducerFactoryReducerInference, ReducerFactoryReducedKnownState, Unknown } from "./projectTypes";
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

    // TODO: Look for _ExpandStateMode --> _InterExpandStateMode (Prefer$Over...)
    extendUnknownState<InterState, _InterExpandStateMode extends ReducerFactoryExpandStateMode = ReducerFactoryExtendStateMode>(): IReducerFactory<
        $KnownState,
        $KnownStatePayload,
        ReducerFactoryExpandedUnknownState<
            InterState,
            _InterExpandStateMode,
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

    addReducer<_InterState, _InterPayload, _InterExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_InterPayload, _InterExpandStateMode>,
        reducer: (
            this: ReducerContext<$KnownState, $UnknownState>,
            state: FinalState<$KnownState, $UnknownState>,
            action: Action<_InterPayload>) => ExpandedInterState<
                _InterState,
                Prefer$OverInterExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): ReducerIReducerFactory<
        _InterState,
        _InterPayload,
        Prefer$OverInterExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
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
        actionReducer: (this: ReducerContext<$KnownState, $UnknownState>, action: Action<_InterPayload>) =>
            ExpandedInterState<
                _InterState,
                Prefer$OverInterExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
                $KnownState,
                $UnknownState>,
    ): ReducerIReducerFactory<
        _InterState,
        _InterPayload,
        Prefer$OverInterExpandStateMode<$ExpandStateMode, _InterExpandStateMode>,
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
//     InterState,
//     InterPayload,
//     InterExpandStateMode extends ReducerFactoryExpandStateMode,
//     $KnownState,
//     $KnownStatePayload,
//     $UnknownState,
//     $UnknownStatePayload,
//     $IsKnownStateKnown extends Knowledge,
//     $IsUnknownStateKnown extends Knowledge,
//     $ExpandStateMode extends ReducerFactoryExpandStateMode
//     > = never extends InferableReducerReducerFactory<
//         InterState,
//         InterPayload,
//         InterExpandStateMode,
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
    InterState,
    InterPayload,
    PreferredExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > = IReducerFactory<
        ReducerFactoryReducedKnownState<InterState, $KnownState, $IsKnownStateKnown>,
        $KnownStatePayload,
        ReducerFactoryExpandedUnknownState<
            InterState,
            PreferredExpandStateMode,
            $KnownState,
            $IsKnownStateKnown,
            $UnknownState,
            $IsUnknownStateKnown
        >,
        $UnknownStatePayload | InterPayload,
        $IsKnownStateKnown,
        Known,
        $ExpandStateMode
    >;
