import { ExcludeArray, ExcludeObject, Extends, ExtractArray, ExtractObject } from "@teronis/ts-definitions";
import { And, If } from "typescript-logic";
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

export type Intersect<A, B> = (
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

/**
 * Get the optional keys from an object.
 * credits: https://stackoverflow.com/a/49683575
 */
export type OptionalKeys<
    Props,
    > = (
        { [K in keyof Props]-?: {} extends { [P in K]: Props[K] } ? K : never }[keyof Props]
    );

type IfOptionalExcludeUndefined<IsOptional extends boolean, T> = IsOptional extends true ? Exclude<T, undefined> : T;

export type DeepStructure<T> = {
    [P in keyof T]?: P extends { [K: string]: any } ? DeepStructure<P> : any
};

type IsNonArrayObject<T> = (
    T extends object
    ? (T extends any[]
        ? false
        : true)
    : false
);

/** If `Keys` is equals never, then `never` will be returned instead of `{}`. */
export type PickOrNever<T, Keys extends keyof T> = [Keys] extends [never] ? never : Pick<T, Keys>;

export type ExtractOrUnknown<T, U, Extraction = Extract<T, U>> = [Extraction] extends [never] ? unknown : Extraction;


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


export type MutateContent<Content, Mutation extends ContentMutationKeys> = (
    Mutation extends ContentMutations["ExtractObject"] ? ExtractObject<Content>
    : Mutation extends ContentMutations["ExtractArray"] ? ExtractArray<Content>
    : Mutation extends ContentMutations["ExcludeArray"] ? ExcludeArray<Content>
    : Mutation extends ContentMutations["ExcludeObject"] ? ExcludeObject<Content>
    : "Mutation not implemented"
);


export type Length<Tuple extends any[]> = Tuple extends { length: infer L } ? L : 0;

export type ValueContent<
    Content,
    Mutations extends ContentMutationOrArray,
    __Mutations extends ContentMutationAsArray<Mutations> = ContentMutationAsArray<Mutations>,
    __MutationsLength extends number = Length<__Mutations>,
    > = (
        __MutationsLength extends 0 ? Content
        : __MutationsLength extends 1 ? MutateContent<Content, __Mutations[0]>
        : __MutationsLength extends 2 ? MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>
        : __MutationsLength extends 3 ? MutateContent<MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>, __Mutations[2]>
        : __MutationsLength extends 4 ? MutateContent<MutateContent<MutateContent<MutateContent<Content, __Mutations[0]>, __Mutations[1]>, __Mutations[2]>, __Mutations[3]>
        : "The amount of mutations have been exceeded"
    );

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


// /** MIXTURES */


export interface MixtureKinds {
    Intersection: "Intersection";
    LeftUnion: "LeftUnion";
    RightUnion: "RightUnion";
    FlankUnion: "FlankUnion";
}

export type MixtureKindKeys = keyof MixtureKinds;
export type FlankOrLeftUnionMixtureKind = MixtureKinds["FlankUnion"] | MixtureKinds["LeftUnion"];
export type FlankOrRightUnionMixtureKind = MixtureKinds["FlankUnion"] | MixtureKinds["RightUnion"];


export interface PrimsMixtureOptions {
    ContentMutations: ContentMutationOrArray;
    MixtureKind: MixtureKindKeys;
}

interface DefaultPrimsMixtureOptions extends PrimsMixtureOptions {
    ContentMutations: [ContentMutations["ExcludeObject"]];
    MixtureKind: "Intersection";
}

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
        // { [K in DualContentKeychain["MutualOptionalKeys"]]?: ArrayPrimsPropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options, __Options>; },
        // { [K in DualContentKeychain["MutualRequiredKeys"]]: ArrayPrimsPropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options, __Options>; }
        { [K in DualContentKeychain["MutualOptionalKeys"]]?: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options["PropsMixtureOptions"], __Options["PropsMixtureOptions"]>; },
        { [K in DualContentKeychain["MutualRequiredKeys"]]: PropsMixture<PureDualContent<DualContent["LeftContent"][K], DualContent["RightContent"][K]>, __Options["PropsMixtureOptions"], __Options["PropsMixtureOptions"]>; }
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


export interface ArrayPrimsPropsMixtureOptions extends PrimsPropsMixtureOptions {
    ArrayMixtureOptions: ArrayMixtureOptions;
}

export interface DefaultArrayPrimsPropsMixtureOptions extends ArrayPrimsPropsMixtureOptions {
    PrimsMixtureOptions: DefaultPrimsMixtureOptions;
    PropsMixtureOptions: DefaultPropsMixtureOptions;
    ArrayMixtureOptions: DefaultArrayMixtureOptions;
}


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


// FEATURE: PRIM PROPS MIXTURE
export type ArrayPrimsPropsMixture<
    DualContent extends DefaultDualContent,
    Options extends DeepPartial<ArrayPrimsPropsMixtureOptions> = DefaultArrayPrimsPropsMixtureOptions,
    __Options extends ArrayPrimsPropsMixtureOptions = DualContentSpread<DefaultArrayPrimsPropsMixtureOptions, Options, { Recursive: true, OverwriteMode: "Extend", MutualKeySignaturePreserveKind: "Left", ComparableContent: ArrayPrimsPropsMixtureOptions }>,
    > = (
        PrimsPropsMixture<DualContent, __Options, __Options>
        | ArrayMixture<DualContent, __Options["ArrayMixtureOptions"]>
    );
