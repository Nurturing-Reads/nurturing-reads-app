import React from "react";
import LoginScreen from "../screens/loginScreen";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from "../screens/signupScreen";
import DashboardNavigator from './DashboardNavigation';

// Initialize Stack Navigator
const Stack = createNativeStackNavigator();

const ProfileStackNavigator = ({ signedIn = false }) => {
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
        component={DashboardNavigator}
        />
      <Stack.Screen 
        name='Signup'
        component={SignupScreen}
        options={{headerShown: false}}
        />
    </Stack.Navigator>
  );
};
export default ProfileStackNavigator;