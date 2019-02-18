// import { handleActions } from 'redux-actions';
import { TodoActions } from "app/actions/todos";
import { RootState } from "./state";

/* BEFORE */

// const initialState: RootState.TodoState = [
//   {
//     id: 1,
//     text: 'Use Redux',
//     completed: false
//   }
// ];

// export const todoReducer = handleActions<RootState.TodoState, TodoModel>(
//   {
//     [TodoActions.Type.ADD_TODO]: (state, action) => {
//       if (action.payload && action.payload.text) {
//         return [
//           {
//             id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
//             completed: false,
//             text: action.payload.text
//           },
//           ...state
//         ];
//       }
//       return state;
//     },
//     [TodoActions.Type.DELETE_TODO]: (state, action) => {
//       return state.filter((todo) => todo.id !== (action.payload as any));
//     },
//     [TodoActions.Type.EDIT_TODO]: (state, action) => {
//       return state.map((todo) => {
//         if (!todo || !action || !action.payload) {
//           return todo;
//         }
//         return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text } : todo;
//       });
//     },
//     [TodoActions.Type.COMPLETE_TODO]: (state, action) => {
//       return state.map((todo) =>
//         todo.id === (action.payload as any) ? { ...todo, completed: !todo.completed } : todo
//       );
//     },
//     [TodoActions.Type.COMPLETE_ALL]: (state, action) => {
//       return state.map((todo) => ({ ...todo, completed: true }));
//     },
//     [TodoActions.Type.CLEAR_COMPLETED]: (state, action) => {
//       return state.filter((todo) => todo.completed === false);
//     }
//   },
//   initialState
// );

/* AFTER */

import { ReducerFactory } from "../../../../../dist/ts-redux-actions-reducer-factory";

export const todoReducer = ReducerFactory
  .create()
  .extendUnknownState<RootState.TodoState>()
  .setExpandStateMode("RetainState")
  .addReducer(TodoActions.addTodo, (state, action) => {
    if (action.payload && action.payload.text) {
      return [
        {
          id: state.reduce((max, todo) => Math.max(todo.id || 1, max), 0) + 1,
          completed: false,
          text: action.payload.text,
        },
        ...state,
      ];
    } else {
      return state;
    }
  })
  .addReducer(TodoActions.deleteTodo, (state, action) => {
    return state.filter((todo) => todo.id !== action.payload);
  })
  .addReducer(TodoActions.editTodo, (state, action) => {
    return state.map((todo) => {
      if (!todo || !action || !action.payload) {
        return todo;
      } else {
        return (todo.id || 0) === action.payload.id ? { ...todo, text: action.payload.text! } : todo;
      }
    });
  })
  .addReducer(TodoActions.completeTodo, (state, action) => {
    return state.map((todo) => todo.id === action.payload ? { ...todo, completed: todo.completed } : todo);
  })
  .addReducer(TodoActions.completeAll, (state) => {
    return state.map((todo) => ({ ...todo, completed: true }));
  })
  .addReducer(TodoActions.clearCompleted, (state) => {
    return state.filter((todo) => todo.completed === false);
  })
  .acceptUnknownState([
    {
      id: 1,
      text: "Use Redux",
      completed: false,
    },
  ])
  .toReducer();
