import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Import Screens
import DashboardScreen from "./dashboardScreen";
import ProfileScreen from "./profileScreen";
import AuthScreen from "./authScreen";

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
      <Nav.Screen 
        name="Authentication"
        component={AuthScreen}
        />
    </Nav.Navigator>
  );
};

export default HomeScreen;