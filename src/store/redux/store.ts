import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./reducers/userDataReducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [],
});

export type IRootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export { store };
