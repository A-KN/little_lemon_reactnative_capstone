import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Colors from "../theme/colors";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>
        Onboarding Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 40,
  },
});