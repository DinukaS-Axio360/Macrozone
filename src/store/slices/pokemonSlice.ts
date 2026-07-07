import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pokemonApi } from "../../api/pokemonApi";
import { PokemonItem } from "../../types/pokemon";

type PokemonState = {
  data: PokemonItem[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
};

const initialState: PokemonState = {
  data: [],
  loading: false,
  error: null,
  offset: 0,
  limit: 20,
  hasMore: true,
};

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (_, { getState }) => {
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
      state.offset += state.limit;
    },
    resetPokemon(state) {
      state.data = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(...action.payload.results);
        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon";
      });
  },
});

export const { nextPage, resetPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
