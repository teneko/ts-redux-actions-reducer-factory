import { DefaultExpandMode, IntersectProps, Spread } from "../../src/utilityTypes";


interface igg1 { a: "a"; b: "b"; c?: "c"; f?: "f"; g?: undefined;  }
interface igg2 { a: "a"; d: "d", e?: "e"; f?: "f"; g?: undefined; }

interface igg3 { a: "a2"; b: "b2"; e?: "e"; f?: "f2" | undefined; }

type tgg1 = IntersectProps<igg1, igg2>;
type tgg2 = IntersectProps<igg1, igg3>;
declare const cgg2: tgg2;
type tgg2_1 = Spread<igg1, igg3>;
declare const cgg2_1: tgg2_1;
// cgg2.f;

// type tgg3 = IntersectProps<string[], string[]>;
