import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeHeader() {
  const navigation = useNavigation();

  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const values = await AsyncStorage.multiGet([
        "avatar",
        "firstName",
        "lastName",
      ]);

      setAvatar(values[0][1] || null);
      setFirstName(values[1][1] || "");
      setLastName(values[2][1] || "");
    };

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Pressable onPress={() => navigation.navigate("Profile")}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.initialsAvatar}>
            <Text style={styles.initialsText}>
              {`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
            </Text>
          </View>
        )}
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