import { IntersectPrimitives, LeftRightValues, LeftRightValuesL0, LeftRightValuesL1 } from "../../src/utilityTypes";

type tgg1 = bigint & { a: "a" } | string | { a: "a", b: "b" };
type tgg2 = bigint | string | boolean | { a: "a", b: "b" };

type gg1 = IntersectPrimitives<LeftRightValuesL1<tgg1, tgg2>>;
