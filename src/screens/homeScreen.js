import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

// Import Screens
import DashboardScreen from "./dashboardScreen";
import ProfileScreen from "./profileScreen";
import DrawerScreen from "./drawerScreen";
import BookScreen from "./bookScreen";

const Nav = createBottomTabNavigator();
const AddClassScreen = () => {
  return (
    <View>
      <Text>Add Class Screen</Text>
    </View>
  )
};
const HomeScreen = () => {
  return (
    <Nav.Navigator initialRouteName="Profile" screenOptions={{headerShown: false,}} >
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
        name="Drawer"
        component={DrawerScreen}
        title="Drawer Screen"/>
      <Nav.Screen 
        name="Add Class Screen"
        component={AddClassScreen}/>
      <Nav.Screen 
        name="Reading"
        component={BookScreen}/>
    </Nav.Navigator>
  );
};

export default HomeScreen;
