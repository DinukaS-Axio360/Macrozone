import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
import usersReducer from "./slices/usersSlice";

// Combines all slice reducers into one root reducer.
// Each key becomes a section in the Redux state.
const rootReducer = combineReducers({
  users: usersReducer,
  pokemon: pokemonReducer,
});

// Creates the Redux store and registers all reducers.
export const store = configureStore({
  reducer: rootReducer,
});

// Type representing the complete Redux state structure.
// Used by useSelector for TypeScript support.
export type RootState = ReturnType<typeof store.getState>;

// Type representing the dispatch function.
// Supports normal actions and async thunks.
export type AppDispatch = typeof store.dispatch;
