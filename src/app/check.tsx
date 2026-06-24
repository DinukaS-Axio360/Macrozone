import { globalStyles } from "@/styles/global";
import React from "react";
import { ScrollView } from "react-native";

export default function check() {
  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    ></ScrollView>
  );
}
