import { ExtendedUnknownState, InferableReducerReducerFactory, Knowledge, Known, ReducerFactoryExpandStateMode, ReducerKnownState } from "./projectTypes";

// tslint:disable-next-line: no-empty-interface
export interface IEmptyReducerFactory<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > { }

// too hard lagging
// export type ReducerIEmptyReducerFactory<
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
//     > ? IEmptyReducerFactory<
//         __KnownState,
//         __KnownStatePayload,
//         __UnknownState,
//         __UnknownStatePayload,
//         __IsKnownStateKnown,
//         __IsUnknownStateKnown,
//         __ExpandStateMode
//     > : never;

export type ReducerIEmptyReducerFactory<
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
    > = IEmptyReducerFactory<
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
