import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./index";

// Custom typed dispatch hook.
// Ensures dispatch supports Redux actions and async thunks.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom typed selector hook.
// Provides TypeScript support when reading data from the Redux store.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
