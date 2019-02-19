import { Knowledge, ReducerFactoryExpandStateMode } from "./projectTypes";
import { UnionPropsAndTypes } from "./utilityTypes";

export interface IReducerFactoryBase<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends Knowledge,
    $IsUnknownStateKnown extends Knowledge,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > {
    /** Get the initial known state you innitialized with `acceptUnknownState` or `withKnownState`. */
    initialKnownState: UnionPropsAndTypes<$KnownState, $UnknownState>;
}
