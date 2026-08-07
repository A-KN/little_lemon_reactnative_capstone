import React from "react";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Image
          source={require("../../assets/images/Profile.png")}
          style={styles.avatar}
        />
      </Pressable>
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