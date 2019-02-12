export type CombinableReducer<InvalidReduxReducer> = InvalidReduxReducer extends (state: infer S, action: infer A) => any ? (state: S | undefined, action: A) => S : never;

/** An utility function, that makes a reducer type defintion for `combineReducers` (@redux) valid by adding `undefined` to the state type definition. */
export function asCombinableReducer<S, A>(reducer: (state: S, action: A) => S) {
    return <CombinableReducer<typeof reducer>>reducer;
}