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

export interface ValueOption {
    ExtractObject: "ExtractObject";
    ExcludeArray: "ExcludeArray";
    ExcludeObject: "ExcludeObject";
}

type ValueOptionKeys = keyof ValueOption;
type ValueOptionArray = ValueOptionKeys[];

export type DefaultValueOption = []; // & [...ValueOptionArray]; // TODO: remove [] and investigate _ in Value<...>
export type ValueOptionOrArray = ValueOptionKeys | ValueOptionArray;
export type ValueOptionAsArray<Options extends ValueOptionOrArray> = Options extends Array<keyof ValueOption> ? Options : [Options];



export type DefaultValueContent = {};

// type tt289357489 = ["ExtractObject", "ExtractObject"] extends (keyof ValueOption)[] ? true : false;

// type t462<V> = V extends infer T ? T : never;

// type PrependArrayItem<Tuple extends any[], Prepend> = (
//     ((_: Prepend, ..._2: Tuple) => never) extends (..._: infer A) => never ? A : never
// );

// type Discard<T extends any = any> = { _: any };
type InferDiscard<T> = T extends { _: infer V } ? V : T;

interface InferDiscard2<T> {
    0: T extends { _: infer V } ? V : T;
}

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

//Results in "a" | "b" | "c" | "d"

// type Flat3<T> = T | {
//     0: Flat<T>;
//     1: T
// }[T extends any[] ? 0 : 1];

// type Flatted3 = Flat3<["a", ["b", ["c", ["d"]]]]>;
// type testtest = Flatted3[number];

// type test33 = keyof ["test","test"];

// type FlatTuple<T> = T extends []

// export type ValueContent<
//     C extends DefaultValueContent,
//     O extends ValueOptionOrArray =[],
//     __O extends ValueOptionAsArray<O> = ValueOptionAsArray<O>,
//     __C = __O extends [] ? C : (
//         __O[0] extends ValueOption["ExtractObject"]
//         ? ExtractObject<C>
//         : __O[0] extends ValueOption["ExcludeArray"]
//         ? ExcludeArray<C>
//         : __O[0] extends ValueOption["ExcludeObject"]
//         ? ExcludeObject<C>
//         : C
//     )
//     > = {
//         "empty": C;
//         "nonEmpty": ValueContent<__C, DropHead<__O>>;
//     }[
//     // __O extends (infer OptionKeys)[]
//     // ? OptionKeys extends keyof ValueOption
//     // ? "nonEmpty"
//     // : "empty"
//     // : never

//     __O extends []
//     ? "empty"
//     : __O extends ValueOptionKeys[]
//     // ? (Y extends any
//     ? "nonEmpty"
//     // : never)
//     : never
//     ];

export type ValueContent<
    C extends DefaultValueContent,
    O extends ValueOptionOrArray =[],
    __O extends ValueOptionAsArray<O> = ValueOptionAsArray<O>,
    __C = __O extends [] ? C : (
        __O[0] extends ValueOption["ExtractObject"]
        ? ExtractObject<C>
        : __O[0] extends ValueOption["ExcludeArray"]
        ? ExcludeArray<C>
        : __O[0] extends ValueOption["ExcludeObject"]
        ? ExcludeObject<C>
        : C
    ),
    __C2 = {
        "empty": C;
        "nonEmpty": ValueContent<__C, DropHead<__O>>;
    }[__O extends [] ? "empty" : __O extends ValueOptionKeys[] ? "nonEmpty" : never]
    > = any;

// export type InferableValueContent<
//     C extends DefaultValueContent,
//     O extends ValueOptionOrArray =[],
//     __C extends any = any
//     >

// export interface Value<
//     C extends DefaultValueContent,
//     O extends ValueOptionOrArray =[],
//     __O extends ValueOptionAsArray<O> = ValueOptionAsArray<O>,
//     __C = __O extends [] ? C : (
//         __O[0] extends ValueOption["ExtractObject"]
//         ? ExtractObject<C>
//         : __O[0] extends ValueOption["ExcludeArray"]
//         ? ExcludeArray<C>
//         : __O[0] extends ValueOption["ExcludeObject"]
//         ? ExcludeObject<C>
//         : C
//     )
//     > {
//     Content: InferDiscard2<{
//         "empty": C;
//         "nonEmpty": { _: Value<__C, DropHead<__O>>["Content"] };
//     }[
//     __O extends []
//     ? "empty"
//     : __O extends ValueOptionKeys[]
//     ? "nonEmpty"
//     : never
//     ]>[0];
// }

// export interface Value<
//     C extends DefaultValueContent,
//     O extends ValueOptionOrArray,
//     // __O extends ValueOptionAsArray<O> = ValueOptionAsArray<O>,
//     > {
//     Content: {
//         empty: C,
//         _: { _: ValueContent<C, any> }
//     }[
//     O extends []
//     ? "empty"
//     : O extends []
//     ? never
//     : never
//     ];
// }

export type Value<
    C extends DefaultValueContent,
    O extends ValueOptionOrArray =[],
    // __O extends ValueOptionAsArray<O> = ValueOptionAsArray<O>,
    > = {
        Content: ValueContent<C, O> extends any? ;
    };

type testttt = Value<string | "test" | any[] | { a: "a" }, ["ExcludeArray"]>["Content"];
// type testttt2 = ValueContent<string | "test" | any[] | { a: "a" }, ["ExcludeArray", "ExtractObject"]>;
declare const test7654: testttt;
// test7654._._._
// test7654.Content.Content.Content.
// type testtt = ["ExcludeObject"] extends ValueOptionArray ? true : false;

type DefaultValue = Value<DefaultValueContent, ValueOptionOrArray>;

export interface LeftRight<
    LV extends DefaultValue,
    RV extends DefaultValue,
    O extends ValueOptionOrArray = DefaultValueOption,
    __LV extends Value<LV["Content"], O> = Value<LV["Content"], O>,
    __RV extends Value<RV["Content"], O> = Value<RV["Content"], O>
    > {
    LeftValue: __LV;
    RightValue: __RV;
    LeftContent: __LV["Content"];
    RightContent: __RV["Content"];
}

// type DefaultLeftRight<O extends ValueOptionOrArray = DefaultValueOption> = (
//     LeftRight<DefaultValue, DefaultValue, O>
// );

type DefaultLeftRight = LeftRight<DefaultValue, DefaultValue, ValueOptionOrArray>;

export type LeftRightL0<
    LR extends DefaultLeftRight,
    O extends ValueOptionOrArray = DefaultValueOption
    > = (
        LeftRight<
            LR["LeftValue"],
            LR["RightValue"],
            O
        >
    );

export type LeftRightL1<
    LV extends DefaultValueContent,
    RV extends DefaultValueContent,
    O extends ValueOptionOrArray = DefaultValueOption
    > = (
        LeftRight<
            Value<LV>,
            Value<RV>,
            O
        >
    );

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
export type OptionalKeys<V extends DefaultValue> = (
    { [K in keyof V["Content"]]-?: {} extends { [P in K]: V["Content"][K] } ? K : never }[keyof V["Content"]]
);

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

/** Intersect only the primitive types of Object A and Object B. */
export type IntersectPrimitives<LR extends DefaultLeftRight> = (
    Exclude<
        LR["LeftContent"] | LR["RightContent"],
        Exclude<LR["LeftContent"], LR["RightContent"]> | Exclude<LR["RightContent"], LR["LeftContent"]>
    >
);

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

interface ValueKeychain<
    V extends DefaultValue,
    __OK extends OptionalKeys<V> = OptionalKeys<V>,
    __RK extends Exclude<keyof V["Content"], __OK> = Exclude<keyof V["Content"], __OK>
    > {
    OptionalKeys: __OK;
    RequiredKeys: __RK;
    Keys: __OK | __RK;
}

type LeftRightKeychain<
    LR extends DefaultLeftRight,
    __LK extends ValueKeychain<LR["LeftValue"]> = ValueKeychain<LR["LeftValue"]>,
    __RK extends ValueKeychain<LR["RightValue"]> = ValueKeychain<LR["RightValue"]>,
    __MOK extends __LK["OptionalKeys"] & __RK["OptionalKeys"]= __LK["OptionalKeys"] & __RK["OptionalKeys"],
    __MRK extends __LK["RequiredKeys"] & __RK["RequiredKeys"]= __LK["RequiredKeys"] & __RK["RequiredKeys"],
    > = {
        LeftValueKeychain: __LK;
        RightValueKeychain: __RK;
        OptionalKeys: __LK["OptionalKeys"] | __RK["OptionalKeys"];
        RequiredKeys: __LK["RequiredKeys"] | __RK["RequiredKeys"];
        Keys: __LK["Keys"] | __RK["Keys"];
        MutualOptionalKeys: __MOK;
        MutualRequiredKeys: __MRK;
        MutualKeys: __MOK | __MRK;
    };

export type UnionMutualProps<
    LR extends DefaultLeftRight,
    __X extends LeftRightKeychain<LR> = LeftRightKeychain<LR>
    > = (
        { [K in __X["MutualOptionalKeys"]]?: LR["LeftValue"][K] | LR["RightContent"][K]; }
        & { [K in __X["MutualRequiredKeys"]]: LR["LeftContent"][K] | LR["RightContent"][K]; }
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

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectProps<
    LR extends DefaultLeftRight,
    __X extends LeftRightKeychain<LR> = LeftRightKeychain<LR>,
    __LeftPick extends Pick<LR["LeftContent"], __X["MutualKeys"]> = Pick<LR["LeftContent"], __X["MutualKeys"]>,
    __RightPick extends Pick<LR["RightContent"], __X["MutualKeys"]> = Pick<LR["RightContent"], __X["MutualKeys"]>
    > = (
        TakeFirstIfMatchExtendsNotCase<
            __X["MutualKeys"],
            If< // If both picked objects extends each other, then ...
                And<Extends<__LeftPick, __RightPick>, Extends<__RightPick, __LeftPick>>,
                If<
                    /* Overall we want check if smaller fits into bigger */
                    And<Extends<__LeftPick, LR["LeftContent"]>, Extends<__RightPick, LR["RightContent"]>>,
                    LR["LeftContent"] & LR["RightContent"],
                    If<
                        Extends<__LeftPick, LR["LeftContent"]>,
                        LR["LeftContent"] & __RightPick,
                        If<
                            Extends<__RightPick, LR["RightContent"]>,
                            __LeftPick & LR["RightContent"],
                            __LeftPick & __RightPick
                        >
                    >
                >,
                // never
                // .. \/\/ expand here
                UnionMutualProps<LR, __X> // replace this by a type that expands recursively
            >,
            never
        >
    );

export type PreferPrimitivesOverEmptyProps<Primitives, Props> = (
    If<
        And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
        Primitives,
        Props | Primitives
    >
);

export type IntersectPrimitivesAndProps<
    LR4Primitives extends DefaultLeftRight,
    LR4Props extends DefaultLeftRight,
    > = (
        PreferPrimitivesOverEmptyProps<
            IntersectPrimitives<LR4Primitives>,
            IntersectProps<LR4Props>
        >
    );

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

/** Combines only those types that are related to the same property key of object A and B and include the remaining keys of object A. */
export type UnionPropsExcept<
    A,
    B,
    LR extends DefaultLeftRight,
    __X extends LeftRightKeychain<LR>,
    __AKeys extends AnyKeys<__A> = AnyKeys<__A>,
    __BKeys extends AnyKeys<__B> = AnyKeys<__B>,
    __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
    __AKeysWithoutMutualKeys extends TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys> = TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys>,
    __IntersectedProps extends (
        IntersectProps<
            A,
            B,
            __A,
            __B,
            __AKeys,
            __BKeys,
            __MutualKeys>
    ) = (
        IntersectProps<
            A,
            B,
            __A,
            __B,
            __AKeys,
            __BKeys,
            __MutualKeys>
    )
    > = (
        If<
            /* Overall we want to check if smaller fits into bigger */
            Extends<__IntersectedProps, __A>,
            If<
                Extends<__A, A>,
                A,
                __A
            >,
            __IntersectedProps
        >
    );

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

type gh = IntersectProps<string[], string[]>;

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

type gg = IntersectProps<ig, og>;
type gg2 = IntersectProps<gg, ig2_0>;


type gg3 = IntersectProps<2, string>;
declare const cgg3: gg3;

type gg4 = UnionPropsExcept<string[], string[], DefaultExpandMode>;
declare const cgg4: gg4;
type gg4_0 = AnyKeys<number> & AnyKeys<number>;

interface igg5 { a: "a1"; b: number; }
type tgg5 = { a: "a1", b: number, d: "d" };
type gg5 = UnionPropsExcept<{ a: "a1", b: number, c: "c" }, { a: "a2", b: string, d: "d" }, DefaultExpandMode>;
type gg5_1 = UnionPropsExcept<igg5, tgg5, DefaultExpandMode>;
type gg5_2 = UnionPropsExcept<tgg5, igg5, DefaultExpandMode>;
type gg5_2_1 = tgg5 extends igg5 ? true : false;

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
