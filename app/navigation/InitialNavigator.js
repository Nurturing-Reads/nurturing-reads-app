import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";
import WelcomeScreen  from "../screens/WelcomeScreen";
import BookScreen from '../screens/bookScreen';
import TabletBookScreen from '../screens/BookTablet/BookScreen';
import StudentLogin from '../screens/Student/StudentLogin';
import { BookShelfScreen } from '../screens/BookShelfScreen';
import { Reader } from '../screens/Reader/Reader';

const InitStackNav = createNativeStackNavigator();

export default function InitStack() {
    return (
        <InitStackNav.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
            <InitStackNav.Screen
                name="Home"
                component={WelcomeScreen}
            />
            {/* Student Page */}
            <InitStackNav.Screen
                name="Student"
                component={StudentLogin}
            />
            <InitStackNav.Screen
                name="Student Reading"
                component={TabletBookScreen}
            />
            {/* Parent/Teacher page */}
            <InitStackNav.Screen
                name="Parent"
                component={HomeNavigator}
            />

            <InitStackNav.Screen 
                name='Book Shelf'
                component={BookShelfScreen}/>

            <InitStackNav.Screen 
                name='Student Login' 
                component={StudentLogin}/>

            <InitStackNav.Screen
                name='Reader Screen'
                component={Reader} />
            
        </InitStackNav.Navigator>
    )
};