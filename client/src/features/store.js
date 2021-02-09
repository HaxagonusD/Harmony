import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./users/reducer";
import commentsReducer from "./comments/reducer";
import notificationsReducer from "./notifications/reducer";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({
    users: userReducer,
    comments: commentsReducer,
    notifications: notificationsReducer,
  }),
  applyMiddleware(thunk)
);

store.subscribe(() => {
  console.log("The entire Store", store.getState());
});

export default store;
