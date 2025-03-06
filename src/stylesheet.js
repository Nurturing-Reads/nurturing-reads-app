import React from "react";
import { StyleSheet } from "react-native";

const stylesheet = StyleSheet.create({
    loginScreenArea: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    textEntry: {
        margin: 10,
        padding: 10,
        borderWidth: 1, 
        borderColor: 'fff'
    },
    passwordEntry: {
        margin: 10,
        padding: 10,
        borderWidth: 1, 
        borderColor: 'fff'
        
    },
    loginButton: {
        backgroundColor: 'yellow',
        margin: 10,
        padding: 10,
        borderColor: '000',
        borderWidth: 1,
        borderRadius: 10, 
        width: "10%",
        alignItems: 'center'
    },
    loginButtonText: {
        color: 'black'
    }
});

export default stylesheet;
