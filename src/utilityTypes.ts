import { AnyKeys, ExcludeArray, ExcludeObject, Extends, ExtractArray, ExtractObject } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";
import { } from "typescript-tuple";
// import { Tail } from "typescript-tuple/lib/utils";
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
    // When A extends never ..
    [A] extends [never]
    // .. take B, whatever it is
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

// export type DropHead<Tuple extends any[]> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];

// type Tail<T> = T extends any[]
//     ? (T extends [] ? []
//         : T extends [any] ? []
//         : T extends [any, infer arg1] ? [arg1]
//         : T extends [any, infer arg1, infer arg2] ? [arg1, arg2]
//         : T extends [any, infer arg1, infer arg2, infer arg3] ? [arg1, arg2, arg3]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4] ? [arg1, arg2, arg3, arg4]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5] ? [arg1, arg2, arg3, arg4, arg5]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6] ? [arg1, arg2, arg3, arg4, arg5, arg6]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6, infer arg7] ? [arg1, arg2, arg3, arg4, arg5, arg6, arg7]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6, infer arg7, infer arg8] ? [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6, infer arg7, infer arg8, infer arg9] ? [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6, infer arg7, infer arg8, infer arg9, infer arg10] ? [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10]
//         : T extends [any, infer arg1, infer arg2, infer arg3, infer arg4, infer arg5, infer arg6, infer arg7, infer arg8, infer arg9, infer arg10, infer arg11] ? [arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11]
//         : never)
//     : never;

type Tail<T> = T extends any[]
    ? (((...args: T) => never) extends ((a: any, ...args: infer R) => never)
        ? R
        : never)
    : never;

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
export type ContentMutationOrArray = ContentMutationKeys | ContentMutationArray;
export type ContentMutationAsArray<Options extends ContentMutationOrArray> = Options extends ContentMutationKeys[] ? Options : [Options];

export type $ = {};

type MutateContent<Content, Mutation extends ContentMutationKeys> = (
    Mutation extends ContentMutations["ExtractObject"] ? ExtractObject<Content>
    : Mutation extends ContentMutations["ExtractArray"] ? ExtractArray<Content>
    : Mutation extends ContentMutations["ExcludeArray"] ? ExcludeArray<Content>
    : Mutation extends ContentMutations["ExcludeObject"] ? ExcludeObject<Content>
    : "Mutation not implemented"
);

type GetLength<Tuple extends any[]> = Tuple extends { length: infer L } ? L : 0;

export type ValueContent<
    Content,
    Mutations extends ContentMutationOrArray,
    __Mutations extends ContentMutationAsArray<Mutations> = ContentMutationAsArray<Mutations>,
    __MutationsLength extends number = GetLength<__Mutations>,
    > = (
        __MutationsLength extends 0 ? Content
        : __MutationsLength extends 1 ? MutateContent<Content, __Mutations[0]>
        : __MutationsLength extends 2 ? MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>
        : __MutationsLength extends 3 ? MutateContent<MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>, __Mutations[2]>
        : __MutationsLength extends 4 ? MutateContent<MutateContent<MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>, __Mutations[2]>, __Mutations[3]>
        : "The amount of mutations have been exceeded"
    );

type test278 = ValueContent<{}, "ExcludeObject">;

export type Value<
    Content,
    ContentMutations extends ContentMutationOrArray = DefaultContentMutation,
    > = {
        Content: ValueContent<Content, ContentMutations>;
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
    > extends PureDualContent<
    Value<LeftContent, ContentMutations>["Content"],
    Value<RightContent, ContentMutations>["Content"]
    > { }

export interface PureFlankContent<
    DualContent extends DefaultDualContent
    > extends PureDualContent<DualContent["LeftContent"], DualContent["RightContent"]> { }

export interface ImpureFlankContent<
    DualContent extends DefaultDualContent,
    ContentMutations extends ContentMutationOrArray,
    > extends ImpureDualContent<DualContent["LeftContent"], DualContent["RightContent"], ContentMutations> { }

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

export interface SpreadMutualKeySignaturePreserveKinds {
    Left: "Left";
}

export interface SpreadOptions<LeftContent> {
    /** We are spreading from RIGHT to LEFT. By setting `OverwriteMode` to `Extend`, LEFT is only overwritten by RIGHT, if RIGHT extends LEFT or `ComparableContent`, if set so.  */
    OverwriteMode?: keyof SpreadOverwriteModes;
    Recursive?: boolean;
    /** Normally the RIGHT key signatures are taken, but if `Left` is specified, then the LEFT key signatures are taken */
    MutualKeySignaturePreserveKind?: keyof SpreadMutualKeySignaturePreserveKinds;
    ComparableContent?: DeepStructure<LeftContent>;
}

export interface DefaultSpreadOptions<LeftContent> extends SpreadOptions<LeftContent> {
    OverwriteMode: undefined;
    Recursive: false;
    MutualKeySignaturePreserveKind: undefined;
}

type IfOptionalExcludeUndefined<IsOptional extends boolean, T> = IsOptional extends true ? Exclude<T, undefined> : T;

/** A subtype of `FlankContentSpread` and `SpreadProperty`. Not intended to be called directly. */
type SpreadContent<
    LeftContent,
    RightContent,
    OverwriteMode extends SpreadOptions<LeftContent>["OverwriteMode"],
    ComparableContent
    > = (
        OverwriteMode extends SpreadOverwriteModes["Extend"]
        // `unknown` relates to `DeepStructure`, where an empty property is `unknown`
        ? (RightContent extends (unknown extends ComparableContent ? LeftContent : ComparableContent)
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
        Options["MutualKeySignaturePreserveKind"] extends SpreadMutualKeySignaturePreserveKinds["Left"]
        ? __ValuesKeychain["LeftValueKeychain"]
        : __ValuesKeychain["RightValueKeychain"]
    ) = (
        Options["MutualKeySignaturePreserveKind"] extends SpreadMutualKeySignaturePreserveKinds["Left"]
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

export interface PrimsMixtureOptions {
    ContentMutations: ContentMutationOrArray;
    MixtureKind: MixtureKindKeys;
}

interface DefaultPrimsMixtureOptions extends PrimsMixtureOptions {
    ContentMutations: [ContentMutations["ExcludeObject"]];
    MixtureKind: "Intersection";
}

// type test347 = {}

// type test374<
//     CanMutate,
//     __DualContent extends ImpureFlankContent<PureDualContent<any, any>, any, false> = ImpureFlankContent<PureDualContent<any, any>, any, CanMutate>,
//     > = boolean;

// type test374<
//     __DualContent extends ImpureFlankContent<PureDualContent<{}, {}>, []> = ImpureFlankContent<PureDualContent<{}, {}>, []>,
//     > = boolean;

/** A Primitives-Mixture. */
export type PrimsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PrimsMixtureOptions> = DefaultPrimsMixtureOptions,
    __Options extends PrimsMixtureOptions = DualContentSpread<DefaultPrimsMixtureOptions, Options, { OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: PrimsMixtureOptions }>,
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
// declare const test56: PrimsMixture<test58, { MixtureKind: MixtureKindKeys }>;
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

export interface MutualPropsMixtureRecursionOptions {
    PrimsMixtureOptions: PrimsMixtureOptions;
    BaseArrayMixtureOptions: BaseArrayMixtureOptions;
}

export interface DefaultMutualPropsMixtureRecursionOptions extends MutualPropsMixtureRecursionOptions {
    PrimsMixtureOptions: DefaultPrimsMixtureOptions;
    BaseArrayMixtureOptions: DefaultBaseArrayMixtureOptions;
}

export interface MutualPropsMixtureOptions extends BasePropsMixtureOptions {
    RecursionOptions: MutualPropsMixtureRecursionOptions;
    Recursive: boolean;
}

export interface DefaultMutualPropsMixtureOptions extends MutualPropsMixtureOptions {
    ContentMutations: ["ExtractObject", "ExcludeArray"];
    MixtureKind: "Intersection" | "FlankUnion";
    RecursiveOptions: DefaultMutualPropsMixtureRecursionOptions;
    Recursive: false;
}

export interface PropsMixtureOptions extends BasePropsMixtureOptions {
    MutualPropsMixtureOptions: MutualPropsMixtureOptions;
}

export interface DefaultPropsMixtureOptions extends PropsMixtureOptions {
    ContentMutations: ["ExtractObject", "ExcludeArray"];
    MixtureKind: "Intersection";
    MutualPropsMixtureOptions: DefaultMutualPropsMixtureOptions;
}

/** A subtype of `MutualPropsMixture`. Not intended to be called directly. */
type RecursiveMutualPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends PropsMixtureOptions,
    DualContentKeychain extends FlankValuesKeychain<DualContent> = FlankValuesKeychain<DualContent>,
    // __Options extends PropsMixtureOptions = Options["MutualPropsMixtureOptions"] & { MutualPropsMixtureOptions: Options["MutualPropsMixtureOptions"] }
    __PropsMixtureOptions extends PropsMixtureOptions = Options["MutualPropsMixtureOptions"] & { MutualPropsMixtureOptions: Options["MutualPropsMixtureOptions"] },
    __PrimsMixtureOptions extends PrimsMixtureOptions = Options["MutualPropsMixtureOptions"]["RecursionOptions"]["PrimsMixtureOptions"],
    __Options extends ArrayPrimsPropsMixtureOptions = {
        PropsMixtureOptions: __PropsMixtureOptions,
        PrimsMixtureOptions: __PrimsMixtureOptions,
        ArrayMixtureOptions: Options["MutualPropsMixtureOptions"]["RecursionOptions"]["BaseArrayMixtureOptions"] & {
            PropsMixtureOptions: __PropsMixtureOptions,
            PrimsMixtureOptions: __PrimsMixtureOptions,
        },
    }
    > = Intersect<
        // Replace `PropsMixture` by a more generic one that can also mix primitives (and arrays)
        // => Current behaviour: { a: { a: "a1" } }, { a: { a: "a2"} } results in { a: { a: never } }, because the a.a's are muatated in PropsMixture, but flank props are working as expected :)
        { [K in DualContentKeychain["MutualOptionalKeys"]]?: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options, __Options>; },
        { [K in DualContentKeychain["MutualRequiredKeys"]]: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options, __Options>; }
    >;

/**
 * TODO: `IntersectProps<PureDualContent<{ a: { a: "" } }, { a: { a: "", b: "" } }>>` results in `const testtt24: { a: { a: ""; } | { a: ""; b: ""; }; }`
 * => Deep intersection and side union is required
 */
/** A subtype of `PropsMixture`. Not intended to be called directly. */
type NonRecursiveMutualPropsMixture<
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
        true extends Options["MutualPropsMixtureOptions"]["Recursive"] ? RecursiveMutualPropsMixture<DualContent, Options, DualContentKeychain>
        : Intersect<
            // Optional props
            { [K in DualContentKeychain["MutualOptionalKeys"]]?: DualContent["LeftContent"][K] | DualContent["RightContent"][K]; },
            // Required props
            { [K in DualContentKeychain["MutualRequiredKeys"]]: DualContent["LeftContent"][K] | DualContent["RightContent"][K]; }
        >
    );

type ExtendedPropsMixture<
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
        // If L extends R ..
        __LeftMutualPick extends __RightMutualPick ? ExtendedPropsMixture<DualContent, __LeftMutualPick, __RightMutualPick>
        // .. or if R extends L ..
        : __RightMutualPick extends __LeftMutualPick ? ExtendedPropsMixture<DualContent, __LeftMutualPick, __RightMutualPick>
        // .. otherwise mix L and R
        : NonRecursiveMutualPropsMixture<DualContent, Options, DualContentKeychain>
    );

/** A Property-Mixture */
export type PropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PropsMixtureOptions> = DefaultPropsMixtureOptions,
    __Options extends PropsMixtureOptions = DualContentSpread<DefaultPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: PropsMixtureOptions }>,
    __DualContent extends ImpureFlankContent<DualContent, __Options["ContentMutations"]> = ImpureFlankContent<DualContent, __Options["ContentMutations"]>,
    __DualContentKeychain extends FlankValuesKeychain<__DualContent> = FlankValuesKeychain<__DualContent>,
    __DualRemnantKeychain extends DualRemnantKeychain<__DualContentKeychain> = DualRemnantKeychain<__DualContentKeychain>
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
        // We want to intersect (&) a possible left picked object, a possible shared properties picked object and a possible right picked object
        Intersect<
            Intersect<
                (
                    ExtractOrUnknown<__Options["MixtureKind"], MixtureKinds["Intersection"]> extends MixtureKinds["Intersection"]
                    ? (
                        __DualContentKeychain["MutualKeys"] extends never
                        // When there is no shared property, then we know the picking object remains empty
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

export interface PrimsPropsMixtureOptions {
    PrimsMixtureOptions: PrimsMixtureOptions;
    PropsMixtureOptions: PropsMixtureOptions;
}

export interface DefaultPrimsPropsMixtureOptions extends PrimsPropsMixtureOptions {
    PrimsMixtureOptions: DefaultPrimsMixtureOptions;
    PropsMixtureOptions: DefaultPropsMixtureOptions;
}

// FEATURE: PRIM PROPS MIXTURE
export type PrimsPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<PrimsPropsMixtureOptions> = DefaultPrimsPropsMixtureOptions,
    __Options extends PrimsPropsMixtureOptions = DualContentSpread<DefaultPrimsPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: PrimsPropsMixtureOptions }>,
    > = (
        PrimsMixture<DualContent, __Options["PrimsMixtureOptions"], __Options["PrimsMixtureOptions"]>
        | PropsMixture<DualContent, __Options["PropsMixtureOptions"], __Options["PropsMixtureOptions"]>
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
// type testtt23 = PrimsMixture<testtt_0_1>;
type testtt_0_2 = ImpureFlankContent<testtt_0, ["ExtractObject"]>;
// declare const testtt24: PropsMixture<testtt_0, { MixtureKind: "Intersection", MutualPropsMixtureOptions: { ContentMutations: undefined, MixtureKind: "Intersection" | "FlankUnion", Recursive: true } }>;
// declare const testtt24: PropsMixture<testtt_0, { MixtureKind: "Intersection" }>;
// testtt24.a.
// type testtt24_0 = typeof testtt24._._2.LeftRemnant.Keys;

type test47 = [{}] extends [unknown] ? true : false;

type test589467840 = MixtureKinds["LeftUnion"] extends FlankOrLeftUnionMixtureKind ? true : false;

interface BaseArrayMixtureOptions {
    ContentMutations: ContentMutationOrArray;
}

interface DefaultBaseArrayMixtureOptions extends BaseArrayMixtureOptions {
    ContentMutations: "ExtractArray";
}

export interface ArrayMixtureOptions extends BaseArrayMixtureOptions, PrimsPropsMixtureOptions {
    // MixtureKind: MixtureKindKeys;
    // PrimsPropsMixtureOptions: PrimsPropsMixtureOptions;
}

export interface DefaultArrayMixtureOptions extends DefaultBaseArrayMixtureOptions, DefaultPrimsPropsMixtureOptions {

    // MixtureKind: "Intersection" | "FlankUnion";
    // PrimsPropsMixtureOptions: DefaultPrimsPropsMixtureOptions;
}

// FEATURE: ARRAY MIXTURE
export type ArrayMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<ArrayMixtureOptions> = DefaultArrayMixtureOptions,
    __Options extends ArrayMixtureOptions = DualContentSpread<DefaultArrayMixtureOptions, Options, { OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: ArrayMixtureOptions }>,
    __DualContent extends ImpureFlankContent<DualContent, __Options["ContentMutations"]> = ImpureFlankContent<DualContent, __Options["ContentMutations"]>
    > = (
        __DualContent["LeftContent"] extends Array<infer LeftTypes>
        ? __DualContent["RightContent"] extends Array<infer RightTypes>
        ? Array<PrimsPropsMixture<PureDualContent<LeftTypes, RightTypes>, __Options, __Options>>
        : never
        : never
    );

// // type test56_0 = Exclude {} | (number | string | { a: "a2" })[]
type test59 = PureDualContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, {} | number | (undefined)[] | (number | string | { a: "a2" })[]>;
type test59_1 = MutateContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, "ExtractArray">;
declare const test59_1: ArrayMixture<test59>;


type test61 = ValueContent<[number] | any[] | number, "ExcludeObject">;

// type test60 = PureDualContent<{ a: "a" }, { a: "a2" }>;
// declare const test60_1: PropsMixture<test60, { MixtureKind: "Intersection" }>;

export interface ArrayPrimsPropsMixtureOptions extends PrimsPropsMixtureOptions {
    ArrayMixtureOptions: ArrayMixtureOptions;
}

export interface DefaultArrayPrimsPropsMixtureOptions extends ArrayPrimsPropsMixtureOptions {
    PrimsMixtureOptions: DefaultPrimsMixtureOptions;
    PropsMixtureOptions: DefaultPropsMixtureOptions;
    ArrayMixtureOptions: DefaultArrayMixtureOptions;
}

// FEATURE: PRIM PROPS MIXTURE
export type ArrayPrimsPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<ArrayPrimsPropsMixtureOptions> = DefaultArrayPrimsPropsMixtureOptions,
    __Options extends ArrayPrimsPropsMixtureOptions = DualContentSpread<DefaultArrayPrimsPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: ArrayPrimsPropsMixtureOptions }>,
    > = (
        PrimsPropsMixture<DualContent, __Options, __Options>
        | ArrayMixture<DualContent, __Options["ArrayMixtureOptions"]>
    );

// // type test56_0 = Exclude {} | (number | string | { a: "a2" })[]
type test60 = PureDualContent<(
    { a: { b: { c: { a: "a" } } } }
), (
    { a: { b: { c: { a: "b" } } } }
)>;
// type test60_1 = MutateContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, "ExtractArray">;
declare const test60_1: PropsMixture<test60>;


export type UnionPrimitiveTypesExcept<A, B> = Exclude<A | B, Exclude<B, A> | object>;

/** Create an union of the primitive types of Object A and Object B. */
export type UnionPrimitiveTypes<A, B> = ExcludeObject<A | B>;

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
