import { createAction } from "redux-actions";
import { createReducerFactory } from "../../src";

const void1Type = "@@void/1";

const createVoid1Action = createAction<boolean, boolean>(void1Type, (msg) => msg);

createReducerFactory()
    .withKnownState({ a: "1" })
    .acceptUnknownState();
