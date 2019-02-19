import { IReducerFactory } from "./IReducerFactory";
import { DefaultReducerFactoryExpandStateMode, Known, Unknown } from "./projectTypes";

export interface IPreReducerFactory extends IReducerFactory<
    {},
    {},
    {},
    {},
    Unknown,
    Unknown,
    DefaultReducerFactoryExpandStateMode
    > {
    withKnownState<KnownState>(knownState: KnownState): IReducerFactory<
        KnownState,
        {},
        {},
        {},
        Known,
        Unknown,
        DefaultReducerFactoryExpandStateMode
    >;
}
