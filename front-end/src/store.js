import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./reducers/userReducers";
import { toyReducer } from "./reducers/toyReducers";

const initialState = {
  userReducer: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userReducer: userReducer,
  toyReducer: toyReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
