import { IReducerFactory } from "./IReducerFactory";
import { DefaultReducerFactoryExpandStateMode } from "./projectTypes";

export interface IPreReducerFactory extends IReducerFactory<
    {},
    {},
    {},
    {},
    null,
    null,
    DefaultReducerFactoryExpandStateMode
    > {
    withKnownState<KnownState>(knownState: KnownState): IReducerFactory<
        KnownState,
        {},
        {},
        {},
        null,
        null,
        DefaultReducerFactoryExpandStateMode
    >;
}
