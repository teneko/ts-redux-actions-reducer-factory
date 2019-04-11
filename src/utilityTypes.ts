import { AnyKeys, ExcludeArray, ExcludeObject, Extends, ExtractArray, ExtractObject } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";
// tslint:disable: interface-name

/** credits: https://stackoverflow.com/a/49936686/11044059 */
export type DeepPartial<T> = {
    [P in keyof T]?: (
        T[P] extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>
        : DeepPartial<T[P]>
    )
};

export type DeepRequired<T> = {
    [P in keyof T]-?: (
        T[P] extends Array<infer U>
        ? Array<DeepRequired<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepRequired<U>>
        : DeepRequired<T[P]>
    )
};

type Intersect<A, B> = (
    [A] extends [never]
    // Take B, whatever it is
    ? B
    // A NOT never
    : ([B] extends [never]
        // Take A
        ? A
        // Take A & B
        : A & B)
);

// type Union<A, B> = (

// );

type test46 = (
    Intersect<
        Intersect<
            never,
            true
        >,
        never
    >
);

export type PickExcept<T, ExcludedKeys = keyof T> = Pick<T, Exclude<keyof T, ExcludedKeys>>;

/** If `Keys` is equals never, then `never` will be returned instead of `{}`. */
export type PickOrNever<T, Keys extends keyof T> = [Keys] extends [never] ? never : Pick<T, Keys>;

export type ExtractOrUnknown<T, U, Extraction = Extract<T, U>> = [Extraction] extends [never] ? unknown : Extraction;

export type NotTypeKeys<T, NotType = never> = Pick<T, { [K in keyof T]: T[K] extends NotType ? never : K }[keyof T]>;

export type IsNotNever<T> = [T] extends [never] ? false : true;

export type DropHead<Tuple extends any[]> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];

export type DefaultValueContent = {};

export interface ContentMutations {
    ExtractObject: "ExtractObject";
    ExtractArray: "ExtractArray";
    ExcludeArray: "ExcludeArray";
    ExcludeObject: "ExcludeObject";
}

export type ContentMutationKeys = keyof ContentMutations;
export type ContentMutationArray = ContentMutationKeys[];

export type DefaultContentMutation = [];
// The empty array don't lead to circular dependency error.
export type ContentMutationOrArray = ContentMutationKeys | ContentMutationArray;
export type ContentMutationAsArray<Options extends ContentMutationOrArray> = Options extends ContentMutationKeys[] ? Options : [Options];

export type $ = {};

export type ValueContent<
    Content,
    Mutations extends ContentMutationOrArray,
    /** If false `Transformations` won't applied on `Content`. */
    CanMutate,
    __TransformationArray extends ContentMutationAsArray<Mutations> = ContentMutationAsArray<Mutations>
    > = {
        "empty": Content;
        "nonEmpty": ValueContent<
            __TransformationArray extends ContentMutationArray ? (
                __TransformationArray extends []
                ? Content
                : __TransformationArray[0] extends ContentMutations["ExtractObject"]
                ? ExtractObject<Content>
                : __TransformationArray[0] extends ContentMutations["ExtractArray"]
                ? ExtractArray<Content>
                : __TransformationArray[0] extends ContentMutations["ExcludeArray"]
                ? ExcludeArray<Content>
                : __TransformationArray[0] extends ContentMutations["ExcludeObject"]
                ? ExcludeObject<Content>
                : "Tranformation not implemented")
            : Content,
            DropHead<__TransformationArray>,
            CanMutate
        >;
    }[CanMutate extends $ ? (Mutations extends [] ? "empty" : "nonEmpty") : "empty"];

export type Value<
    Content,
    ContentMutations extends ContentMutationOrArray = DefaultContentMutation,
    CanContentMutate = $,
    > = {
        Content: ValueContent<Content, ContentMutations, CanContentMutate>;
    };

export interface PureDualContent<
    LeftContent,
    RightContent
    > {
    LeftContent: LeftContent;
    RightContent: RightContent;
}

type DefaultDualContent = PureDualContent<any, any>;

export interface ImpureDualContent<
    LeftContent,
    RightContent,
    ContentMutations extends ContentMutationOrArray,
    CanContentMutate = $,
    > extends PureDualContent<
    Value<LeftContent, ContentMutations, CanContentMutate>["Content"],
    Value<RightContent, ContentMutations, CanContentMutate>["Content"]
    > { }

export interface PureFlankContent<
    DualContent extends DefaultDualContent
    > extends PureDualContent<DualContent["LeftContent"], DualContent["RightContent"]> { }

export interface ImpureFlankContent<
    DualContent extends DefaultDualContent,
    ContentMutations extends ContentMutationOrArray,
    CanContentMutate = $,
    > extends ImpureDualContent<DualContent["LeftContent"], DualContent["RightContent"], ContentMutations, CanContentMutate> { }

declare const test363: ImpureDualContent<"", { a: "b" }, ["ExtractObject"]>;
type tes23t = typeof test363.RightContent;

/**
 * Get the optional keys from an object.
 * credits: https://stackoverflow.com/a/49683575
 */
export type OptionalKeys<
    Props,
    > = (
        { [K in keyof Props]-?: {} extends { [P in K]: Props[K] } ? K : never }[keyof Props]
    );

export interface SpreadOverwriteModes {
    Extend: "Extend";
}

export interface SpreadMutualKeySignatures {
    Left: "Left";
}

export interface SpreadOptions<LeftContent> {
    OverwriteMode?: keyof SpreadOverwriteModes;
    Recursive?: boolean;
    MutualKeySignature?: keyof SpreadMutualKeySignatures;
    ComparableContent?: DeepStructure<LeftContent>;
}

export interface DefaultSpreadOptions<LeftContent> extends SpreadOptions<LeftContent> {
    OverwriteMode: undefined;
    Recursive: false;
    MutualKeySignature: undefined;
}

type IfOptionalExcludeUndefined<IsOptional extends boolean, T> = IsOptional extends true ? Exclude<T, undefined> : T;

/** A subtype of `Spread` and `SpreadProperty`. Not intended to be called directly. */
type SpreadContent<
    LeftContent,
    RightContent,
    OverwriteMode extends SpreadOptions<LeftContent>["OverwriteMode"],
    ComparableContent,
    // `unknown` relates to `DeepStructure`, where an empty property is `unknown`
    __ComparableContent = (unknown extends ComparableContent
        ? LeftContent
        : ComparableContent)
    > = (
        OverwriteMode extends SpreadOverwriteModes["Extend"]
        ? (RightContent extends __ComparableContent
            ? RightContent
            : LeftContent)
        : RightContent
    )
    // & {
    //     _: {
    //         left: LeftContent,
    //         right: RightContent,
    //         overwrite_mode: OverwriteMode,
    //         comparable_content: ComparableContent,
    //         __compare_content: __ComparableContent,
    //         right_content_extends___compare_content: RightContent extends __ComparableContent ? true : false,
    //     }
    // }
    ;

/** A subtype of `Spread`. Not intended to be called directly. */
type SpreadProperty<
    DualContent extends DefaultDualContent,
    Options extends SpreadOptions<DualContent["LeftContent"]>,
    ComparableContent extends DeepStructure<DualContent["LeftContent"]>,
    ValuesKeychain extends FlankValuesKeychain<DualContent>,
    MutualKey extends ValuesKeychain["MutualKeys"],
    __ComparableContentByMutualKey = ComparableContent[MutualKey],
    __LeftPropByMutualKey = DualContent["LeftContent"][MutualKey],
    __RightPropByMutualKey = DualContent["RightContent"][MutualKey]
    > = (
        /* L stands for left content and R for right content */
        // We want to check for Recursion..
        true extends Options["Recursive"]
        // ..so that we can spread L and R { ...L, ...R }
        ? FlankContentSpread<
            PureDualContent<
                IfOptionalExcludeUndefined<
                    Extends<MutualKey, ValuesKeychain["LeftValueKeychain"]["OptionalKeys"]>,
                    __LeftPropByMutualKey
                >,
                IfOptionalExcludeUndefined<
                    Extends<MutualKey, ValuesKeychain["RightValueKeychain"]["OptionalKeys"]>,
                    __RightPropByMutualKey
                >
            >,
            Options,
            __ComparableContentByMutualKey
        >
        // ..otherwise we want only the value
        : SpreadContent<__LeftPropByMutualKey, __RightPropByMutualKey, Options["OverwriteMode"], __ComparableContentByMutualKey>
    );

// type test263 = [unknown] extends "left" ? true : false;

type IsNonArrayObject<T> = (
    T extends object
    ? (T extends any[]
        ? false
        : true)
    : false
);

type DeepStructure<T> = {
    [P in keyof T]?: P extends { [K: string]: any } ? DeepStructure<P> : any
};

type test24 = DeepStructure<undefined>;

// type test25<
//     T1 extends any= any,
//     > = T1["test"];

// type test25_1 = test25<{}>;

// type DeepStructure<T> = (
//     T extends { [K: string]: any }
//     ? { [P in keyof T]?: DeepStructure<P> }
//     : any
// );

// type IsDeepStructure<T, __DeepStructure extends DeepStructure<T> | unknown = unknown> = (
//     unknown extends __DeepStructure
//     ? ( T extends DeepStructure<T> )

//     );

/**
 * Type of { ...L, ...R }
 * Inspired by: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
 */
export type FlankContentSpread<
    DualContent extends DefaultDualContent,
    Options extends SpreadOptions<DualContent["LeftContent"]> = DefaultSpreadOptions<DualContent["LeftContent"]>,
    __ComparableContent extends DeepStructure<DualContent["LeftContent"]> = (
        unknown extends Options["ComparableContent"]
        ? DeepStructure<DualContent["LeftContent"]>
        : Options["ComparableContent"]
    ),
    __ValuesKeychain extends FlankValuesKeychain<DualContent> = FlankValuesKeychain<DualContent>,
    __RemnantsKeychain extends DualRemnantKeychain<__ValuesKeychain> = DualRemnantKeychain<__ValuesKeychain>,
    __KeySignaturesKeychain extends (
        Options["MutualKeySignature"] extends SpreadMutualKeySignatures["Left"]
        ? __ValuesKeychain["LeftValueKeychain"]
        : __ValuesKeychain["RightValueKeychain"]
    ) = (
        Options["MutualKeySignature"] extends SpreadMutualKeySignatures["Left"]
        ? __ValuesKeychain["LeftValueKeychain"]
        : __ValuesKeychain["RightValueKeychain"]
    )
    > = (
        //     {
        //     _: {
        //         spread: {
        //             options: Options,
        //             __comparable_content: __ComparableContent
        //         }
        //     }
        // } &
        /* L stands for left content and R for right content */
        // Simple `extends` don't work afterwards. Infered types
        // are lost when you test `true` against `And<...>`.
        If<
            // Only spread, if L and R are objects but no arrays
            And<
                IsNonArrayObject<DualContent["LeftContent"]>,
                IsNonArrayObject<DualContent["RightContent"]>
            >,
            (
                // Properties in L, that don't exist in R
                & Pick<DualContent["LeftContent"], __RemnantsKeychain["LeftRemnant"]["Keys"]>
                // Properties in R, that don't exist in L
                & Pick<DualContent["RightContent"], __RemnantsKeychain["RightRemnant"]["Keys"]>
                /**
                 * Now we have to seperate them in optional and required keys, so that
                 * the optional and required property signatures remain preserved.
                 */
                // Spread each common properties that are optional
                & {
                    [P in __KeySignaturesKeychain["OptionalKeys"]]?: (
                        SpreadProperty<DualContent, Options, __ComparableContent, __ValuesKeychain, P>
                    )
                }
                // Spread each common properties that are required
                & {
                    [P in __KeySignaturesKeychain["RequiredKeys"]]: (
                        SpreadProperty<DualContent, Options, __ComparableContent, __ValuesKeychain, P>
                    )
                }
            ),
            // If not, we want only R
            SpreadContent<DualContent["LeftContent"], DualContent["RightContent"], Options["OverwriteMode"], __ComparableContent>
        >
    );

export type DualContentSpread<
    LeftContent,
    RightContent,
    Options extends SpreadOptions<LeftContent> = DefaultSpreadOptions<LeftContent>
    > = FlankContentSpread<PureDualContent<LeftContent, RightContent>, Options>;

// type test35<
//     A extends boolean,
//     B extends "true" | "false" = A extends true ? "true" : "false"
//     > = B;

// type test35_1 = test35<false>;

// type test36<
//     A extends { a?: "a" },
//     // B = A extends true ? "true" : "false"
//     > = A["a"];

// type test36_1 = test36<{ a: unknown }>;


// declare const test3456: Spread<DefaultPrimitivesAndPropsIntersectionOptions, {
//     PrimitiveIntersectionOptions?: {
//         ValueOptions: undefined,
//     },
// }, { OverwriteMode: "Extend", MutualKeySignature: "Left" }, ComparablePrimitivesAndPropsIntersectionOptions>; // { OverwriteMode: "extend", MutualKeySignature: "left" }
// test3456.PrimitiveIntersectionOptions.

type test924_0 = PureDualContent<{ a?: "a", b: { a: "a2" }, d?: "d", e?: { a: "a3", h: { a: "" }, haha?: "lol" } }, { a: undefined, b?: boolean, c?: undefined, e: { a: { a: "a4", b: "b3" }, h: { b: "" }, haha: "lol" } }>;
// type test924_0 = FlankValuesFromContent<{ d: { c: "c" } }, { d?: { a: "a" } }>;
// type test924_0 = FlankValuesFromContent<{ d: { c: "c" } }, { d: { a: "a" } | undefined }>;
// type test924_0 = FlankValuesFromContent<{ d: { c: "c" } }, { d?: { a: "a" } | undefined }>;
// type test924_0 = FlankValuesFromContent<string[], boolean[]>;
type test924_1 = FlankValuesKeychain<test924_0>["RequiredKeys"];
// type test924 = Spread<test924_0, { Recursive: true, OverwriteMode: "extend" }, { e: { h: { a: "works" } } }>;
// type test924 = Spread<ValuesL1<{ a: "test" }, {}>>;
// declare const ctest924: test924;
// ctest924.e.h.


export interface ContentKeychain<
    Content,
    __OptionalKeys extends OptionalKeys<Content> = OptionalKeys<Content>,
    __RequiredKeys extends Exclude<keyof Content, __OptionalKeys> = Exclude<keyof Content, __OptionalKeys>
    > {
    OptionalKeys: __OptionalKeys;
    RequiredKeys: __RequiredKeys;
    Keys: __OptionalKeys | __RequiredKeys;
}

export interface DualContentKeychain<
    LeftContent,
    RightContent,
    __LeftKeychain extends ContentKeychain<LeftContent> = ContentKeychain<LeftContent>,
    __RightKeychain extends ContentKeychain<RightContent> = ContentKeychain<RightContent>
    > {
    LeftValueKeychain: __LeftKeychain;
    RightValueKeychain: __RightKeychain;
    OptionalKeys: __LeftKeychain["OptionalKeys"] | __RightKeychain["OptionalKeys"];
    RequiredKeys: __LeftKeychain["RequiredKeys"] | __RightKeychain["RequiredKeys"];
    Keys: __LeftKeychain["Keys"] | __RightKeychain["Keys"];
    MutualOptionalKeys: __LeftKeychain["OptionalKeys"] & __RightKeychain["OptionalKeys"];
    MutualRequiredKeys: __LeftKeychain["RequiredKeys"] & __RightKeychain["RequiredKeys"];
    MutualKeys: __LeftKeychain["Keys"] & __RightKeychain["Keys"];
}

type DefaultDualKeychain = DualContentKeychain<any, any, any, any>;

export type FlankValuesKeychain<
    DualContent extends DefaultDualContent,
    __LeftKeychain extends ContentKeychain<DualContent["LeftContent"]> = ContentKeychain<DualContent["LeftContent"]>,
    __RightKeychain extends ContentKeychain<DualContent["RightContent"]> = ContentKeychain<DualContent["RightContent"]>
    > = DualContentKeychain<DualContent["LeftContent"], DualContent["RightContent"]>;

/** Represents an interface that calculates the left keys without the right keys. */
export interface SingleRemnantKeychain<
    DualKeychain extends DefaultDualKeychain,
    SingleKeychain extends DualKeychain["LeftValueKeychain"] | DualKeychain["RightValueKeychain"]
    > {
    OptionalKeys: Exclude<DualKeychain["OptionalKeys"], SingleKeychain["OptionalKeys"]>;
    RequiredKeys: Exclude<DualKeychain["RequiredKeys"], SingleKeychain["RequiredKeys"]>;
    Keys: Exclude<SingleKeychain["Keys"], DualKeychain["MutualKeys"]>;
}

export interface DualRemnantKeychain<
    DualContentKeychain extends DefaultDualKeychain
    > {
    LeftRemnant: SingleRemnantKeychain<DualContentKeychain, DualContentKeychain["LeftValueKeychain"]>;
    RightRemnant: SingleRemnantKeychain<DualContentKeychain, DualContentKeychain["RightValueKeychain"]>;
}

type test637 = FlankValuesKeychain<PureDualContent<{ b: "a" }, { b: "b", c: "c" }>>;
declare const test638: SingleRemnantKeychain<test637, test637["RightValueKeychain"]>;
type test638_1 = typeof test638.Keys;


export type ActionTypeOrActionCreator<Payload> = ActionFunctions<Payload> | string;


export type ExpandExtendMode = "ExtendState";
export type ExpandInheritMode = "InheritState";
export type ExpandRetainMode = "RetainState";


export type DefaultExpandMode = ExpandExtendMode;
export type ExpandModes = ExpandExtendMode | ExpandInheritMode | ExpandRetainMode;
export type IndefinableExpandModes = ExpandModes | undefined;


export type TakeFirstIfFirstExtendsNotCase<First, Second, NotCase = never> = If<
    Not<Extends<First, NotCase>>,
    First,
    Second
>;

export type TakeFirstIfMatchExtendsNotCase<Match, First, Second, NotCase = never> = If<
    Not<Extends<Match, NotCase>>,
    First,
    Second
>;

// type teest = If< // If $IsUnknownStateKnown is equals Known, ..
//     Extends<$IsUnknownStateKnown, Known>,
//     If< // If $UnknownState has the *same* type signature like State, or the retain expand mode is enabled, ..
//         Or<Extends<$UnknownState, InterState>, Extends<PreferredExpandStateMode, ReducerFactoryRetainStateMode>>,
//         // .. then we don't want to expand UnknownState, but rather we want to retain the type signature of UnknownState
//         $UnknownState,
//         If<
//             Extends<PreferredExpandStateMode, ReducerFactoryInheritStateMode>,
//             InheritedStateUnionPropsAndTypes<__ReducedState, $KnownState, $UnknownState>,
//             // If else we want to *extend* $UnknownState
//             UnionPropsAndTypes<$UnknownState, __ReducedState>
//         >
//     >,
//     __ReducedState
// >;

export interface PrimitivesMixtureOptions {
    ContentMutations: ContentMutationOrArray;
    MixtureKind: MixtureKindKeys;
}

interface DefaultPrimitivesMixtureOptions extends PrimitivesMixtureOptions {
    ContentMutations: [ContentMutations["ExcludeObject"]];
    MixtureKind: "Intersection";
}

// type test347 = {}

/** A Primitives-Mixture. */
export type PrimitivesMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PrimitivesMixtureOptions> = DefaultPrimitivesMixtureOptions,
    __Options extends PrimitivesMixtureOptions = DualContentSpread<DefaultPrimitivesMixtureOptions, Options, { OverwriteMode: "Extend", MutualKeySignature: "Left", ComparableContent: PrimitivesMixtureOptions }>,
    __DualContent extends ImpureFlankContent<DualContent, __Options["ContentMutations"]> = ImpureFlankContent<DualContent, __Options["ContentMutations"]>,
    __Intersection = Intersect<__DualContent["LeftContent"], __DualContent["RightContent"]>
    > = (
        ExtractOrUnknown<__Options["MixtureKind"], MixtureKinds["Intersection"]> extends MixtureKinds["Intersection"]
        ? __Intersection
        : never
    ) | (
        ExtractOrUnknown<__Options["MixtureKind"], FlankOrLeftUnionMixtureKind> extends FlankOrLeftUnionMixtureKind
        ? Exclude<__DualContent["LeftContent"], __Intersection>
        : never
    ) | (
        ExtractOrUnknown<__Options["MixtureKind"], FlankOrRightUnionMixtureKind> extends FlankOrRightUnionMixtureKind
        ? Exclude<__DualContent["RightContent"], __Intersection>
        : never
    );

type test58 = PureDualContent<string | (string | { a: "a" })[] | undefined, {} | number | (number | string | { a: "a2" })[]>;
// declare const test56: PrimitivesMixture<test58, { MixtureKind: MixtureKindKeys }>;
// type test78 = typeof test56;

type StringIntersection = "Intersection";

// type test23 = (string | number) & (string | bigint)

export interface MixtureKinds {
    Intersection: "Intersection";
    LeftUnion: "LeftUnion";
    RightUnion: "RightUnion";
    FlankUnion: "FlankUnion";
}

export type MixtureKindKeys = keyof MixtureKinds;
type FlankOrLeftUnionMixtureKind = MixtureKinds["FlankUnion"] | MixtureKinds["LeftUnion"];
type FlankOrRightUnionMixtureKind = MixtureKinds["FlankUnion"] | MixtureKinds["RightUnion"];

// type test37 = Extract<MixtureKinds["LeftUnion"], FlankOrLeftUnionMixtureKind>;

interface BasePropsMixtureOptions {
    ContentMutations: ContentMutationOrArray;
    MixtureKind: MixtureKindKeys;
}

export interface MutualPropsMixtureOptions extends BasePropsMixtureOptions {
    Recursive: boolean;
}

export interface DefaultMutualPropsMixtureOptions extends MutualPropsMixtureOptions {
    ContentMutations: ["ExtractObject", "ExcludeArray"];
    MixtureKind: "Intersection" | "FlankUnion";
    Recursive: false;
}

export interface PropsMixtureOptions extends BasePropsMixtureOptions {
    MutualPropsMixtureOptions: MutualPropsMixtureOptions;
}

interface DefaultPropsMixtureOptions extends PropsMixtureOptions {
    ContentMutations: ["ExtractObject", "ExcludeArray"];
    MixtureKind: "Intersection";
    MutualPropsMixtureOptions: DefaultMutualPropsMixtureOptions;
}

/** A subtype of `MutualPropsMixture`. Not intended to be called directly. */
type RecursiveMutualPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends PropsMixtureOptions,
    DualContentKeychain extends FlankValuesKeychain<DualContent> = FlankValuesKeychain<DualContent>,
    __RecursiveOptions extends PropsMixtureOptions = Options["MutualPropsMixtureOptions"] & { MutualPropsMixtureOptions: Options["MutualPropsMixtureOptions"] }
    > = Intersect<
        // Replace `PropsMixture` by a more generic one that can also mix primitives (and arrays)
        // => Current behaviour: { a: { a: "a1" } }, { a: { a: "a2"} } results in { a: { a: never } }, because the a.a's are muatated in PropsMixture, but flank props are working as expected :)
        { [K in DualContentKeychain["MutualOptionalKeys"]]?: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __RecursiveOptions, $, __RecursiveOptions>; },
        { [K in DualContentKeychain["MutualRequiredKeys"]]: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __RecursiveOptions, $, __RecursiveOptions>; }
    >;

/**
 * TODO: `IntersectProps<PureDualContent<{ a: { a: "" } }, { a: { a: "", b: "" } }>>` results in `const testtt24: { a: { a: ""; } | { a: ""; b: ""; }; }`
 * => Deep intersection and side union is required
 */
/** A subtype of `PropsMixture`. Not intended to be called directly. */
type MutualPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends PropsMixtureOptions,
    DualContentKeychain extends FlankValuesKeychain<DualContent> = FlankValuesKeychain<DualContent>
    > = (
        // {
        //     _: {
        //         mutual_props:
        //         {
        //             options: Options,
        //             mutual_keys: DualContentKeychain["MutualKeys"]
        //         }
        //     }
        // } &
        true extends Options["MutualPropsMixtureOptions"]["Recursive"]
        ? RecursiveMutualPropsMixture<DualContent, Options, DualContentKeychain>
        : Intersect<
            // Optional props
            { [K in DualContentKeychain["MutualOptionalKeys"]]?: DualContent["LeftContent"][K] | DualContent["RightContent"][K]; },
            // Required props
            { [K in DualContentKeychain["MutualRequiredKeys"]]: DualContent["LeftContent"][K] | DualContent["RightContent"][K]; }
        >
    );

type MutualExtendiblePropsMixture<
    DualContent extends DefaultDualContent,
    LeftMutualPick,
    RightMutualPick,
    __LeftMutualPick = LeftMutualPick extends DualContent["LeftContent"] ? DualContent["LeftContent"] : LeftMutualPick,
    __RightMutualPick = RightMutualPick extends DualContent["RightContent"] ? DualContent["RightContent"] : RightMutualPick
    > = (
        If<
            /* Overall we want check if smaller fits into bigger */
            And<Extends<LeftMutualPick, RightMutualPick>, Extends<RightMutualPick, LeftMutualPick>>,
            __LeftMutualPick & __RightMutualPick,
            If<
                Extends<LeftMutualPick, RightMutualPick>,
                __LeftMutualPick,
                __RightMutualPick
            >
        >
    );

type PreMutualPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends PropsMixtureOptions,
    DualContentKeychain extends FlankValuesKeychain<DualContent> = FlankValuesKeychain<DualContent>,
    __LeftMutualPick = PickOrNever<DualContent["LeftContent"], DualContentKeychain["MutualKeys"]>,
    __RightMutualPick = PickOrNever<DualContent["RightContent"], DualContentKeychain["MutualKeys"]>,
    > = (
        __LeftMutualPick extends __RightMutualPick
        // If L extends R ..
        ? MutualExtendiblePropsMixture<DualContent, __LeftMutualPick, __RightMutualPick>
        : __RightMutualPick extends __LeftMutualPick
        // .. or if R extends L ..
        ? MutualExtendiblePropsMixture<DualContent, __LeftMutualPick, __RightMutualPick>
        // .. otherwise mix L and R
        : MutualPropsMixture<DualContent, Options, DualContentKeychain>
    );

/** A Property-Mixture */
export type PropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PropsMixtureOptions> = DefaultPropsMixtureOptions,
    CanContentMutate = $,
    __Options extends PropsMixtureOptions = DualContentSpread<DefaultPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignature: "Left", ComparableContent: PropsMixtureOptions }>,
    __DualContent extends ImpureFlankContent<DualContent, __Options["ContentMutations"], CanContentMutate> = ImpureFlankContent<DualContent, __Options["ContentMutations"], CanContentMutate>,
    __DualContentKeychain extends FlankValuesKeychain<__DualContent> = FlankValuesKeychain<__DualContent>,
    __DualRemnantKeychain extends DualRemnantKeychain<__DualContentKeychain> =DualRemnantKeychain<__DualContentKeychain>
    > = (
        // {
        //     _: {
        //         "props": {
        //             __Options: __Options,
        //             // DualContent: DualContent,
        //             // __DualContent: __DualContent
        //             // __DualContentKeychainMutualKeys: __DualContentKeychain["MutualKeys"]
        //         },
        //     },
        // } &
        Intersect<
            Intersect<
                (
                    ExtractOrUnknown<__Options["MixtureKind"], MixtureKinds["Intersection"]> extends MixtureKinds["Intersection"]
                    ? (
                        __DualContentKeychain["MutualKeys"] extends never
                        // When there is no mutual key, then we know, that there will nothing
                        ? never
                        : PreMutualPropsMixture<__DualContent, __Options, __DualContentKeychain>
                    )
                    : never
                ), (
                    ExtractOrUnknown<__Options["MixtureKind"], FlankOrLeftUnionMixtureKind> extends FlankOrLeftUnionMixtureKind
                    ? PickOrNever<__DualContent["LeftContent"], __DualRemnantKeychain["LeftRemnant"]["Keys"]>
                    : never
                )
            >, (
                ExtractOrUnknown<__Options["MixtureKind"], FlankOrRightUnionMixtureKind> extends FlankOrRightUnionMixtureKind
                ? PickOrNever<__DualContent["RightContent"], __DualRemnantKeychain["RightRemnant"]["Keys"]>
                : never
            )
        >
    );

type test56 = unknown extends never ? true : false;

export interface PrimPropsMixtureOptions {
    PrimitiveIntersectionOptions: PrimitivesMixtureOptions;
    PropsIntersectionOptions: PropsMixtureOptions;
}

export interface DefaultPrimPropsMixtureOptions extends PrimPropsMixtureOptions {
    PrimitiveIntersectionOptions: DefaultPrimitivesMixtureOptions;
    PropsIntersectionOptions: DefaultPropsMixtureOptions;
}

export type PrimPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PrimPropsMixtureOptions> = DefaultPrimPropsMixtureOptions,
    __Options extends PrimPropsMixtureOptions = DualContentSpread<DefaultPrimPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignature: "Left", ComparableContent: PrimPropsMixtureOptions }>,
    > = (
        PrimitivesMixture<DualContent, __Options["PrimitiveIntersectionOptions"], __Options["PrimitiveIntersectionOptions"]>
        | PropsMixture<DualContent, __Options["PropsIntersectionOptions"], $, __Options["PropsIntersectionOptions"]>
    );

// declare const tttt: test3456;
// tttt.PropsOptions.ValueOptions

// type testtt_0 = PureDualContent<{ a: { a2: { a3: "a3" } }, b: "b" } | number, { a: { a2: { a3: "a3_1" } }, b: "b2" } | number | { d: "d" }>;
// type testtt_0 = PureDualContent<{ a: { a2: { a3: "a3" } }, b: "b", e: "e" } | number, { a: { a2: { a3: "a3_1" } }, b: "b2", d: "d" } | number>;
// type testtt_0 = PureDualContent<{ a: { a: "a1" }, b: "b1", c: "c1" }, { a: { a: "a2", b: "b2", c: {} }, e: "e2" }>; // TODO: intersect a: { a: ... } and a: { a: ... }
interface a1 {
    a: {
        a: "a1",
        // e: "e1"
    };
    b: "b1";
    c: "c1";
}

interface a2 {
    a: {
        a: "a1"
        // b: "b2"
        // c: {}
    };
    e: "e2";
}
type testtt_0 = PureDualContent<a1, a2>;
// type testtt_0 = PureDualContent<{ a: { a: "a1" } }, { a: { a: "a2" } }>;
// type testtt_0_0_1 = PureDualContent<{ a: { a: "" } }, { a: { a: "", b: "" } }>;
type testtt_0_1 = ImpureFlankContent<testtt_0, ["ExcludeObject"]>;
type testtt23 = PrimitivesMixture<testtt_0_1>;
type testtt_0_2 = ImpureFlankContent<testtt_0, ["ExtractObject"]>;
// declare const testtt24: PropsMixture<testtt_0, { MixtureKind: "Intersection", MutualPropsMixtureOptions: { ContentMutations: undefined, MixtureKind: "Intersection" | "FlankUnion", Recursive: true } }>;
// declare const testtt24: PropsMixture<testtt_0, { MixtureKind: "Intersection" }>;
// testtt24.a.
// type testtt24_0 = typeof testtt24._._2.LeftRemnant.Keys;

type test47 = [{}] extends [unknown] ? true : false;

type test589467840 = MixtureKinds["LeftUnion"] extends FlankOrLeftUnionMixtureKind ? true : false;

export interface ArrayMixtureOptions {
    ContentMutations: ContentMutationOrArray;
    // MixtureKind: MixtureKindKeys;
    PrimPropsMixtureOptions: PrimPropsMixtureOptions;
}

export interface DefaultArrayMixtureOptions extends ArrayMixtureOptions {
    ContentMutations: "ExtractArray";
    // MixtureKind: "Intersection" | "FlankUnion";
    PrimPropsMixtureOptions: DefaultPrimPropsMixtureOptions;
}

export type ArrayMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<ArrayMixtureOptions> = DefaultArrayMixtureOptions,
    __Options extends ArrayMixtureOptions = DualContentSpread<DefaultArrayMixtureOptions, Options, { OverwriteMode: "Extend", MutualKeySignature: "Left", ComparableContent: ArrayMixtureOptions }>,
    __DualContent extends ImpureFlankContent<DualContent, __Options["ContentMutations"]> = ImpureFlankContent<DualContent, __Options["ContentMutations"]>
    > = (
        __DualContent["LeftContent"] extends Array<infer LeftTypes>
        ? __DualContent["RightContent"] extends Array<infer RightTypes>
        ? Array<PrimPropsMixture<PureDualContent<LeftTypes, RightTypes>, __Options["PrimPropsMixtureOptions"], __Options["PrimPropsMixtureOptions"]>>
        : never
        : never
    );

// // type test56_0 = Exclude {} | (number | string | { a: "a2" })[]
type test59 = PureDualContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, {} | number | (undefined)[] | (number | string | { a: "a2" })[]>;
declare const test59_1: ArrayMixture<test59>;


// type test61 = ValueContent<[number] | any[], "ExtractArray", $>;

// type test60 = PureDualContent<{ a: "a" }, { a: "a2" }>;
// declare const test60_1: PropsMixture<test60, { MixtureKind: "Intersection" }>;

// export interface ArrPrimPropsMixtureOptions {

// }

export type ArrPrimPropsMixture<
    // to be continued ...
    > = true;



// declare const testtt24: IntersectProps<testtt_0>;
// testtt24.
// type testtt55 = FlankValuesKeychain<testtt_0_2>;

// type testtt_1_1 = SpreadFromContent<DefaultPrimitivesAndPropsIntersectionOptions, { PrimitiveOptions: { ValueOptions: [] } }, { OverwriteMode: "extend", MutualKeySignature: "left" }, PrimitivesAndPropsIntersectionOptions>;
// declare const testtt_1_1: testtt_1_1;
// testtt_1_1.PrimitiveOptions.

// type testtt = IntersectPrimitivesAndProps<testtt_0, { PropsOptions: undefined }>;
// type testtt = IntersectPrimitivesAndProps<testtt_0>;
// type testtt_1 = IntersectProps<testtt_0>;


// export type t2345 = [test:];

// type ArrayInnerType<T> = T extends Array<infer InnerType> ? InnerType : never;

// export type IntersectArrays<
//     A,
//     B,
//     ExpandMode extends ExpandModes,
//     __A extends ArrayInnerType<A> = ArrayInnerType<A>,
//     __B extends ArrayInnerType<B> = ArrayInnerType<B>,
//     > = (
//         If<
//             Or<Extends<__A, never>, Extends<__A, never>>,
//             never,

//         >
//         // Array<IntersectProps<
//         //     __A,
//         //     __B,
//         //     ExpandMode
//         // >>
//     );


// Or<And<Extends<A, B>, Extends<B, A>>, Extends<ExpandStateMode, ReducerFactoryRetainStateMode>>,
//         A & B,
//         {
//             [K in (__MutualKeys extends (AnyKeys<A> & AnyKeys<B>) ? __MutualKeys : never)]: (
//                 If<
//                     Extends<ExpandStateMode, ReducerFactoryInherit>,
//                     true,
//                     false
//                 >
//             )
//         }

// /** Does A have any object in his union? Returns export type of true or false. */
// export type HasExtractableObject<A> = Not<Extends<ExtractObject<A>, never>>;

// export type HasExtractableObjectWithoutArray<A> = Not<Extends<ExtractObjectExceptArray<A>, never>>;

// /** Creates an union of any extractable objects. */
// export type UnionExtractableObjects<A, B> = If<
//     // If A or B has object ..
//     Or<HasExtractableObject<A>, HasExtractableObject<B>>,
//     // .. then return the one or the other object
//     ExtractObject<A> | ExtractObject<B>,
//     // .. else
//     {}
// >;

// // // // // // /** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. */
// // // // // // export type UnionPropsExcept<
// // // // // //     A,
// // // // // //     B,
// // // // // //     LR extends DefaultLeftRight2,
// // // // // //     __X extends LeftRightKeychain<LR>,
// // // // // //     __AKeys extends AnyKeys<__A> = AnyKeys<__A>,
// // // // // //     __BKeys extends AnyKeys<__B> = AnyKeys<__B>,
// // // // // //     __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
// // // // // //     __AKeysWithoutMutualKeys extends TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys> = TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys>,
// // // // // //     __IntersectedProps extends (
// // // // // //         IntersectProps<
// // // // // //             A,
// // // // // //             B,
// // // // // //             __A,
// // // // // //             __B,
// // // // // //             __AKeys,
// // // // // //             __BKeys,
// // // // // //             __MutualKeys>
// // // // // //     ) = (
// // // // // //         IntersectProps<
// // // // // //             A,
// // // // // //             B,
// // // // // //             __A,
// // // // // //             __B,
// // // // // //             __AKeys,
// // // // // //             __BKeys,
// // // // // //             __MutualKeys>
// // // // // //     )
// // // // // //     > = (
// // // // // //         If<
// // // // // //             /* Overall we want to check if smaller fits into bigger */
// // // // // //             Extends<__IntersectedProps, __A>,
// // // // // //             If<
// // // // // //                 Extends<__A, A>,
// // // // // //                 A,
// // // // // //                 __A
// // // // // //             >,
// // // // // //             __IntersectedProps
// // // // // //         >
// // // // // //     );

// /** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A and B. */
// export type UnionProps<
//     A,
//     B,
//     ExpandStateMode extends ExpandModes,
//     __MutualKeys extends IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>> = IntersectPrimitiveTypes<AnyKeys<A>, AnyKeys<B>>,
//     __LeftKeys extends IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>> = IfNot3<__MutualKeys, Exclude<AnyKeys<A>, __MutualKeys>, AnyKeys<A>>,
//     __RightKeys extends IfNot3<__MutualKeys, Exclude<AnyKeys<B>, __MutualKeys>, AnyKeys<B>> = IfNot3<__MutualKeys, Exclude<AnyKeys<B>, __MutualKeys>, AnyKeys<B>>
//     > = UnionPropsExcept<A, B, ExpandStateMode, __MutualKeys, __LeftKeys> & Pick<B, __RightKeys>;


export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

/** Create an union of the primitive types of Object A and Object B. */
export type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;


// type ArrayInnerType<A> = A extends Array<infer InnerType> ? InnerType : never;

// type IntersectArray<
// A,
// B,
// __A extends ExtractArray<A> = ExtractArray<A>,
// __B extends ExtractArray<B> = ExtractArray<B>
// > = __A extends Array<infer ArrA>


// // // // // // // // // // // // // // // // // // // // export type IntersectPrimitiveTypesAndArrays<
// // // // // // // // // // // // // // // // // // // //     A, B,
// // // // // // // // // // // // // // // // // // // //     __A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
// // // // // // // // // // // // // // // // // // // //     __B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>,
// // // // // // // // // // // // // // // // // // // //     > = ExcludeObjectExceptArray<Exclude<__A2 | __B2, Exclude<__A2, __B2> | Exclude<__B2, __A2>>>;

// export type UnionPrimitiveTypesAndArraysExcept<
//     A, B,
//     __A2 extends ExcludeObjectExceptArray<A> = ExcludeObjectExceptArray<A>,
//     __B2 extends ExcludeObjectExceptArray<B> = ExcludeObjectExceptArray<B>
//     > = Exclude<__A2 | __B2, Exclude<__B2, __A2>>;

// export type UnionPrimitiveTypesAndArrays<A, B> = ExcludeObjectExceptArray<A | B>;

// export type PreferPrimitivesOverProps<Props, Primitives> = If<
//     And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
//     Primitives,
//     Props | Primitives
// >;

// export type IntersectPropsAndTypes<
//     A, B,
//     > = PreferPrimitivesOverProps<IntersectProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, IntersectPrimitiveTypesAndArrays<A, B>>;

// export type UnionPropsAndTypesExcept<
//     A, B,
//     > = PreferPrimitivesOverProps<UnionPropsExcept<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArraysExcept<A, B>>;

// export type UnionPropsAndTypes<
//     A, B,
//     > = PreferPrimitivesOverProps<UnionProps<ExtractObjectExceptArray<A>, ExtractObjectExceptArray<B>>, UnionPrimitiveTypesAndArrays<A, B>>;

// export type PropsAndTypesExcept<A, B> = PreferPrimitivesOverProps<If<
//     And<HasExtractableObjectWithoutArray<A>, HasExtractableObjectWithoutArray<B>>,
//     Pick<ExtractObjectExceptArray<A>, Exclude<AnyKeys<ExtractObjectExceptArray<A>>, AnyKeys<ExtractObjectExceptArray<B>>>>,
//     ExtractObjectExceptArray<A>
// >, Exclude<ExcludeObjectExceptArray<A>, ExcludeObjectExceptArray<B>>>;

interface ITest { a: string; b: { a: string }; c: boolean; };

type test_2 = { a: string, b: { a: string } };

type test = ITest | { a: string };
const ctest: test = { a: "" };
type test2 = typeof ctest;

type test3 = AnyKeys<ITest> & AnyKeys<test_2>;

// type gh = PropsMixture<PureDualContent<{ a: "a" }, { a: "b" }>>;

// type gh = IntersectArrays<string[], string[], DefaultExpandMode>;
// type gj = string extends never ? true : false;

type ag = string[];
type agKeys = keyof ag;
type agPicked = Pick<ag, agKeys>;
type agExtends = Extends<ag, agPicked>;

type og = { a: "a" };
type ogKeys = keyof og;
type ogPicked = Pick<og, ogKeys>;
type ogExtends = Extends<og, ogPicked>;

interface ig { a: "a"; }
type igKeys = keyof ig;
type igPicked = Pick<ig, igKeys>;
type igExtends = Extends<ig, igPicked>;

interface ig2 { a: "a"; }
type ig2_0 = ig2 & { b: "b"; }
type ig2Keys = keyof ig2_0;
type ig2Picked = Pick<ig2_0, ig2Keys>;
type ig2Extends = Extends<ig2_0, ig2Picked>;

// type gg = IntersectProps<ig, og>;
// type gg2 = IntersectProps<gg, ig2_0>;


// type gg3 = IntersectProps<2, string>;
// declare const cgg3: gg3;

// type gg4 = UnionPropsExcept<string[], string[], DefaultExpandMode>;
// declare const cgg4: gg4;
// type gg4_0 = AnyKeys<number> & AnyKeys<number>;

// interface igg5 { a: "a1"; b: number; }
// type tgg5 = { a: "a1", b: number, d: "d" };
// type gg5 = UnionPropsExcept<{ a: "a1", b: number, c: "c" }, { a: "a2", b: string, d: "d" }, DefaultExpandMode>;
// type gg5_1 = UnionPropsExcept<igg5, tgg5, DefaultExpandMode>;
// type gg5_2 = UnionPropsExcept<tgg5, igg5, DefaultExpandMode>;
// type gg5_2_1 = tgg5 extends igg5 ? true : false;

// type sp = Spread<ig2_0 & { c?: null }, { a: "a2", d?: null }>;
// declare const csp: sp;
// csp.

// type gg3Keys = keyof og & keyof string;

// type test4 = keyof ig2_0 | keyof og;

// const test: {} & string[] = {} as any;


type ot = "1" & "2" extends "1" ? true : false;

/**
 *
 */

type ko<
    T,
    __T extends ExtractObject<T> = ExtractObject<T>
    > = keyof __T;
type tko = ko<(number | { a: "a" })>;

type test765 = number extends {} & {} ? true : false;
type tt3 = { Content: number } extends Value<any> ? true : false;
