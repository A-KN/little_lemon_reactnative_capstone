import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import HomeHeader from "../components/HomeHeader";

export default function Home() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.restaurantName}>
            Little Lemon
          </Text>

          <Text style={styles.city}>
            Chicago
          </Text>

          <Text style={styles.description}>
            We are a family owned Mediterranean
            restaurant, focused on traditional
            recipes served with a modern twist.
          </Text>
        </View>

  <Image
    source={require("../../assets/images/Hero image.png")}
    style={styles.heroImage}
  />
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    margin: 20,
  },

  hero: {
    backgroundColor: "#495E57",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  heroText: {
    flex: 1,
    paddingRight: 15,
  },

  restaurantName: {
    color: "#F4CE14",
    fontSize: 36,
    fontWeight: "bold",
  },

  city: {
    color: "#FFFFFF",
    fontSize: 28,
    marginBottom: 10,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
  },

  heroImage: {
    width: 130,
    height: 130,
    borderRadius: 12,
  },

  title: {
    display: "none",
  },
});