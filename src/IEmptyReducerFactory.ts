import { ReducerFactoryExpandedUnknownState, Knowledge, Known, ReducerFactoryExpandStateMode, ReducerFactoryReducedKnownState } from "./projectTypes";

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
//     InterState,
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
//         InterState,
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
    > = IEmptyReducerFactory<
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
