import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Import Screens
import DashboardScreen from "./dashboardScreen";
import ProfileScreen from "./profileScreen";

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
        name="Add Class Screen"
        component={AddClassScreen}/>
    </Nav.Navigator>
  );
};

export default HomeScreen;