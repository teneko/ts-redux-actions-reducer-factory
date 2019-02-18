import { assert } from "chai";
import { beforeEach, describe, it } from "mocha";
import { createReducerFactory } from "../../src";

describe("ReducerFactory", () => {
    let factory = createReducerFactory();

    beforeEach(() => {
        factory = createReducerFactory();
    });

    it("initialKnownState should be undefined", () => {
        assert.isUndefined(factory.initialKnownState);
    });

    // it("setExpandStateMode should ", () => {
    //     const differentExpandStateMode = "RetainState";
    //     assert.notEqual(differentExpandStateMode, factory.options.expandStateMode, "differentExpandStateMode should differ from initial expandStateMode");
    //     const factory2 = factory.setExpandStateMode(differentExpandStateMode);
    //     assert.strictEqual(factory2.options.expandStateMode, differentExpandStateMode);
    // });

    it("toReducer should throw", () => {
        assert.throw(() => factory.acceptUnknownState().toReducer());
    });

    const initialKnownState = { a: "1", b: 2 };

    it("withKnownState should overwrite innitialKnownState", () => {
        factory.withKnownState(initialKnownState);
        assert.deepEqual(factory.initialKnownState, initialKnownState);
    });
});
