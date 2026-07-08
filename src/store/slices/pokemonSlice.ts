import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemonApi } from "../../api/pokemonApi";
import { PokemonItem } from "../../types/pokemon";

// Defines the shape of the Pokémon state in Redux.
type PokemonState = {
  data: PokemonItem[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  count: number;
};

// Initial state when the app starts.
const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
  offset: 0,
  limit: 20,
  count: 0,
};

// Async thunk to fetch the current page of Pokémon.
export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (_, { getState }) => {
    // Read the current pagination values from the Redux store.
    const state = getState() as { pokemon: PokemonState };
    const { offset, limit } = state.pokemon;
    return await pokemonApi.getPokemonList(offset, limit);
  },
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    nextPage(state) {
      // Move to the next page by increasing the offset.
      state.offset += state.limit;
    },
    prevPage(state) {
      // Move to the previous page, never going below 0.
      state.offset = Math.max(0, state.offset - state.limit);
    },
    goToPage(state, action: { payload: number }) {
      // Jump directly to a specific page number (1-indexed).
      state.offset = (action.payload - 1) * state.limit;
    },
    resetPokemon(state) {
      state.data = [];
      state.offset = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Runs when the API request starts.
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Runs when the API request succeeds.
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        // Replace the current page instead of appending, since we now
        // show one page at a time rather than an infinite scroll list.
        state.data = action.payload.results;
        state.count = action.payload.count;
      })
      // Runs when the API request fails.
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon";
      });
  },
});

// Export actions to dispatch from components.
export const { nextPage, prevPage, goToPage, resetPokemon } =
  pokemonSlice.actions;
// Export the reducer to be added to the Redux store.
export default pokemonSlice.reducer;
