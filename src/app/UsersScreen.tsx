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
import { fetchUsers } from "../store/slices/usersSlice";

export default function UsersScreen() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);

  const data = usersState?.users ?? [];
  const loading = usersState?.loading ?? false;
  const error = usersState?.error ?? null;

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, data.length]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Users</Text>
      {loading && data.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : error ? (
        <Text style={{ color: colors.alert }}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
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
                style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}
              >
                {item.name}
              </Text>
              <Text style={{ color: colors.textSecondary }}>{item.email}</Text>
            </View>
          )}
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
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
  },
  name: { fontSize: 18, fontWeight: "bold" },
});
