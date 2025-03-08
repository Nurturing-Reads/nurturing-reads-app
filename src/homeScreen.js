import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Import Screens
import DashboardScreen from "./dashboardScreen";
import ProfileScreen from "./profileScreen";


const Nav = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Nav.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
      <Nav.Screen
        name="Profile"
        component={ProfileScreen}
        title="Profile Screen"
      />
      <Nav.Screen
        name="Dashboard"
        component={DashboardScreen}
        title="Dashboard"
      />
    </Nav.Navigator>
  );
};

export default HomeScreen;