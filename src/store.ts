import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const rootReducer = combineReducers({
  reducer,
});

export type StoreState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
