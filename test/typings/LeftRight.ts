import { LeftRight, LeftRightL1, Value } from "../../src/utilityTypes";

type ca = number | { a: "a" };
type cb = number | { b: "b" };

type lr = LeftRight<Value<ca>, Value<cb>>;
type lr_1 = lr["LeftContent"];

type lr2 = LeftRight<Value<ca>, Value<cb>, "ExtractObject">;
type lr2_1 = lr2["LeftContent"];


type lr3 = LeftRightL1<ca, cb>;
type lr3_1 = lr3["LeftContent"];

type lr4 = LeftRightL1<ca, cb, "ExtractObject">;
type lr4_1 = lr4["LeftContent"];
