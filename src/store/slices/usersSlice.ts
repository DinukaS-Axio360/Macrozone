import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { User } from "../../types/user";

// Defines the shape of the users state in Redux.
type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

// Initial state when the app starts.
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk to fetch users from the API.
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await jsonPlaceholderApi.getUsers();
  return response;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  // Used for synchronous actions (none needed here).
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Runs when the API request starts.
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Runs when the API request succeeds.
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      // Runs when the API request fails.
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// Export the reducer to be added to the Redux store
export default usersSlice.reducer;
