import { createAction } from "redux-actions";
import { ReducerFactory } from "../../src";

const void1Type = "@@void/1";

const createVoid1Action = createAction<string, string>(void1Type, (msg) => msg);

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
    .addReducer(createVoid1Action, (s, a) => [] as typeof s)
    .addReducer(createVoid1Action, (s, a) => [] as number[])
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
    .acceptUnknownState([2])
    .toReducer();

// Alternative #1 / Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    // We retain previous state after this state return for next expansions or initialization
    .addReducer([createVoid1Action, "RetainState"], (s, a) => [])
    .acceptUnknownState([true])
    .toReducer();

// Alternative #2 / Error intended
ReducerFactory
    .create()
    .extendUnknownState<string[]>()
    // We retain previous state after this state return for next expansions or initialization
    .addReducer(createVoid1Action, (s, a) => [] as typeof s)
    .acceptUnknownState([true])
    .toReducer();
