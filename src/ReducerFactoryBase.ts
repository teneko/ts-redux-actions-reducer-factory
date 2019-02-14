import { ExcludeObjectExceptArray, Extends, ExtractObjectExceptArray } from "@teronis/ts-definitions";
import { ActionFunctions, ReducerMap } from "redux-actions";
import { If } from "typescript-logic";
import { ExtendedUnknownState, ReducerFactoryExpandStateMode } from "./projectTypes";
import { ReducerFactory } from "./ReducerFactory";
import { IfNot2, PreferPrimitivesOverProps, PropsAndTypesExcept, UnionPrimitiveTypesAndArrays, UnionProps, UnionPropsAndTypes, UnionPropsAndTypesExcept, UnionPropsExcept } from "./utilityTypes";

export type ReducerFactoryOptions<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    /* They are needed for inference purposes */
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = {
        knownState?: KnownState;
        knownReducerMap: ReducerMap<KnownState, KnownStatePayload>;
        unknownReducerMap: ReducerMap<UnknownState, UnknownStatePayload>;
    };

export type ReducerKnownState<_State, KnownState, IsKnownStateKnown> = If<
    Extends<IsKnownStateKnown, null>,
    UnionPropsAndTypesExcept<KnownState, _State>,
    KnownState
>;

export type ReducerReducerFactoryOptions<
    LocalState,
    LocalPayload,
    LocalExpandStateMode extends ReducerFactoryExpandStateMode,
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > = ReducerFactoryOptions<
        ReducerKnownState<LocalState, KnownState, IsKnownStateKnown>,
        KnownStatePayload,
        ExtendedUnknownState<
            LocalState,
            LocalExpandStateMode,
            KnownState,
            IsKnownStateKnown,
            UnknownState,
            IsUnknownStateKnown
        >,
        UnknownStatePayload | LocalPayload,
        IsKnownStateKnown,
        null,
        ExpandStateMode>;

export class ReducerFactoryBase<
    KnownState,
    KnownStatePayload,
    UnknownState,
    UnknownStatePayload,
    IsKnownStateKnown extends undefined | null,
    IsUnknownStateKnown extends undefined | null,
    ExpandStateMode extends ReducerFactoryExpandStateMode
    > {
    protected options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    >;

    public constructor(options: ReducerFactoryOptions<
        KnownState,
        KnownStatePayload,
        UnknownState,
        UnknownStatePayload,
        IsKnownStateKnown,
        IsUnknownStateKnown,
        ExpandStateMode
    >) {
        this.options = {
            knownState: options.knownState,
            knownReducerMap: options.knownReducerMap || {},
            unknownReducerMap: options.unknownReducerMap || {},
        };
    }

    /** Get the initial known state you build up with `acceptUnknownState` and `toReducer`. */
    public get initialKnownState(): UnionPropsAndTypes<KnownState, UnknownState> {
        return this.options.knownState! as any;
    }
}
