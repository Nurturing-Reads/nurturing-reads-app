import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";
import StudentScreen from "../screens/studentScreen";
import {WelcomeScreen} from "../screens/WelcomeScreen";

// Todos: Making a
const InitStackNav = createNativeStackNavigator();

const InitStack = () => {
    return (
        <InitStackNav.Navigator initialRouteName={"Home"}>
            <InitStackNav.Screen name="Home" component={WelcomeScreen} />
            <InitStackNav.Screen name="Student" component={StudentScreen} />
            <InitStackNav.Screen name="Parent" component={HomeNavigator} />
        </InitStackNav.Navigator>
    )
}

export default InitStack;