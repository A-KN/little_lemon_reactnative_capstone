import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./src/screens/Onboarding";
import Profile from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
        />

         <Stack.Screen
           name="Profile"
           component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}