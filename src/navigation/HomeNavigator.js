import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Import Screens
import DashboardNavigator from "./DashboardNavigation";
import ProfileStackNavigator from "./ProfileStackNavigator";

const HomeTabNavigator = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <HomeTabNavigator.Navigator initialRouteName="Profile" screenOptions={{headerShown: false,}} >
      <HomeTabNavigator.Screen
        name="Profile"
        component={ProfileStackNavigator}
        title="Profile Screen"
      />
      <HomeTabNavigator.Screen
        name="Dashboard"
        component={DashboardNavigator}
        title="Dashboard"
      />
    </HomeTabNavigator.Navigator>
  );
};

export default HomeNavigator;