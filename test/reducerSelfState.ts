import { createAction } from "redux-actions";
import { ReducerFactory } from "../src";

const void1Type = "@@void/1";

const createVoid1Action = createAction<string, string>(void1Type, (msg) => msg);

// Error intended
ReducerFactory
    .create()
    .extendUnknownState<{ a: string }>()
    .addReducer(createVoid1Action, (s, a) => s)
    .addReducer(createVoid1Action, () => ({ a: 2 }))
    .toReducer({});
