import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";

import HomeHeader from "../components/HomeHeader";

import {
  createTable,
  getMenuItems,
  saveMenuItems,
  clearMenu,
} from "../services/database";

const categories = [
  "Starters",
  "Mains",
  "Desserts",
  "Drinks",
];

export default function Home() {
  const [menu, setMenu] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        category,
      ]);
    }
  };

  const HeaderComponent = () => (
    <>
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

      <Text style={styles.deliveryTitle}>
        ORDER FOR DELIVERY!
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => toggleCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category)
                ? styles.categoryButtonSelected
                : null,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category)
                  ? styles.categoryTextSelected
                  : null,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<HeaderComponent />}
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
    alignItems: "center",
  },

  heroText: {
    flex: 1,
    marginRight: 15,
  },

  restaurantName: {
    color: "#F4CE14",
    fontSize: 34,
    fontWeight: "bold",
  },

  city: {
    color: "#FFFFFF",
    fontSize: 26,
    marginBottom: 10,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 22,
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },

  searchInput: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  deliveryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },

  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  categoryButton: {
    backgroundColor: "#EDEFEE",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 90,
  },

  categoryButtonSelected: {
    backgroundColor: "#495E57",
  },

  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495E57",
  },

  categoryTextSelected: {
    color: "#FFFFFF",
  },

  menuItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EDEFEE",
    justifyContent: "space-between",
  },

  menuText: {
    flex: 1,
    marginRight: 12,
  },

  menuTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  menuDescription: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },

  menuPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495E57",
  },

  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});