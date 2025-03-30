import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeNavigator from "./HomeNavigator";


const InitStackNav = createNativeStackNavigator();

const InitStack = () => {
    return (
        <InitStackNav.Navigator initialRouteName={}>
            <InitStackNav.Screen name="User Identification" component={}/>
            <InitStackNav.Screen name="User Identification" component={}/>
            <InitStackNav.Screen name="Home" component={HomeNavigator} />
        </InitStackNav.Navigator>
    )
}

export default InitStackNav;