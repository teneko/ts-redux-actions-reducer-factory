import { AnyKeys, ExcludeObject, Extends, ExtractObject, ExtractObjectAfterExcludeArray } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";


/**
 * Names of properties in T with types that include undefined
 * credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
 */
// export type OptionalPropertyNames<
//     T,
//     __T extends ExtractObject<T>= ExtractObject<T>,
//     __TKeys extends keyof __T = keyof __T
//     > = (
//         { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T]
//     );

// export type OriginalOptionalPropertyNames<T> =
//     { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

// export type NonNonOptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? k : never }[keyof T];

/**
 * Checks
 * credits: https://stackoverflow.com/a/49683575
 */
export type OptionalKeys<
    T,
    __T extends ExtractObject<T>= ExtractObject<T>,
    > = (
        { [K in keyof __T]-?: {} extends { [P in K]: __T[K] } ? K : never }[keyof __T]
    );

/**
 * Common properties from L and R with undefined in R[K] replaced by type in L[K]
 * credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
 */
type SpreadProperties<
    Left,
    Right,
    LeftAndOptionalRightKeys extends keyof Left & keyof Right
    > = (
        { [P in LeftAndOptionalRightKeys]: Left[P] | Exclude<Right[P], undefined> }
    );

// Type of { ...L, ...R }
// credits: https://github.com/Microsoft/TypeScript/pull/21316#issuecomment-359574388
type Spread<
    Left,
    Right,
    __Left extends ExtractObject<Left> =  ExtractObject<Left>,
    __Right extends ExtractObject<Right> = ExtractObject<Right>,
    __LeftKeys extends keyof __Left = keyof __Left,
    __RightKeys extends keyof __Right = keyof __Right,
    > = (
        // Properties in L, that don't exist in R
        & Pick<__Left, Exclude<__LeftKeys, __RightKeys>>
        // Optional/undefined properties from R, that don't exist in L
        & Pick<__Right, Exclude<OptionalKeys<Right, __Right>, __LeftKeys>>
        // Properties in R without properties that are optional/undefined
        & Pick<__Right, Exclude<__RightKeys, OptionalKeys<__Right>>>
        // Properties in R, with types that include undefined, that exist in L
        & SpreadProperties<__Left, __Right, __LeftKeys & OptionalKeys<Right, __Right>>
    );


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
export type IntersectPrimitiveTypes<A, B> = Exclude<A | B, Exclude<A, B> | Exclude<B, A> | object>;


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

export type UnionMutualProps<
    A,
    B,
    __A extends ExtractObject<A> = ExtractObject<A>,
    __B extends ExtractObject<B> = ExtractObject<B>,
    __MutualOptionalKeys extends OptionalKeys<A, __A> & OptionalKeys<B, __B> = OptionalKeys<A, __A> & OptionalKeys<B, __B>,
    __MutualRequiredKeys extends Exclude<keyof __A & keyof __B, __MutualOptionalKeys> = Exclude<keyof __A & keyof __B, __MutualOptionalKeys>
    > = (
        { [K in __MutualOptionalKeys]?: __A[K] | __B[K]; }
        & { [K in __MutualRequiredKeys]: __A[K] | __B[K]; }
    );

export type IntersectProps<
    Left,
    Right,
    __Left extends ExtractObject<Left> = ExtractObject<Left>,
    __Right extends ExtractObject<Right> = ExtractObject<Right>,
    __MutualKeys extends keyof __Left & keyof __Right = keyof __Left & keyof __Right
    > = (
        TakeFirstIfMatchExtendsNotCase<
            __MutualKeys,
            UnionMutualProps<Left, Right, __Left, __Right>,
            never
        >
    );

/** Intersect only those types that are related to the same property key of object A and B. This function is only applicable on object types. */
export type IntersectPropsWhileConserve<
    A,
    B,
    __A extends ExtractObject<A> = ExtractObject<A>,
    __B extends ExtractObject<B> = ExtractObject<B>,
    __AKeys extends keyof __A = keyof __A,
    __BKeys extends keyof __B = keyof __B,
    __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
    __APicked extends Pick<__A, __MutualKeys> = Pick<__A, __MutualKeys>,
    __BPicked extends Pick<__B, __MutualKeys> = Pick<__B, __MutualKeys>
    > = (
        TakeFirstIfMatchExtendsNotCase<
            __MutualKeys,
            If< // If both picked objects extends each other, then ...
                And<Extends<__APicked, __BPicked>, Extends<__BPicked, __APicked>>,
                If<
                    /* Overall we want check if smaller fits into bigger */
                    And<Extends<__APicked, __A>, Extends<__BPicked, __B>>,
                    __A & __B,
                    If<
                        Extends<__APicked, __A>,
                        __A & __BPicked,
                        If<
                            Extends<__BPicked, __B>,
                            __APicked & __B,
                            __APicked & __BPicked
                        >
                    >
                >,
                // never
                // .. \/\/ expand here
                UnionMutualProps<A, B, __A, __B> // replace this by a type that expands recursively
            >,
            never
        >
    );



export type IntersectPropsExceptArray<
    A,
    B,
    ExpandMode extends ExpandModes,
    __A extends ExtractObjectAfterExcludeArray<A> = ExtractObjectAfterExcludeArray<A>,
    __B extends ExtractObjectAfterExcludeArray<B> = ExtractObjectAfterExcludeArray<B>,
    __AKeys extends keyof __A = keyof __A,
    __BKeys extends keyof __B = keyof __B,
    __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
    > = IntersectPropsWhileConserve<
        A,
        B,
        ExpandMode,
        __A,
        __B,
        __AKeys,
        __BKeys,
        __MutualKeys
    >;

export type PreferPrimitivesOverEmptyProps<Primitives, Props> = (
    If<
        And<Not<Extends<Primitives, never>>, And<Extends<Props, {}>, Extends<{}, Props>>>,
        Primitives,
        Props | Primitives
    >
);

export type IntersectPrimitivesAndPropsExceptArrays<
    A,
    B,
    ExpandMode extends ExpandModes
    > = (
        PreferPrimitivesOverEmptyProps<
            IntersectPrimitiveTypes<
                A,
                B
            >,
            IntersectPropsExceptArray<
                A,
                B,
                ExpandMode
            >
        >
    );

type ArrayInnerType<T> = T extends Array<infer InnerType> ? InnerType : never;

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
    ExpandStateMode extends ExpandModes,
    __A extends ExtractObject<A> = ExtractObject<A>,
    __B extends ExtractObject<B> = ExtractObject<B>,
    __AKeys extends AnyKeys<__A> = AnyKeys<__A>,
    __BKeys extends AnyKeys<__B> = AnyKeys<__B>,
    __MutualKeys extends __AKeys & __BKeys = __AKeys & __BKeys,
    __AKeysWithoutMutualKeys extends TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys> = TakeFirstIfMatchExtendsNotCase<__MutualKeys, Exclude<__AKeys, __MutualKeys>, __AKeys>,
    __IntersectedProps extends (
        IntersectPropsWhileConserve<
            A,
            B,
            ExpandStateMode,
            __A,
            __B,
            __AKeys,
            __BKeys,
            __MutualKeys>
    ) = (
        IntersectPropsWhileConserve<
            A,
            B,
            ExpandStateMode,
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

type gh = IntersectPropsWhileConserve<string[], string[], DefaultExpandMode>;

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

type gg = IntersectPropsWhileConserve<ig, og, DefaultExpandMode>;
type gg2 = IntersectPropsWhileConserve<gg, ig2_0, DefaultExpandMode>;


type gg3 = IntersectPropsWhileConserve<2, string, DefaultExpandMode>;
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

type test765 = {} extends {} & {} ? true : false;
