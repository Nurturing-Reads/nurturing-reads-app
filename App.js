import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import profileScreen from './src/profileScreen';
import dashboardScreen from './src/dashboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './src/gesture-handler.native';

const Nav = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Nav.Navigator initialRouteName='Profile'>
          <Nav.Screen 
            name="Profile" 
            component={profileScreen}
            title="Profile Screen"/>
          <Nav.Screen 
            name="Dashboard" 
            component={dashboardScreen}/>
        </Nav.Navigator>
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
