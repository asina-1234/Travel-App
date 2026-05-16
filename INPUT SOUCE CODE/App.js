import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import TravelerScreen from "../screens/TravelerScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import OfficerDashboard from "../screens/OfficerDashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TravellerScreen" component={TravelerScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="OfficerDashboard" component={OfficerDashboard} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}