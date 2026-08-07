import React from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileHeader({
  firstName,
  lastName,
  avatar,
}) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#333333"
        />
      </Pressable>

      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {avatar ? (
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.initialsAvatar}>
          <Text style={styles.initialsText}>
            {`${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase()}
          </Text>
        </View>
      )}
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

  initialsAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#495E57",
    justifyContent: "center",
    alignItems: "center",
  },

  initialsText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});