import { IntersectPrimitives, LeftRight } from "../../src/utilityTypes";

type tgg1 = bigint & { a: "a" } | string | { a: "a", b: "b" };
type tgg2 = bigint | string | boolean | { a: "a", b: "b" };

type gg1 = IntersectPrimitives<LeftRight<tgg1, tgg2>>;
