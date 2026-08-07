import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Header from "../components/Header";
import Colors from "../theme/colors";

export default function Onboarding() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const isNameValid = firstName.trim().length > 0;

  const isEmailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = isNameValid && isEmailValid;
  const navigation = useNavigation();
  const completeOnboarding = async () => {
  try {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    navigation.replace("Profile");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header />

      {/* Hero Section */}

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

      {/* Form */}

      <View style={styles.form}>

        <Text style={styles.heading}>
          Let us get to know you
        </Text>

        <Text style={styles.label}>
          First Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>
          Email
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable
          disabled={!isFormValid}
          onPress={completeOnboarding}
          style={[
            styles.button,
            {
              backgroundColor: isFormValid
                ? Colors.primaryGreen
                : "#D3D3D3",
            },
          ]}
        >
          <Text style={styles.buttonText}>
            Next
          </Text>
        </Pressable>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  hero: {
    backgroundColor: Colors.primaryGreen,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  heroText: {
    flex: 1,
    paddingRight: 15,
  },

  restaurantName: {
    color: Colors.primaryYellow,
    fontSize: 34,
    fontWeight: "bold",
  },

  city: {
    color: Colors.white,
    fontSize: 22,
    marginBottom: 12,
  },

  description: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },

  form: {
    flex: 1,
    padding: 24,
  },

  heading: {
    fontSize: 28,
    fontWeight: "600",
    color: Colors.primaryGreen,
    marginBottom: 40,
  },

  label: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 28,
    fontSize: 16,
  },

  button: {
    width: 120,
    alignSelf: "flex-end",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});