import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from "react-native";

import HomeHeader from "../components/HomeHeader";

import {
  createTable,
  getMenuItems,
  saveMenuItems,
  clearMenu,
} from "../services/database";

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        createTable();

        let items = getMenuItems();

        if (items.length === 0) {
          const response = await fetch(
            "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json"
          );

          const json = await response.json();

          clearMenu();
          saveMenuItems(json.menu);

          items = getMenuItems();
        }

        setMenu(items);
      } catch (error) {
        console.log(error);
      }
    };

    loadMenu();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader />

      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.heroText}>
            <Text style={styles.restaurantName}>
              Little Lemon
            </Text>

            <Text style={styles.city}>
              Chicago
            </Text>

            <Text style={styles.description}>
              We are a family owned Mediterranean restaurant,
              focused on traditional recipes served with a
              modern twist.
            </Text>
          </View>

          <Image
            source={require("../../assets/images/Hero image.png")}
            style={styles.heroImage}
          />
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>
                {item.name || item.title}
              </Text>

              <Text
                style={styles.menuDescription}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <Text style={styles.menuPrice}>
                ${Number(item.price).toFixed(2)}
              </Text>
            </View>

            <Image
              source={{ uri: item.image }}
              style={styles.menuImage}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  hero: {
    backgroundColor: "#495E57",
    padding: 20,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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

  searchInput: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 15,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  menuText: {
    flex: 1,
    paddingRight: 10,
  },

  menuTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  menuDescription: {
    color: "#666",
    fontSize: 14,
    marginBottom: 8,
  },

  menuPrice: {
    fontSize: 16,
    fontWeight: "600",
  },

  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});