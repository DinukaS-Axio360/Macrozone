import { User } from "@/services/users";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>

      <Text style={styles.label}>
        Email: <Text style={styles.value}>{user.email}</Text>
      </Text>

      <Text style={styles.label}>
        Phone: <Text style={styles.value}>{user.phone}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  label: {
    color: colors.primary,
    marginBottom: 4,
    fontWeight: "600",
  },

  value: {
    color: colors.textSecondary,
    fontWeight: "400",
  },
});
