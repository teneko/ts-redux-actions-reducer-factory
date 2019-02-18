import { createAction } from "redux-actions";
import { StateType } from "typesafe-actions";
import { ReducerFactory } from "../../src";

// Type constants
const aType = "a";
const bType = "b";

// Container a
interface IActionA {
    a: string;
}

// Container b
interface IActionB {
    b: string;
}

// You define the action creators:
// - you want to be able to reduce "a"
const createAAction = createAction<IActionA, string>(aType, (a) => ({ a }));
// - you also want to be able to reduce "b"
const createBAction = createAction<IActionB, string>(aType, (b) => ({ b }));

/*
 * Now comes a neat reducer factory into the game and we
 * keep a reference to the factory for example purposes
 */
const factory = ReducerFactory
    .create()
    /*
     * We need to take care about other following reducers, so we normally want to include the state
     * by adding "...state", otherwise only property "a" would survive after reducing "a".
     */
    .addReducer(createAAction, (state, action) => ({
        ...state,
        ...action.payload!,
    }))
    /*
     * By implementation you are forced to initialize "a", because we
     * now know about the property "a" by previous defined reducer.
     */
    .addReducer(createBAction, (state, action) => ({
        ...state,
        ...action.payload!,
    }))
    .acceptUnknownState({
        a: "I am A by default!",
        b: "I am B by default!",
    });

// At the very end, we want the reducer, but are forced to initialize the reducer state.
const reducer = factory.toReducer();

const initialState = factory.initialKnownState;
// { a: "I am A by default!", b: "I am B by default!" }

const resultFromA = reducer(initialState, createAAction("I am A!"));
// { a: "I am A!", b: "I am B by default!" }

const resultFromB = reducer(resultFromA, createBAction("I am B!"));
// { a: "I am A!", b: "I am B!" }

// And when you need the new derived type, you can get it with a module like @typesafe-actions
type DerivedType = StateType<typeof reducer>;

// Everything is type-safe. :)
const derivedState: DerivedType = initialState;
