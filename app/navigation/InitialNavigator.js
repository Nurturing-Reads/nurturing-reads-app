import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import BookScreen from "../screens/bookScreen";

// Todos: Making a
const InitStackNav = createNativeStackNavigator();

export default function InitStack() {
    return (
        <InitStackNav.Navigator initialRouteName={"Home"}>
            <InitStackNav.Screen
                name="Home"
                component={WelcomeScreen}
            />
            {/* Student Page */}
            <InitStackNav.Screen
                name="Student"
                component={BookScreen}
            />

            {/* Parent/Teacher page */}
            <InitStackNav.Screen
                name="Parent"
                component={HomeNavigator}
            />
        </InitStackNav.Navigator>
    )
};