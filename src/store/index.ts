import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
import usersReducer from "./slices/usersSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  pokemon: pokemonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
