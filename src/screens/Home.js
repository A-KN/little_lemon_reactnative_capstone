import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import HomeHeader from "../components/HomeHeader";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  clearMenu,
} from "../services/database";


const menuImages = {
  "greekSalad.jpg": require("../../assets/images/Greek salad.png"),
  "grilledFish.jpg": require("../../assets/images/Grilled fish.png"),
  "lemonDessert 2.jpg": require("../../assets/images/Lemon dessert.png"),
  "pasta.jpg": require("../../assets/images/Pasta.png"),
  "bruschetta.jpg": require("../../assets/images/Bruschetta.png"),
};

export default function Home() {
  const [menu, setMenu] = useState([]);
    useEffect(() => {
      const loadMenu = async () => {
        try {
          createTable();
          clearMenu();

          const response = await fetch(
            "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json"
          );

          const json = await response.json();

          saveMenuItems(json.menu);

          const items = getMenuItems();
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

    <FlatList
      data={menu}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.menuItem}>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>{item.name}</Text>

            <Text style={styles.menuDescription} numberOfLines={2}>
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