import { colors, globalStyles } from "@/styles/global";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchUsers } from "../store/slices/usersSlice";

export default function UsersScreen() {
  // Used to send actions to Redux
  const dispatch = useAppDispatch();

  // Reads users state from the Redux store.
  const usersState = useAppSelector((state) => state.users);

  const data = usersState?.users ?? [];
  const loading = usersState?.loading ?? false;
  const error = usersState?.error ?? null;

  // Fetch users when the screen loads if data is not already available.
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, data.length]);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Users</Text>

      {/* Show loading, error, or user list based on current state */}
      {loading && data.length === 0 ? (
        <ActivityIndicator color={colors.primary} />
      ) : error ? (
        <Text style={{ color: colors.alert }}>{error}</Text>
      ) : (
        <FlatList
          // Efficiently renders a list of users.
          data={data}
          // Provides a unique key for each list item.
          keyExtractor={(item) => item.id.toString()}
          // Defines how each user item should be displayed.
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
