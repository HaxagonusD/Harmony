import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./features/users/userReducer";
import { commentsReducer } from "./features/comments/commentsReducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ users: userReducer, comments: commentsReducer }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log("The entire Store", store.getState());
});

export default store;
