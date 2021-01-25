import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./features/users/userReducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ users: userReducer }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
