import { AnyKeys, ExcludeArray, ExcludeObject, Extends, ExtractArray, ExtractObject } from "@teronis/ts-definitions";
import { ActionFunctions } from "redux-actions";
import { And, If, Not, Or } from "typescript-logic";
import { } from "typescript-tuple";
import { Intersect, ValueContent, ImpureDualContent, PureDualContent, FlankValuesKeychain, SingleRemnantKeychain, ImpureFlankContent, MixtureKinds, FlankOrLeftUnionMixtureKind, ArrayMixture, PropsMixture, Value, DeepStructure, MutateContent } from "./temp";
// import { Tail } from "typescript-tuple/lib/utils";
// tslint:disable: interface-name



export type DeepRequired<T> = {
    [P in keyof T]-?: (
        T[P] extends Array<infer U>
        ? Array<DeepRequired<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepRequired<U>>
        : DeepRequired<T[P]>
    )
};

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




type test278 = ValueContent<{}, "ExcludeObject">;



declare const test363: ImpureDualContent<"", { a: "b" }, ["ExtractObject"]>;
type tes23t = typeof test363.RightContent;





// type test263 = [unknown] extends "left" ? true : false;

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



type test58 = PureDualContent<string | (string | { a: "a" })[] | undefined, {} | number | (number | string | { a: "a2" })[]>;
// declare const test56: PrimsMixture<test58, { MixtureKind: MixtureKindKeys }>;
// type test78 = typeof test56;

type StringIntersection = "Intersection";

// type test23 = (string | number) & (string | bigint)



// type test37 = Extract<MixtureKinds["LeftUnion"], FlankOrLeftUnionMixtureKind>;



type test56 = unknown extends never ? true : false;



// declare const tttt: test3456;
// tttt.PropsOptions.ValueOptions

// type testtt_0 = PureDualContent<{ a: { a2: { a3: "a3" } }, b: "b" } | number, { a: { a2: { a3: "a3_1" } }, b: "b2" } | number | { d: "d" }>;
// type testtt_0 = PureDualContent<{ a: { a2: { a3: "a3" } }, b: "b", e: "e" } | number, { a: { a2: { a3: "a3_1" } }, b: "b2", d: "d" } | number>;
// type testtt_0 = PureDualContent<{ a: { a: "a1" }, b: "b1", c: "c1" }, { a: { a: "a2", b: "b2", c: {} }, e: "e2" }>; // TODO: intersect a: { a: ... } and a: { a: ... }
interface a1 {
    a: {
        a: "a1",
        e: "e1"
    };
    b: "b1";
    c: "c1";
}

interface a2 {
    a: {
        a: "a2"
        f: "f1"
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
declare const testtt24: PropsMixture<testtt_0, { MixtureKind: "Intersection" | "FlankUnion", MutualPropsMixtureOptions: { Recursive: true } }>;
// testtt24.
testtt24.
// type testtt24_0 = typeof testtt24._._2.LeftRemnant.Keys;

type test47 = [{}] extends [unknown] ? true : false;

type test589467840 = MixtureKinds["LeftUnion"] extends FlankOrLeftUnionMixtureKind ? true : false;



// // type test56_0 = Exclude {} | (number | string | { a: "a2" })[]
type test59 = PureDualContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, {} | number | (undefined)[] | (number | string | { a: "a2" })[]>;
type test59_1 = MutateContent<string | (string | { a: "a" })[] | (undefined)[] | bigint, "ExtractArray">;
declare const test59_1: ArrayMixture<test59>;


type test61 = ValueContent<[number] | any[] | number, "ExcludeObject">;

// type test60 = PureDualContent<{ a: "a" }, { a: "a2" }>;
// declare const test60_1: PropsMixture<test60, { MixtureKind: "Intersection" }>;





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
