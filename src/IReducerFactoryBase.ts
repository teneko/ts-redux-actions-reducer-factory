import { ReducerFactoryExpandStateMode } from "./projectTypes";
import { UnionPropsAndTypes } from "./utilityTypes";

export interface IReducerFactoryBase<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends undefined | null,
    $IsUnknownStateKnown extends undefined | null,
    $ExpandStateMode extends ReducerFactoryExpandStateMode
    > {
    /** Get the initial known state you innitialized with `acceptUnknownState` or `withKnownState`. */
    initialKnownState: UnionPropsAndTypes<$KnownState, $UnknownState>;
}
