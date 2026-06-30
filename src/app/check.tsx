import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import UserCard from "@/components/UserCard";
import { getUsers, User } from "@/services/users";
import { colors, globalStyles } from "@/styles/global";

export default function CheckScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View
        style={[
          globalStyles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />

        <Text
          style={{
            color: colors.text,
            marginTop: 15,
          }}
        >
          Loading users...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          globalStyles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text
          style={{
            color: colors.alert,
            fontSize: 16,
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title2}>Users List</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
