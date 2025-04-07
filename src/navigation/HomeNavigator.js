import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import DashboardNavigator from "./DashboardNavigation";
import ProfileStackNavigator from "./ProfileStackNavigator";

const HomeTabNavigator = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabNavigator.Navigator id={undefined} initialRouteName="Profile" screenOptions={{headerShown: false,}} >
      <HomeTabNavigator.Screen
        name="Profile"
        component={ProfileStackNavigator}
        initialParams={{signedIn: true}}
        options={{ title: "Profile Screen" }}
      />
      <HomeTabNavigator.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{ title: "Dashboard" }}
      />
    </HomeTabNavigator.Navigator>
  );
};

export default HomeNavigator;