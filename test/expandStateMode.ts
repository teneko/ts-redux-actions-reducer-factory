import { createAction } from "redux-actions";
import { ReducerFactory } from "../src";
import { Extends } from "@teronis/ts-definitions";

const void1Type = "@@void/1";

const createVoid1Action = createAction<string, string>(void1Type, msg => msg);

// No error intended
ReducerFactory
    .create()
    // "ExtendState"-Mode is set by default
    .addReducer(createVoid1Action, (s, a) => ({
        test: a.payload!
    }))
    // Each add*-Reducer prefers global mode
    .addReducer(createVoid1Action, (s, a) => ({
        test: 2
    }));

// No error intended
ReducerFactory
    .create()
    .setExpandStateMode("InheritState")
    .addReducer(createVoid1Action, (s, a) => ({
        test: a.payload!
    }))
    .addReducer([createVoid1Action, "ExtendState"], (s, a) => ({
        test: 2
    }));

// Error intended
ReducerFactory
    .create()
    .setExpandStateMode("InheritState")
    .addReducer(createVoid1Action, (s, a) => ({
        test: a.payload!
    }))
    .addReducer(createVoid1Action, (s, a) => ({
        test: 2,
    }));

// Error intended
ReducerFactory
    .create()
    .setExpandStateMode("InheritState")
    .addReducer(createVoid1Action, (s, a) => 2)
    .addReducer(createVoid1Action, (s, a) => "")

// Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    .setExpandStateMode("InheritState")
    .addReducer(createVoid1Action, (s, a) => <typeof s>[])
    .addReducer(createVoid1Action, (s, a) => <number[]>[])
    // Only "string[]" should be inferred
    .toReducer([]);

// Bug -> Fixed -> Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    .setExpandStateMode("InheritState")
    // [] results in any[] and is valid by mistake, but thanks to "InheritState"..
    .addReducer(createVoid1Action, (s, a) => [])
    // ..we can not extend previous extended primitive types
    .toReducer([2]);

// Alternative #1 / Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    // We retain previous state after this state return for next expansions or initialization
    .addReducer([createVoid1Action, "RetainState"], (s, a) => [])
    .toReducer([true]);

// Alternative #2 / Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    // We retain previous state after this state return for next expansions or initialization
    .addReducer(createVoid1Action, (s, a) => <typeof s>[])
    .toReducer([true]);