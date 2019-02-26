import { AnyKeys, ExcludeArray, ExcludeObject, Extends, ExtractObject } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";
// tslint:disable: interface-name




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

// type tt289357489 = ["ExtractObject", "ExtractObject"] extends (keyof ValueOption)[] ? true : false;

// type t462<V> = V extends infer T ? T : never;

// type PrependArrayItem<Tuple extends any[], Prepend> = (
//     ((_: Prepend, ..._2: Tuple) => never) extends (..._: infer A) => never ? A : never
// );

// type Discard<T extends any = any> = { _: any };
// type InferDiscard<T> = T extends { _: infer V } ? V : T;

// interface InferDiscard2<T> {
//     0: T extends { _: infer V } ? V : T;
// }

// type InferDiscard<T extends any> = T[T extends { _: infer V } ? "_" : never];

// type InferLastDiscard<
//     T extends Discard
//     > = (
//         {
//             0: InferLastDiscard<T>;
//             1: T["_"];
//         }[T["_"] extends Discard ? 0 : 1]
//     );

// type InferLastDiscard<T extends Discard> = T["_"] extends Discard ? T["_"] : T["_"] ;

// type Flat<
//     T,
//     __A extends any[]=[]
//     > = (
//         T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { _: Flat<P, PrependArrayItem<__A, Exclude<P, any[]>>> }
//         // : T
//         : T
//     );

// type Flat<
//     T,
//     __A extends any[]=[]
//     > = (
//         InferDiscard<
//             T extends Array<infer P>
//             // ? P extends Array<infer P2>
//             ? { _: Flat<P, PrependArrayItem<__A, Exclude<P, any[]>>> }
//             // : T
//             : T
//         >
//     );

// type Flat<
//     T,
//     __A extends any[]=[]
//     > = (
//         InferDiscard<
//             T extends Array<infer P>
//             // ? P extends Array<infer P2>
//             ? { _: Flat<P, PrependArrayItem<__A, Exclude<P, any[]>>> }
//             // : T
//             : T
//         >
//     );

// type FlatLight<T> = T extends Array<infer P> ? P : T;
// type InferableFlatLight<T, U extends FlatLight<T> = FlatLight<T>> = U;

// type test4842 = any extends FlatLight<arrays, infer T> ? T : never;

// type Flat<
//     T,
//     __A extends any[]=[]
//     > = (
//         InferDiscard<
//             T extends Array<infer P>
//             // ? P extends Array<infer P2>
//             // ? { _: Flat<P, PrependArrayItem<__A, Exclude<P, any[]>>> extends { _: infer V } ? PrependArrayItem<__A, V> : P }
//             ? { _: Flat<P> }
//             // : T
//             : T
//         >
//     );

// type Flat<
//     T,
//     __A extends any[]=[],
//     __T = (
//         // InferDiscard<
//         T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { _: Flat<P, __A> }
//         // : T
//         : T
//         // >
//     )
//     > = (
//         // InferDiscard<
//         __T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { _: Flat<P, __A> }
//         // : T
//         : [T extends Array<infer P> ? Exclude<P, any[]> : never , InferDiscard<__T> extends Array<infer P> ? P : never]
//         // >
//     );

// type Flat<
//     T extends any[],
//     __A extends any[]=[]

//     > = (
//         // InferDiscard<
//         T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { 0: Flat<> }[P extends P ? 0 : never]
//         // : T
//         : T
//         // >
//     );

// type t764 = boolean extends never ? true : false;

// type Flat<
//     T,
//     __A extends any[]=[],
//     __T = (
//         // InferDiscard<
//         T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { _: Flat<P, __A> }
//         // : T
//         : T
//         // >
//     )
//     > = (
//         // InferDiscard<
//         T extends Array<infer P>
//         // ? P extends Array<infer P2>
//         ? { _: [P, InferDiscard<__T> extends Array<infer P> ? P : never] }
//         // : T
//         : T
//         // >
//     );

// type Flat2<T extends any[]> = T extends any[] ? T :;
// type Flat2<T> = Except<Flat<T>, T>

// type arrays = ["a", ["b", ["c"]], ["d"]];
// type Flatted = Flat<arrays>;
// type Flatted2
// type Flatted2 = Flat2<Flat<arrays>>;
// Results in "a" | "b" | "c" | "d"

// type abc = "a" | "b" | "c";
// type abc = Flatted;
// type abc2 = { [K in abc]: [K] }[abc];

// type abc2_0 = abc2 extends string[] | any ? abc2 : never;

type t45678 = [[], "tzr"] extends [string, any[]] ? true : false;

type t566845 = Exclude<[[], "tzr"], ["tzr"]>;

// type ttt33 = Exclude<"hha", string>;


// type Flat_1<T> = InferredDiscard<T extends Array<infer P> ? { _: Flat<P> } : T>;
// type Flatted_1 = Flat2<["a", ["b", ["c", ["d"]]]]>;
// // Results in "a" | "b" | "c" | "d"

type Flat2<T> = {
    0: Flat2<T>;
    1: T
}[
    T extends [] ? 0 : 1
];

type Flatted2 = Flat2<["a", ["b", ["c", ["d"]]]]>;

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

export interface LeftRightValues<
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
export type LeftRightValuesL0<
    LR extends LeftRightValues<DefaultValueL2<_>, DefaultValueL2<_>>,
    O extends ValueOptionOrArray = DefaultValueOption,
    _ = $,
    > = (
        LeftRightValuesL1<
            LR["LeftContent"],
            LR["RightContent"],
            O,
            _
        >
    );

export type LeftRightValuesL1<
    LV extends DefaultValueContent,
    RV extends DefaultValueContent,
    O extends ValueOptionOrArray = DefaultValueOption,
    _ = $
    > = (
        LeftRightValues<
            Value<LV, O, _>,
            Value<RV, O, _>,
            _
        >
    );

type DefaultLeftRightValues = LeftRightValues<DefaultValue, DefaultValue>;
// type DefaultLeftRight2 = LeftRight<DefaultValue, DefaultValue>;
// type DefaultLeftRightL1<_ = $> = LeftRight<DefaultValueL2<_>, DefaultValueL2<_>, _>;

// export interface ILeftRightObjects<
//     LeftSideObject extends IValue = never,
//     RightSideObject extends IValue = never
//     > extends ILeftRight<
//     LeftSideObject,
//     RightSideObject
//     > {
//     LeftSideObject: LeftSideObject;
//     RightSideObject: RightSideObject;
//     LeftObject: LeftSideObject["SideObject"];
//     RightObject: RightSideObject["SideObject"];
// }

// /** A shortcut for ILeftRightObjects. */
// export type LeftRightObjects<
//     LeftRight extends ILeftRight
//     > = (
//         ILeftRightObjects<
//             ISideObject<
//                 LeftRight["LeftSide"]
//             >,
//             ISideObject<
//                 LeftRight["RightSide"]
//             >
//         >
//     );


/**
 * Checks
 * credits: https://stackoverflow.com/a/49683575
 */
// export type OptionalKeys<
//     V extends DefaultValue,
//     > = (
//         { [K in keyof V["Content"]]-?: {} extends { [P in K]: V["Content"][K] } ? K : never }[keyof V["Content"]]
//     );
export type OptionalKeys<
    Props extends DefaultValueContent,
    > = (
        { [K in keyof Props]-?: {} extends { [P in K]: Props[K] } ? K : never }[keyof Props]
    );

// export interface OptionalKeys2<

// > {

// }

// declare const t57893: any[] = ["test"];


// export type OptionalKeysL1<
//     C extends DefaultValueContent
//     > = (
//         OptionalKeys<Value<C>>
//     );

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

// // Type of { ...L, ...R }
// // credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
// type Spread<
//     Left,
//     Right,
//     __Left extends ExtractObject<Left> =  ExtractObject<Left>,
//     __Right extends ExtractObject<Right> = ExtractObject<Right>,
//     __LeftKeys extends keyof __Left = keyof __Left,
//     __RightKeys extends keyof __Right = keyof __Right,
//     > = (
//         // Properties in L, that don't exist in R
//         & Pick<__Left, Exclude<__LeftKeys, __RightKeys>>
//         // Optional/undefined properties from R, that don't exist in L
//         & Pick<__Right, Exclude<OptionalKeys<Right, __Right>, __LeftKeys>>
//         // Properties in R without properties that are optional/undefined
//         & Pick<__Right, Exclude<__RightKeys, OptionalKeys<__Right>>>
//         // Properties in R, with types that include undefined, that exist in L
//         & SpreadProperties<__Left, __Right, __LeftKeys & OptionalKeys<Right, __Right>>
//     );


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

export interface IntersectPrimitivesOptions {
    ValueOptions: ValueOptionOrArray;
}

interface DefaultIntersectPrimitivesOptions extends IntersectPrimitivesOptions {
    ValueOptions: [ValueOptions["ExcludeObject"]];
}

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitives<
    Values extends DefaultLeftRightValues,
    Options extends IntersectPrimitivesOptions = DefaultIntersectPrimitivesOptions,
    __Values extends LeftRightValuesL0<Values, Options["ValueOptions"]> = LeftRightValuesL0<Values, Options["ValueOptions"]>
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

type LeftRightKeychain<
    Values extends DefaultLeftRightValues,
    __LeftKeychain extends ValueKeychain<Values["LeftContent"]> = ValueKeychain<Values["LeftContent"]>,
    __RightKeychain extends ValueKeychain<Values["RightContent"]> = ValueKeychain<Values["RightContent"]>,
    __MutualOptionalProps extends __LeftKeychain["OptionalKeys"] & __RightKeychain["OptionalKeys"]= __LeftKeychain["OptionalKeys"] & __RightKeychain["OptionalKeys"],
    __MutualRequiredProps extends __LeftKeychain["RequiredKeys"] & __RightKeychain["RequiredKeys"]= __LeftKeychain["RequiredKeys"] & __RightKeychain["RequiredKeys"],
    > = {
        LeftValueKeychain: __LeftKeychain;
        RightValueKeychain: __RightKeychain;
        OptionalKeys: __LeftKeychain["OptionalKeys"] | __RightKeychain["OptionalKeys"];
        RequiredKeys: __LeftKeychain["RequiredKeys"] | __RightKeychain["RequiredKeys"];
        Keys: __LeftKeychain["Keys"] | __RightKeychain["Keys"];
        MutualOptionalKeys: __MutualOptionalProps;
        MutualRequiredKeys: __MutualRequiredProps;
        MutualKeys: __MutualOptionalProps | __MutualRequiredProps;
    };

export type UnionMutualProps<
    Values extends DefaultLeftRightValues,
    __Extras extends LeftRightKeychain<Values> = LeftRightKeychain<Values>,
    __AreMutualOptionalKeysNotNever extends Not<Extends<__Extras["MutualOptionalKeys"], never>> = Not<Extends<__Extras["MutualOptionalKeys"], never>>,
    __AreMutualRequiredKeysNotNever extends Not<Extends<__Extras["MutualRequiredKeys"], never>> = Not<Extends<__Extras["MutualRequiredKeys"], never>>,
    __MutualOptionalProps extends { [K in __Extras["MutualOptionalKeys"]]?: Values["LeftContent"][K] | Values["RightContent"][K]; } = { [K in __Extras["MutualOptionalKeys"]]?: Values["LeftContent"][K] | Values["RightContent"][K]; },
    __MutualRequiredProps extends { [K in __Extras["MutualRequiredKeys"]]: Values["LeftContent"][K] | Values["RightContent"][K]; } = { [K in __Extras["MutualRequiredKeys"]]: Values["LeftContent"][K] | Values["RightContent"][K]; },
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

export interface IntersectPropsOptions {
    ValueOptions: ValueOptionOrArray;
}

interface DefaultIntersectPropsOptions extends IntersectPropsOptions {
    ValueOptions: [ValueOptions["ExtractObject"]];
}

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    Values extends DefaultLeftRightValues,
    Options extends IntersectPropsOptions = DefaultIntersectPropsOptions,
    _ = $,
    __Values extends LeftRightValuesL0<Values, Options["ValueOptions"], _> = LeftRightValuesL0<Values, Options["ValueOptions"], _>,
    __Extras extends LeftRightKeychain<__Values> = LeftRightKeychain<__Values>,
    __LeftMutualPick extends Pick<__Values["LeftContent"], __Extras["MutualKeys"]> = Pick<__Values["LeftContent"], __Extras["MutualKeys"]>,
    __RightMutualPick extends Pick<__Values["RightContent"], __Extras["MutualKeys"]> = Pick<__Values["RightContent"], __Extras["MutualKeys"]>
    > = (
        TakeFirstIfMatchExtendsNotCase<
            __Extras["MutualKeys"],
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
                UnionMutualProps<__Values, __Extras> // replace this by a type that expands recursively
            >,
            never
        >
    );

export interface IntersectPrimitivesAndPropsOptions {
    PrimitiveOptions: IntersectPrimitivesOptions;
    PropsOptions: IntersectPropsOptions;
}

interface DefaultIntersectPrimitivesAndPropsOptions extends IntersectPrimitivesAndPropsOptions {
    PrimitiveOptions: DefaultIntersectPrimitivesOptions;
    PropsOptions: DefaultIntersectPropsOptions;
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
    Values extends DefaultLeftRightValues,
    Options extends IntersectPrimitivesAndPropsOptions = DefaultIntersectPrimitivesAndPropsOptions,
    __PrimitivesValues extends LeftRightValuesL0<Values, Options["PrimitiveOptions"]["ValueOptions"]> = LeftRightValuesL0<Values, Options["PrimitiveOptions"]["ValueOptions"]>,
    __PropsValues extends LeftRightValuesL0<Values, Options["PropsOptions"]["ValueOptions"]> = LeftRightValuesL0<Values, Options["PropsOptions"]["ValueOptions"]>,
    > = (
        PreferPrimitivesOverEmptyProps<
            IntersectPrimitives<__PrimitivesValues>,
            IntersectProps<__PropsValues>
        >
    );

type testtt_0 = LeftRightValuesL1<{ a: "a", b: "b" } | number, { a: "a", b: "b2" } | number>;
type testtt_0_1 = LeftRightValuesL0<testtt_0, ["ExcludeObject"]>;
type testtt23 = IntersectPrimitives<testtt_0_1>;
type testtt_0_2 = LeftRightValuesL0<testtt_0, ["ExtractObject"]>;
type testtt24 = IntersectProps<testtt_0_2>;
type testtt55 = LeftRightKeychain<testtt_0_2>;
type testtt = IntersectPrimitivesAndProps<testtt_0>;


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

type gh = IntersectProps<LeftRightValuesL1<{ a: "a" }, { a: "b" }>>;

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
