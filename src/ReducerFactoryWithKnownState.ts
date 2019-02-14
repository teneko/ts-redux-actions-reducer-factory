import { ReducerFactory } from "./InternalReducerFactory";

export class ReducerFactoryWithKnownState extends ReducerFactory<{}, {}, {}, {}> {
    public withKnownState<KnownState>(knownState: KnownState) {
        return this.acceptUnknownState(knownState);
    }
}
