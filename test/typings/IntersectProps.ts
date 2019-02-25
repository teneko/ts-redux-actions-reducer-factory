import { DefaultExpandMode, IntersectProps, UnionMutualProps, OptionalKeys, Value, LeftRight, LeftRightL1 } from "../../src/utilityTypes";


interface igg1 { a: "a"; b: "b"; c?: "c"; f?: "f"; g?: undefined; }
type tigg1 = { a: "a", b: "b", c?: "c", f?: "f", g?: undefined, };
interface igg2 { a: "a"; d: "d", e?: "e"; f?: "f"; g?: undefined; }

interface igg3 { a: "a2"; b: "b2"; e?: "e"; f?: "f2" | undefined; }
interface igg4 { a: "a2"; b: "b2"; e?: "e"; f: "f2" | undefined; }

interface igg5 { a: "a"; b: "b"; c?: "c"; f?: undefined; g?: undefined; }
interface igg6 { a: "a2"; b: "b2"; e?: "e"; f?: undefined | undefined; }

type tgg1 = IntersectProps<LeftRightL1<igg1, igg2>>;
type tgg1_1 = IntersectProps<LeftRightL1<igg1, igg2>>;
declare const cgg1: tgg1;
// cgg1.
type tgg2 = IntersectProps<igg1, igg3>;
declare const cgg2: tgg2;
// cgg2.;

type tgg3 = UnionMutualProps<LeftRightL1<igg1, igg3>>;
type tgg3_0 = OptionalKeys<Value<igg1>>;
type tgg3_0_1 = OptionalKeys<igg1>;
type tgg3_0_2 = OptionalKeys<tigg1>;
type tgg3_0_3 = OptionalKeys<igg4>;
type tgg3_0_0 = igg1["c"] extends undefined ? true : false;
type tgg4 = UnionMutualProps<igg5, igg6>;
declare const cgg4: tgg4;
// cgg4.
type tgg5 = IntersectProps<{ a: "a" }, { b: "b" }>;

// type tgg3 = IntersectProps<string[], string[]>;

interface X {
    key: string
    value: number | undefined
    default?: number
}
