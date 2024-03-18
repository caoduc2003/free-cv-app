import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./user/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
