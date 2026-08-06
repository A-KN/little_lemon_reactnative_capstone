import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },

  logo: {
    width: 180,
    height: 50,
  },
});