import { store } from "@/store";
import { Stack } from "expo-router";
import "react-native-url-polyfill/auto";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
