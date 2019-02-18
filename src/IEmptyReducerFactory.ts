import { ExtendedUnknownState, ReducerFactoryExpandStateMode, ReducerKnownState } from "./projectTypes";

// tslint:disable-next-line: no-empty-interface
export interface IEmptyReducerFactory<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    /* They are needed for inference purposes */
    $IsKnownStateKnown extends undefined | null,
    $IsUnknownStateKnown extends undefined | null,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > { }

export type EmptyReducerFactory<
    State,
    Payload,
    ExpandStateMode extends ReducerFactoryExpandStateMode,
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends undefined | null,
    $IsUnknownStateKnown extends undefined | null,
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
        null,
        $ExpandStateMode>;
