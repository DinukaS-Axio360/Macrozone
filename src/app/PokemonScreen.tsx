import { colors, globalStyles } from "@/styles/global";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPokemonList, nextPage } from "../store/slices/pokemonSlice";

export default function PokemonScreen() {
  const dispatch = useAppDispatch();
  const pokemonState = useAppSelector((state) => state.pokemon);

  const data = pokemonState?.data ?? [];
  const loading = pokemonState?.loading ?? false;
  const error = pokemonState?.error ?? null;
  const hasMore = pokemonState?.hasMore ?? false;

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, data.length]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(nextPage());
      dispatch(fetchPokemonList());
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Pokémon</Text>

      {loading && data.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : error ? (
        <Text style={{ color: colors.alert }}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.surface,
                padding: 16,
                marginTop: 12,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: colors.text, textTransform: "capitalize" }}>
                {item.name}
              </Text>
            </View>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.7}
          ListFooterComponent={
            loading ? <ActivityIndicator color={colors.primary} /> : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  button: {
    padding: 12,
    backgroundColor: "#222",
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: { color: "#fff", textAlign: "center" },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#e8f4ff",
    borderRadius: 12,
  },
  name: { fontSize: 18, fontWeight: "bold", textTransform: "capitalize" },
});
