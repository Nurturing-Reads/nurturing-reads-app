import React from "react";
import { View, Text, Button } from "react-native";
import LoginScreen from "./loginScreen";
import DashboardScreen from "./dashboardScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const ProfileScreen = ({ signedIn = false }) => {
  const initialScreen = (signedIn)? 'Dashboard Screen': 'Login Screen';
  return (
    
    <Stack.Navigator 
      initialRouteName={initialScreen} >
      <Stack.Screen 
        name='Login Screen' 
        component={LoginScreen} 
        options={{headerShown: false}}
        />
      <Stack.Screen 
        name='Dashboard Screen' 
        component={DashboardScreen} 
        />

    </Stack.Navigator>
  );
};
export default ProfileScreen;