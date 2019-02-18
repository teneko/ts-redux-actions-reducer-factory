import { Action, handleActions } from "redux-actions";
import { IPreReducerFactory } from "./IPreReducerFactory";
import { DefaultReducerFactoryExpandStateMode, IndefinableReducerFactoryExpandStateMode, ReducerContext, ReducerFactoryExpandStateMode, ReducerFactoryOptions, ReducerFactoryReducerInference } from "./projectTypes";

export class ReducerFactory<
    $KnownState,
    $KnownStatePayload,
    $UnknownState,
    $UnknownStatePayload,
    $IsKnownStateKnown extends undefined | null = undefined,
    $IsUnknownStateKnown extends undefined | null = undefined,
    $ExpandStateMode extends ReducerFactoryExpandStateMode = DefaultReducerFactoryExpandStateMode
    > {
    public static create(): IPreReducerFactory {
        return new ReducerFactory() as any;
    }

    /**
     * This function only prefills `knownReducerMap` and `unknownReducerMap`.
     * @returns The same options you passed before, but with default values if not already provided.
     */
    protected static completeOptions<
        _KnownState,
        _KnownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown extends undefined | null,
        _IsUnknownStateKnown extends undefined | null,
        _ExpandStateMode extends ReducerFactoryExpandStateMode
    >(options: ReducerFactoryOptions<
        _KnownState,
        _KnownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown,
        _IsUnknownStateKnown,
        _ExpandStateMode
    >) {
        options.knownReducerMap = options.knownReducerMap || {};
        options.unknownReducerMap = options.unknownReducerMap || {};
    }

    private static getInitialOptions(): Pick<ReducerFactoryOptions<{}, {}, {}, {}, null, null, DefaultReducerFactoryExpandStateMode>, "expandStateMode"> {
        return { expandStateMode: "ExtendState" };
    }

    protected options: ReducerFactoryOptions<
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode
    >;

    protected constructor(options: ReducerFactoryOptions<
        $KnownState,
        $KnownStatePayload,
        $UnknownState,
        $UnknownStatePayload,
        $IsKnownStateKnown,
        $IsUnknownStateKnown,
        $ExpandStateMode> = ReducerFactory.getInitialOptions() as any) {
        ReducerFactory.completeOptions(options);
        this.options = options;
    }

    /** @returns A *copy* of the instance options and then on top the passed options. */
    protected postfillOptions<
        _KnownState,
        _KnownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown extends undefined | null,
        _IsUnknownStateKnown extends undefined | null,
        _ExpandStateMode extends ReducerFactoryExpandStateMode
    >(options: Partial<ReducerFactoryOptions<
        _KnownState,
        _KnownStatePayload,
        _UnknownState,
        _UnknownStatePayload,
        _IsKnownStateKnown,
        _IsUnknownStateKnown,
        _ExpandStateMode
    >>) {
        return Object.assign({}, this.options, options);
    }

    public get initialKnownState(): any {
        return this.options.knownState!;
    }

    public withKnownState(knownState: any) {
        this.options.knownState = knownState;
        return this as any;
    }

    public setExpandStateMode(expandStateMode: any) {
        this.options.expandStateMode = expandStateMode;
        return this as any;
    }

    public extendUnknownState() {
        return this as any;
    }

    public watchItself(callback: (self: any) => any) {
        return callback(this);
    }

    public addReducer<_Payload, _ExpandStateMode extends IndefinableReducerFactoryExpandStateMode = undefined>(
        inference: ReducerFactoryReducerInference<_Payload, _ExpandStateMode>,
        reducer: (this: ReducerContext<$KnownState, $UnknownState>, state: any, action: Action<_Payload>) => any) {
        reducer = reducer.bind({
            initialKnownState: this.initialKnownState,
        });

        const actionTypeOrCreator = Array.isArray(inference) ? inference[0] : inference;
        const unknownReducerMap = Object.assign(this.options.unknownReducerMap, { [actionTypeOrCreator.toString()]: reducer });

        this.options = this.postfillOptions({
            unknownReducerMap,
        });

        return this as any;
    }

    public addPayloadReducer<_Payload>(inference: any, actionReducer: (this: ReducerContext<$KnownState, $UnknownState>, action: Action<_Payload>) => any) {
        const reducer = (_state: any, action: Action<_Payload>) => actionReducer.call({
            initialKnownState: this.initialKnownState,
        }, action);

        return this.addReducer(inference, reducer);
    }

    protected migrateUnknownState<_UnknownState extends $UnknownState>(unknownState: _UnknownState) {
        let knownState: any;

        // As typeof unknownState === "object" results in true, if it is equals null, we ask for it
        if (typeof unknownState === "object" && unknownState !== null && !Array.isArray(unknownState)) {
            // As we do not know, if knownState is initialized, we have to assign into unknownState
            knownState = Object.assign({}, unknownState, this.options.knownState);
        } else {
            knownState = unknownState;
        }

        const knownReducerMap = Object.assign(this.options.knownReducerMap, this.options.unknownReducerMap);

        this.options = this.postfillOptions({
            knownState,
            knownReducerMap,
            // Due to accepted unknown state we reset it
            unknownReducerMap: {},
        });

        return this as any;
    }

    public acceptUnknownState(unknownState?: $UnknownState) {
        return this.migrateUnknownState(unknownState!);
    }

    private handleActions() {
        return handleActions(this.options.knownReducerMap, this.options.knownState!);
    }

    public toReducer() {
        return this.handleActions();
    }
}

export function createReducerFactory() {
    return ReducerFactory.create();
}
