import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton}>
        <Ionicons name="arrow-back" size={22} color="#495E57" />
      </Pressable>

      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={require("../../assets/images/Profile.png")}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EDEFEE",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 40,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});