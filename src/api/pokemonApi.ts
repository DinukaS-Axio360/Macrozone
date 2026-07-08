import { PokemonListResponse } from "../types/pokemon";
import { axiosClient } from "./axiosClient";

export const pokemonApi = {
  // Fetch a paginated list of Pokémon.
  // offset = starting position, limit = number of Pokémon to fetch.
  getPokemonList: async (
    offset: number,
    limit: number,
  ): Promise<PokemonListResponse> => {
    // <PokemonListResponse> tells TypeScript the expected response structure.
    try {
      const response = await axiosClient.get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
