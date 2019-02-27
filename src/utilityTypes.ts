import { AnyKeys, ExcludeArray, ExcludeObject, Extends, ExtractObject } from "@teronis/ts-definitions";
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

type test649 = DeepRequired<DeepPartial<{ a: "a" }>>;


// type Take<N extends number, T extends any[], R extends any[]=[]> = {
//     0: Reverse<R>,
//     1: Take<N, Tail<T>, Cons<Head<T>, R>>
//   }[T extends [] ? 0 : R["length"] extends N ? 0 : 1];

//   export type Group<N extends number, T extends any[], R1 extends any[]=[], R2 extends any[]=[]> = {
//     0: Reverse<R2>,
//     1: Group<N, T, [], Cons<Reverse<R1>, R2>>,
//     2: Group<N, Tail<T>, Cons<Head<T>, R1>, R2>
//   }[T extends [] ? R1 extends [] ? 0 : 1 : (R1["length"] extends N ? 1 : 2)];

//   export type Drop<N extends number, T extends any[], R extends any[]=[]> = {
//     0: T,
//     1: Drop<N, Tail<T>, Cons<Head<T>, R>>
//   }[T extends [] ? 0 : R["length"] extends N ? 0 : 1];

// export type InferableHeadRest<
// A extends any[],
// >

// export type DropHead<Tuple extends any> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];

export type DropHead<Tuple extends any[]> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];

// type test5678 = DropHead<[number]>;


// type test458<T extends > =

// export type ValueOptions =

export interface ValueOptions {
    ExtractObject: "ExtractObject";
    ExcludeArray: "ExcludeArray";
    ExcludeObject: "ExcludeObject";
}

export type ValueOptionKeys = keyof ValueOptions;
export type ValueOptionArray = ValueOptionKeys[];

export type DefaultValueOption = []; // & [...ValueOptionArray]; // TODO: remove [] and investigate _ in Value<...>
// The empty array don't lead to circular dependency error.
export type ValueOptionOrArray = ValueOptionKeys | ValueOptionArray;
// export type ValueOptionOrArray = ValueOptionArray | [];
export type ValueOptionAsArray<Options extends ValueOptionOrArray> = Options extends Array<keyof ValueOptions> ? Options : [Options];



export type DefaultValueContent = {};

type InferDiscard<V> = V extends { _: infer T } ? T : V;
type Flat<T> = InferDiscard<T extends (infer P)[] ? { _: Flat<P> } : T>;
type Flatted = Flat<["a", ["b", ["c", ["d"]]]]>;
// Results in "a" | "b" | "c" | "d"

type t45678 = [[], "tzr"] extends [string, any[]] ? true : false;

type t566845 = Exclude<[[], "tzr"], ["tzr"]>;


// type Flat_1<T> = InferredDiscard<T extends Array<infer P> ? { _: Flat<P> } : T>;
// type Flatted_1 = Flat2<["a", ["b", ["c", ["d"]]]]>;
// // Results in "a" | "b" | "c" | "d"

// type Flat2<
// Content extends {}
// > = {
//     empty: Content;
//     nonEmpty: Flat2<Content>
// }[(Content extends [] ? "empty" : "nonEmpty") : never];

// interface Flat2Dummy<T, _> {
//     Flatted: Flat2<T>;
// }

// type Flatted2 = Flat2<["a", ["b", ["c", ["d"]]]], [], $>;

export type $ = {};

export type ValueContent<
    Content extends DefaultValueContent,
    Options extends ValueOptionOrArray,
    /**
     * Only, and just only for having a constraint
     * that does not extend or expect anything.
     * With this trick, We can have default
     * constraints in derived tyes, that would
     * otherwise cause a circular dependency
     * error.
     */
    $CircularDependencyPreventer,
    __O extends ValueOptionAsArray<Options> = ValueOptionAsArray<Options>,
    __C = __O extends [] ? Content : (
        __O[0] extends ValueOptions["ExtractObject"]
        ? ExtractObject<Content>
        : __O[0] extends ValueOptions["ExcludeArray"]
        ? ExcludeArray<Content>
        : __O[0] extends ValueOptions["ExcludeObject"]
        ? ExcludeObject<Content>
        : Content
    ),
    > = {
        "empty": Content;
        "nonEmpty": ValueContent<__C, DropHead<__O>, $CircularDependencyPreventer>;
    }[$CircularDependencyPreventer extends $ ? (Options extends [] ? "empty" : "nonEmpty") : never];

// type test834 = ValueContent<"string", ValueOptions["ExtractObject"], $>;

// export type ValueOptionAsArray2<Options extends ValueOptionOrArray> = Options extends Array<keyof ValueOptions> ? Options : [Options];

// export type ValueContent2<
//     Content extends DefaultValueContent,
//     Options extends ValueOptionOrArray,
//     __O extends ValueOptionAsArray2<Options> = ValueOptionAsArray2<Options>,
//     // __C = __O extends [] ? Content : (
//     //     __O[0] extends ValueOptions["ExtractObject"]
//     //     ? ExtractObject<Content>
//     //     : __O[0] extends ValueOptions["ExcludeArray"]
//     //     ? ExcludeArray<Content>
//     //     : __O[0] extends ValueOptions["ExcludeObject"]
//     //     ? ExcludeObject<Content>
//     //     : Content
//     // ),
//     > = {
//         "empty": Content;
//         "nonEmpty": ValueContent2<Content, DropHead<__O>>;
//     }[(Options extends [] ? "empty" : "nonEmpty")];

// type test834 = ValueContent2<"string", ValueOptions["ExtractObject"]>;

// export type ValueOptionAsArray2<Options extends ValueOptionOrArray> = Options extends Array<keyof ValueOptions> ? Options : [Options];

// export type ValueContent2<
//     Content extends DefaultValueContent,
//     __O extends ValueOptionAsArray2<any> = ValueOptionAsArray2<any>,
//     > = {
//         "empty": Content;
//         "nonEmpty": ValueContent2<Content, DropHead<__O>>;
//     }[(__O extends [] ? "empty" : "nonEmpty")];

// type test834 = ValueContent2<"string", ValueOptions["ExtractObject"]>;

// export type ValueOptionAsArray2<Options extends any[] | ""> = Options extends Array<keyof []> ? Options : [Options];
// // export type DropHead2<Tuple extends any[]> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];
// export type DropHead2<Tuple extends any[]> = ((..._: Tuple) => never) extends (_: infer _, ..._1: infer Rest) => never ? Rest : [];

// export type Flat3<
//     Content
//     > = {
//         "empty": never;
//         "nonEmpty": ((args: (Content extends Array<infer P> ? P : never)) => never) extends (..._: infer U) => any ? Flat3<U> : never;
//     }[(Content extends never ? "empty" : "nonEmpty")];

// type test834 = Flat3<["a", ["b"]]>

export type Value<
    Content extends DefaultValueContent,
    Options extends ValueOptionOrArray = DefaultValueOption,
    _ = $,
    > = {
        Content: ValueContent<Content, Options, _>;
    };

// type testttt = Value<string | "test" | any[] | { a: "a" }, ["ExcludeArray", "ExcludeObject"]>["Content"];
// type testttt2 = ValueContent<string | "test" | any[] | { a: "a" }, ["ExcludeArray", "ExtractObject"]>;
// declare const test7654: testttt;
// test7654._._._
// test7654.Content.Content.Content.
// type testtt = ["ExcludeObject"] extends ValueOptionArray ? true : false;

// type ValueL1<O extends ValueOptionOrArray, _> = Value<DefaultValueContent, O, _>;
// type ValueL2<_> = Value<DefaultValueContent, DefaultValueOption, _>;

type DefaultValue<C extends DefaultValueContent = DefaultValueContent, O extends ValueOptionOrArray = DefaultValueOption, _ = $> = Value<C, O, _>;
type DefaultValueL1<O extends ValueOptionOrArray = DefaultValueOption, _ = $> = Value<DefaultValueContent, O, _>;
type DefaultValueL2<_ = $> = Value<DefaultValueContent, DefaultValueOption, _>;

export interface Values<
    LeftValue extends DefaultValueL2<_>,
    RightValue extends DefaultValueL2<_>,
    _ = $
    > {
    LeftValue: LeftValue;
    RightValue: RightValue;
    LeftContent: LeftValue["Content"];
    RightContent: RightValue["Content"];
}

/** Use this, when you want to overwrite the options. */
export type ValuesL0<
    LR extends Values<DefaultValueL2<_>, DefaultValueL2<_>>,
    O extends ValueOptionOrArray = DefaultValueOption,
    _ = $,
    > = (
        ValuesL1<
            LR["LeftContent"],
            LR["RightContent"],
            O,
            _
        >
    );

export type ValuesL1<
    LV extends DefaultValueContent,
    RV extends DefaultValueContent,
    O extends ValueOptionOrArray = DefaultValueOption,
    _ = $
    > = (
        Values<
            Value<LV, O, _>,
            Value<RV, O, _>,
            _
        >
    );

type DefaultValues = Values<DefaultValue, DefaultValue>;

/**
 * Get the optional keys from an object.
 * credits: https://stackoverflow.com/a/49683575
 */
export type OptionalKeys<
    Props,
    > = (
        { [K in keyof Props]-?: {} extends { [P in K]: Props[K] } ? K : never }[keyof Props]
    );

// /**
//  * Common properties from L and R with undefined in R[K] replaced by type in L[K]
//  * credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
//  */
// type SpreadProperties<
//     Left,
//     Right,
//     LeftAndOptionalRightKeys extends keyof Left & keyof Right
//     > = (
//         { [P in LeftAndOptionalRightKeys]: Left[P] | Exclude<Right[P], undefined> }
//     );

// Type of { ...L, ...R }
// credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
// type Spread<
//     Left,
//     Right,
//     __Left extends ExtractObject<Left> =  ExtractObject<Left>,
//     __Right extends ExtractObject<Right> = ExtractObject<Right>,
//     __LeftKeys extends keyof __Left = keyof __Left,
//     __RightKeys extends keyof __Right = keyof __Right,
//     > = (
//         // Properties in L, that don't exist in R
//         // & Pick<__Left, Exclude<__LeftKeys, __RightKeys>>
//         // Optional/undefined properties from R, that don't exist in L
//         & PickOptionalPropsAsRequired<__Right , Exclude<OptionalKeys<Right>, __LeftKeys>>
//         // Properties in R without properties that are optional/undefined.
//         // & Pick<__Right, Exclude<__RightKeys, OptionalKeys<__Right>>>
//         // Properties in R, with types that include undefined, that exist in L
//         // & SpreadProperties<__Left, __Right, __LeftKeys & OptionalKeys<Right>>
//     );

/**
 * From T, pick a set of properties whose keys are in the union K
 */
// type PickAsRequired<T, K extends keyof T> = {
//     [P in K]-?: T[P] | undefined;
// };

/**
 * Common properties from L and R with undefined in R[K] replaced by type in L[K]
 * credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
 */
// type SpreadProperties<
//     Left,
//     Right,
//     LeftAndOptionalRightKeys extends keyof Left & keyof Right
//     > = (
//         { [P in LeftAndOptionalRightKeys]: Left[P] | Exclude<Right[P], undefined> }
//     );
// type SpreadProperties<
//     Values extends DefaultValues,
//     __ValuesKeychain extends ValuesKeychain<Values> = ValuesKeychain<Values>,
//     > = { [P in __ValuesKeychain["MutualKeys"]]: Values["RightContent"][P] };
// type SpreadProperties<
// Values extends DefaultValues
// > = {
//     [P in __ValuesKeychain["MutualKeys"]]: (
//         If<
//             And<And<Extends<Values["RightContent"][P], object>, Extends<Values["LeftContent"][P], object>>, Extends<Options["Recursive"], true>>,
//             Spread<ValuesL1<Values["LeftContent"][P], Values["RightContent"][P]>, Options>,
//             Values["RightContent"][P]
//         >
//     )
// };

interface SpreadOptions {
    Recursive?: boolean;
    DeepRequired?: boolean;
}

interface DefaultSpreadOptions extends SpreadOptions {
    Recursive: false;
    DeepRequired: false;
}

type SpreadProperty<
    Values extends DefaultValues,
    Options extends Required<SpreadOptions>,
    __ValuesKeychain extends ValuesKeychain<Values>,
    PropKey extends __ValuesKeychain["MutualKeys"],
    > = (
        If<
            And<And<Extends<Values["RightContent"][PropKey], object>, Extends<Values["LeftContent"][PropKey], object>>, Extends<Options["Recursive"], true>>,
            NotRequirableSpread<ValuesL1<Values["LeftContent"][PropKey], Values["RightContent"][PropKey]>, Options>,
            Values["RightContent"][PropKey]
        >
    );

// Type of { ...L, ...R }
// credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
type NotRequirableSpread<
    Values extends DefaultValues,
    Options extends Required<SpreadOptions> = DefaultSpreadOptions,
    __ValuesKeychain extends ValuesKeychain<Values> = ValuesKeychain<Values>,
    __RemnantsKeychain extends RemnantsKeychain<__ValuesKeychain> = RemnantsKeychain<__ValuesKeychain>,
    > = (
        // // Properties in L, that don't exist in R
        Pick<Values["LeftContent"], __RemnantsKeychain["LeftRemnant"]["Keys"]>
        // // Optional/undefined properties from R, that don't exist in L
        // & Pick<__Right, Exclude<OptionalKeys<Right>, __LeftKeys>>
        // // Properties in R without properties that are optional/undefined.
        & Pick<Values["RightContent"], __RemnantsKeychain["RightRemnant"]["Keys"]>
        // // Properties in R, with types that include undefined, that exist in L
        & {
            [P in __ValuesKeychain["RightValueKeychain"]["OptionalKeys"]]?: (
                SpreadProperty<Values, Options, __ValuesKeychain, P>
            )
        }
        & {
            [P in __ValuesKeychain["RightValueKeychain"]["RequiredKeys"]]: (
                SpreadProperty<Values, Options, __ValuesKeychain, P>
            )
        }
    );

export type Spread<
    Values extends DefaultValues,
    Options extends SpreadOptions = DefaultSpreadOptions,
    __Options extends Required<Options> = Required<Options>,
    __ValuesKeychain extends ValuesKeychain<Values> = ValuesKeychain<Values>,
    __RemnantsKeychain extends RemnantsKeychain<__ValuesKeychain> = RemnantsKeychain<__ValuesKeychain>
    > = (
        __Options["DeepRequired"] extends true
        ? DeepRequired<NotRequirableSpread<Values, __Options, __ValuesKeychain, __RemnantsKeychain>>
        : NotRequirableSpread<Values, __Options, __ValuesKeychain, __RemnantsKeychain>
    );

type test924_0 = ValuesL1<{ a?: "a", b: { a: "a2" }, d?: "d", e: { a: "a3", h: "h", haha?: "lol" } }, { a: undefined, b?: boolean, c?: undefined, e: { a: { b: "b3" } } }>;
type test924_1 = ValuesKeychain<test924_0>["MutualRequiredKeys"];
type test924 = Spread<test924_0, { Recursive: true, DeepRequired: true }>;
// type test924 = Spread<ValuesL1<{ a: "test" }, {}>>;
declare const ctest924: test924;
// ctest924.



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

// type CompactProps<
//     A,
//     B,
//     __AKeys extends AnyKeys<A> = AnyKeys<A>,
//     __BKeys extends AnyKeys<B> = AnyKeys<B>,
//     __MutualKeys extends IntersectPrimitiveTypes<__AKeys, __BKeys> = IntersectPrimitiveTypes<__AKeys, __BKeys>,
//     __MutualKeys2 extends (__MutualKeys extends __AKeys & __BKeys ? __MutualKeys : never) = (__MutualKeys extends __AKeys & __BKeys ? __MutualKeys : never),
//     > = { [K in __MutualKeys2]: A[K] | B[K]; };

export interface PrimitivesIntersectionOptions {
    ValueOptions: ValueOptionOrArray;
}

interface DefaultPrimitivesIntersectionOptions extends PrimitivesIntersectionOptions {
    ValueOptions: [ValueOptions["ExcludeObject"]];
}

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitives<
    Values extends DefaultValues,
    Options extends PrimitivesIntersectionOptions = DefaultPrimitivesIntersectionOptions,
    __Values extends ValuesL0<Values, Options["ValueOptions"]> = ValuesL0<Values, Options["ValueOptions"]>
    > = (
        Exclude<
            __Values["LeftContent"] | __Values["RightContent"],
            Exclude<__Values["LeftContent"], __Values["RightContent"]> | Exclude<__Values["RightContent"], __Values["LeftContent"]>
        >
    );

// type test489240 = IntersectPrimitives<LeftRight<Value<{},{}>, Value<DefaultValueContent>>>;

type test5467 = [number?];

// type test256 = IntersectPrimitives<LeftRightL1<string | number, number, "ExcludeObject">>;


// /** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
// export type IntersectProps<
//     A,
//     B,
//     ExpandMode extends ExpandModes = DefaultExpandMode,
//     __A extends ExtractObject<A> = ExtractObject<A>,
//     __B extends ExtractObject<B> = ExtractObject<B>,
//     __AKeys extends AnyKeys<__A> = AnyKeys<__A>,
//     __BKeys extends AnyKeys<__B> = AnyKeys<__B>,
//     __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
//     // For type compatibility
//     __MutualKeys2 extends (__MutualKeys extends __AKeys & __BKeys ? __MutualKeys : never) = (__MutualKeys extends __AKeys & __BKeys ? __MutualKeys : never),
//     __APicked extends Pick<__A, __MutualKeys2> = Pick<__A, __MutualKeys2>,
//     __BPicked extends Pick<__B, __MutualKeys2> = Pick<__B, __MutualKeys2>
//     > = (
//         TakeFirstIfMatchExtendsNotCase<
//             __MutualKeys,
//             If< // If both picked objects extends each other, then ...
//                 And<Extends<__APicked, __BPicked>, Extends<__BPicked, __APicked>>,
//                 If<
//                     And<Extends<__APicked, __A>, Extends<__BPicked, __B>>,
//                     __A & __B,
//                     If<
//                         Extends<__APicked, __A>,
//                         __A & __BPicked,
//                         If<
//                             Extends<__BPicked, __B>,
//                             __APicked & __B,
//                             __APicked & __BPicked
//                         >
//                     >
//                 >,
//                 // never // expand here
//                 { [K in __MutualKeys2]: __A[K] | __B[K]; } // replace this by a type that expands recursively
//             >,
//             {}
//         >
//     );


// export type UnionProps<>

// interface ValueKeychain<
//     V extends DefaultValue,
//     __OK extends OptionalKeys<V["Content"]> = OptionalKeys<V["Content"]>,
//     __RK extends Exclude<keyof V["Content"], __OK> = Exclude<keyof V["Content"], __OK>
//     > {
//     OptionalKeys: __OK;
//     RequiredKeys: __RK;
//     Keys: keyof V["Content"];
// }

// type t1 = Value<{ a: "a" }, ["ExcludeArray"]>;
// type t2 = ValueKeychain<t1>;
// type t3 = t2["RequiredKeys"];
// type t4 = Value<t1["Content"], ["ExcludeObject"]>
// type t10 = LeftRight<t1, t4>;
// type t20 = LeftRightKeychain<t10>["Keys"];
// type t25 = DefaultValueOption;
// type t30 = LeftRight<Value<t10["LeftContent"], t25>, Value<t10["RightContent"], t25>>;
// type t35 = t30["LeftContent"];
// type t40 = LeftRightKeychain<t30>;
// type t45 = t40["RequiredKeys"];
// type t50 = keyof t35;

interface ValueKeychain<
    Content extends DefaultValueContent,
    __OptionalKeys extends OptionalKeys<Content> = OptionalKeys<Content>,
    __RequiredKeys extends Exclude<keyof Content, __OptionalKeys> = Exclude<keyof Content, __OptionalKeys>
    > {
    OptionalKeys: __OptionalKeys;
    RequiredKeys: __RequiredKeys;
    Keys: __OptionalKeys | __RequiredKeys;
}

// __test extends Pick<__LR4Primitives["LeftContent"], ValueKeychain<__LR4Primitives["LeftValue"]>["Keys"]> = any

// interface ValuesKeychain<
//     Values extends DefaultValues,
//     __LeftKeychain extends ValueKeychain<Values["LeftContent"]> = ValueKeychain<Values["LeftContent"]>,
//     __RightKeychain extends ValueKeychain<Values["RightContent"]> = ValueKeychain<Values["RightContent"]>,
//     __MutualOptionalProps extends __LeftKeychain["OptionalKeys"] & __RightKeychain["OptionalKeys"]= __LeftKeychain["OptionalKeys"] & __RightKeychain["OptionalKeys"],
//     __MutualRequiredProps extends __LeftKeychain["RequiredKeys"] & __RightKeychain["RequiredKeys"]= __LeftKeychain["RequiredKeys"] & __RightKeychain["RequiredKeys"],
//     > {
//         LeftValueKeychain: __LeftKeychain;
//         RightValueKeychain: __RightKeychain;
//         OptionalKeys: __LeftKeychain["OptionalKeys"] | __RightKeychain["OptionalKeys"];
//         RequiredKeys: __LeftKeychain["RequiredKeys"] | __RightKeychain["RequiredKeys"];
//         Keys: __LeftKeychain["Keys"] | __RightKeychain["Keys"];
//         MutualOptionalKeys: __MutualOptionalProps;
//         MutualRequiredKeys: __MutualRequiredProps;
//         MutualKeys: __MutualOptionalProps | __MutualRequiredProps;
//     };

interface ValuesKeychain<
    Values extends DefaultValues,
    __LeftKeychain extends ValueKeychain<Values["LeftContent"]> = ValueKeychain<Values["LeftContent"]>,
    __RightKeychain extends ValueKeychain<Values["RightContent"]> = ValueKeychain<Values["RightContent"]>
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

type DefaultValuesKeychain = ValuesKeychain<DefaultValues, any, any>;

/** Represents an interface that calculates the left keys without the right keys. */
export interface RemnantKeychain<
    Keychain extends DefaultValuesKeychain,
    OtherValueKeychain extends Keychain["LeftValueKeychain"] | Keychain["RightValueKeychain"]
    > {
    OptionalKeys: Exclude<Keychain["OptionalKeys"], OtherValueKeychain["OptionalKeys"]>;
    RequiredKeys: Exclude<Keychain["RequiredKeys"], OtherValueKeychain["RequiredKeys"]>;
    Keys: Exclude<Keychain["Keys"], OtherValueKeychain["Keys"]>;
}

export interface RemnantsKeychain<
    ValuesKeychain extends DefaultValuesKeychain
    > {
    LeftRemnant: RemnantKeychain<ValuesKeychain, ValuesKeychain["RightValueKeychain"]>;
    RightRemnant: RemnantKeychain<ValuesKeychain, ValuesKeychain["LeftValueKeychain"]>;
}

type test637 = ValuesKeychain<ValuesL1<{ b: "a" }, { b: "b" }>>;
type test638 = RemnantKeychain<test637, test637["RightValueKeychain"]>["Keys"];

export type UnionMutualProps<
    Values extends DefaultValues,
    __ValuesKeychain extends ValuesKeychain<Values> = ValuesKeychain<Values>,
    __AreMutualOptionalKeysNotNever extends Not<Extends<__ValuesKeychain["MutualOptionalKeys"], never>> = Not<Extends<__ValuesKeychain["MutualOptionalKeys"], never>>,
    __AreMutualRequiredKeysNotNever extends Not<Extends<__ValuesKeychain["MutualRequiredKeys"], never>> = Not<Extends<__ValuesKeychain["MutualRequiredKeys"], never>>,
    __MutualOptionalProps extends { [K in __ValuesKeychain["MutualOptionalKeys"]]?: Values["LeftContent"][K] | Values["RightContent"][K]; } = { [K in __ValuesKeychain["MutualOptionalKeys"]]?: Values["LeftContent"][K] | Values["RightContent"][K]; },
    __MutualRequiredProps extends { [K in __ValuesKeychain["MutualRequiredKeys"]]: Values["LeftContent"][K] | Values["RightContent"][K]; } = { [K in __ValuesKeychain["MutualRequiredKeys"]]: Values["LeftContent"][K] | Values["RightContent"][K]; },
    > = (
        If<
            And<
                __AreMutualOptionalKeysNotNever,
                __AreMutualRequiredKeysNotNever
            >,
            __MutualOptionalProps & __MutualRequiredProps,
            If<
                __AreMutualOptionalKeysNotNever,
                __MutualOptionalProps,
                If<
                    __AreMutualRequiredKeysNotNever,
                    __MutualRequiredProps,
                    never
                >
            >
        >
    );

// export type IntersectProps<
//     LeftRightObjects extends ILeftRightObjects,
//     __MutualKeys extends keyof LeftRightObjects["LeftValue"] & keyof LeftRightObjects["RightValue"]= keyof LeftRightObjects["LeftValue"] & keyof LeftRightObjects["RightValue"]
//     > = (
//         TakeFirstIfMatchExtendsNotCase<
//             __MutualKeys,
//             UnionMutualProps<LeftRightObjects>,
//             never
//         >
//     );

export interface PropsIntersectionOptions {
    ValueOptions?: ValueOptionOrArray;
}

interface DefaultPropsIntersectionOptions extends PropsIntersectionOptions {
    ValueOptions: [ValueOptions["ExtractObject"]];
}

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    Values extends DefaultValues,
    Options extends PropsIntersectionOptions = DefaultPropsIntersectionOptions,
    _ = $,
    __Options extends Required<PropsIntersectionOptions> = Spread<ValuesL1<PropsIntersectionOptions, {}>>,
    __Values extends ValuesL0<Values, __Options["ValueOptions"], _> = ValuesL0<Values, Options["ValueOptions"], _>,
    __ValuesKeychain extends ValuesKeychain<__Values> = ValuesKeychain<__Values>,
    __LeftMutualPick extends Pick<__Values["LeftContent"], __ValuesKeychain["MutualKeys"]> = Pick<__Values["LeftContent"], __ValuesKeychain["MutualKeys"]>,
    __RightMutualPick extends Pick<__Values["RightContent"], __ValuesKeychain["MutualKeys"]> = Pick<__Values["RightContent"], __ValuesKeychain["MutualKeys"]>
    > = (
        TakeFirstIfMatchExtendsNotCase<
            __ValuesKeychain["MutualKeys"],
            If< // If both picked objects extends each other, then ...
                And<Extends<__LeftMutualPick, __RightMutualPick>, Extends<__RightMutualPick, __LeftMutualPick>>,
                If<
                    /* Overall we want check if smaller fits into bigger */
                    And<Extends<__LeftMutualPick, __Values["LeftContent"]>, Extends<__RightMutualPick, __Values["RightContent"]>>,
                    __Values["LeftContent"] & __Values["RightContent"],
                    If<
                        Extends<__LeftMutualPick, __Values["LeftContent"]>,
                        __Values["LeftContent"] & __RightMutualPick,
                        If<
                            Extends<__RightMutualPick, __Values["RightContent"]>,
                            __LeftMutualPick & __Values["RightContent"],
                            __LeftMutualPick & __RightMutualPick
                        >
                    >
                >,
                // never
                // .. \/\/ expand here
                UnionMutualProps<__Values, __ValuesKeychain> // replace this by a type that expands recursively
            >,
            never
        >
    );

export interface PrimitivesAndPropsIntersectionOptions {
    PrimitiveOptions?: PrimitivesIntersectionOptions;
    PropsOptions?: PropsIntersectionOptions;
}

interface DefaultPrimitivesAndPropsIntersectionOptions extends PrimitivesAndPropsIntersectionOptions {
    PrimitiveOptions: DefaultPrimitivesIntersectionOptions;
    PropsOptions: DefaultPropsIntersectionOptions;
}

export type PreferPrimitivesOverEmptyProps<Primitives, Props> = (
    If<
        // Is true if primitives are *not* never and props are equals {}.
        And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
        Primitives,
        Props | Primitives
    >
);

export type IntersectPrimitivesAndProps<
    Values extends DefaultValues,
    Options extends PrimitivesAndPropsIntersectionOptions = DefaultPrimitivesAndPropsIntersectionOptions,
    // __Options extends Spread<DefaultPrimitivesAndPropsIntersectionOptions, Options> = Spread<DefaultPrimitivesAndPropsIntersectionOptions, Options>
    > = (
        PreferPrimitivesOverEmptyProps<
            IntersectPrimitives<Values, Options["PrimitiveOptions"]>,
            IntersectProps<Values, Options["PropsOptions"]>
        >
    );

// type test3456 = Spread<DefaultPrimitivesAndPropsIntersectionOptions, {
//     PrimitiveOptions: {
//         ValueOptions: ["ExcludeObject"]
//     }
// }>;

// declare const tttt: test3456;
// tttt.PropsOptions.ValueOptions

type testtt_0 = ValuesL1<{ a: "a", b: "b" } | number, { a: "a", b: "b2" } | number>;
type testtt_0_1 = ValuesL0<testtt_0, ["ExcludeObject"]>;
type testtt23 = IntersectPrimitives<testtt_0_1>;
type testtt_0_2 = ValuesL0<testtt_0, ["ExtractObject"]>;
type testtt24 = IntersectProps<testtt_0_2>;
type testtt55 = ValuesKeychain<testtt_0_2>;
type testtt = IntersectPrimitivesAndProps<testtt_0, {
    PrimitiveOptions: {
        ValueOptions: ["ExcludeObject"]
    }
}>;


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

type gh = IntersectProps<ValuesL1<{ a: "a" }, { a: "b" }>>;

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
