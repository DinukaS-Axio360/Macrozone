import { PokemonListResponse } from "../types/pokemon";
import { axiosClient } from "./axiosClient";

export const pokemonApi = {
  getPokemonList: async (
    offset: number,
    limit: number,
  ): Promise<PokemonListResponse> => {
    const response = await axiosClient.get<PokemonListResponse>(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
    );
    return response.data;
  },
};
