import { colors, globalStyles } from "@/styles/global";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    fetchPokemonList,
    goToPage,
    nextPage,
    prevPage,
} from "../store/slices/pokemonSlice";

export default function PokemonScreen() {
  // Used to dispatch Redux actions.
  const dispatch = useAppDispatch();

  // Reads Pokémon state from the Redux store.
  const pokemonState = useAppSelector((state) => state.pokemon);

  const data = pokemonState?.data ?? [];
  const loading = pokemonState?.loading ?? false;
  const error = pokemonState?.error ?? null;
  const offset = pokemonState?.offset ?? 0;
  const limit = pokemonState?.limit ?? 20;
  const count = pokemonState?.count ?? 0;

  // Derive current page and total pages from offset/limit/count.
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(count / limit));

  // Fetch Pokémon whenever the offset (page) changes.
  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch, offset]);

  // Goes back one page.
  const handlePrev = () => {
    if (currentPage > 1) dispatch(prevPage());
  };

  // Goes forward one page.
  const handleNext = () => {
    if (currentPage < totalPages) dispatch(nextPage());
  };

  // Jumps to a specific page number.
  const handlePageSelect = (page: number) => {
    if (page !== currentPage) dispatch(goToPage(page));
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Pokémon</Text>

      {/* Display loading, error, or Pokémon list based on state */}
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : error ? (
        <Text style={{ color: colors.alert }}>{error}</Text>
      ) : (
        <>
          <FlatList
            // Efficiently renders large lists.
            data={data}
            // Provides a unique key for each item.
            keyExtractor={(_, index) => index.toString()}
            // Defines how each Pokémon item is displayed.
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: colors.surface,
                  padding: 16,
                  marginTop: 12,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{ color: colors.text, textTransform: "capitalize" }}
                >
                  {item.name}
                </Text>
              </View>
            )}
          />

          {/* Pagination bar: prev, page numbers, next */}
          <View style={styles.paginationBar}>
            <Pressable
              onPress={handlePrev}
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.4 : 1, padding: 8 }}
            >
              <Text style={{ color: colors.primary }}>Prev</Text>
            </Pressable>

            {/* Horizontal scroll in case there are many pages */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.pageNumberScroll}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Pressable
                    key={page}
                    onPress={() => handlePageSelect(page)}
                    style={{
                      backgroundColor:
                        page === currentPage ? colors.primary : "transparent",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      marginHorizontal: 4,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          page === currentPage
                            ? colors.background
                            : colors.text,
                      }}
                    >
                      {page}
                    </Text>
                  </Pressable>
                ),
              )}
            </ScrollView>

            <Pressable
              onPress={handleNext}
              disabled={currentPage === totalPages}
              style={{
                opacity: currentPage === totalPages ? 0.4 : 1,
                padding: 8,
              }}
            >
              <Text style={{ color: colors.primary }}>Next</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
  },
  pageNumberScroll: {
    maxWidth: 200,
  },
});
