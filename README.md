# @ts-redux-actions-reducer-factory [![Build Status](https://travis-ci.org/teroneko/ts-redux-actions-reducer-factory.svg?branch=master)](https://travis-ci.org/teroneko/ts-redux-actions-reducer-factory) [![npm version](https://badge.fury.io/js/ts-redux-actions-reducer-factory.svg)](https://badge.fury.io/js/ts-redux-actions-reducer-factory)
This reducer factory infers the action by an action creator (or by action type string, then you need to define the generic action type by yourself) and - that's new - it infers also the state. So each reducer takes aware of the return type of previous reducers and represents therefore a possible extended state that must be initialized at the end, unless done at beginning.

# Installation
```
npm install ts-redux-actions-reducer-factory --save
```

# Examples
Take a look at the examples at `examples/`.
- `examples/simple-35482241` An example that demonstrates the inference of the final reducer state.
- `examples/todos` A complete project example with the most easiest form of this factory reducer.

# Tests
Take a look at the (typing) tests at `test/`.

# Contribution
Open an issue, or email me.