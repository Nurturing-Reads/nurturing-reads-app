import React from 'react';
import {View, Text, Button} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20
            }}>
            <Text style={{
                fontSize: 30
            }}>Welcome to Nurturing Reads</Text>
            <Button
                title="I'm a Student"
                onPress={() => {navigation.navigate('Student')}}
            />
            <Button title="I'm a Parent/Teacher" onPress={() => {navigation.navigate('Parent')}}/>
        </View>
    );
};
