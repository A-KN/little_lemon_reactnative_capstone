import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Onboarding from "../screens/Onboarding";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const loadState = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingCompleted");

        if (value === "true") {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Onboarding");
        }
      } catch (error) {
        console.log(error);
        setInitialRoute("Onboarding");
      }
    };

    loadState();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}