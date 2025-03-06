import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import stylesheet from './stylesheet';

const valdateEmail = (email) => {
    // Check if that fullfil the email requirement, return true if it does
    if (true){
        return true;
    }
    // Otherwise, return false
    return false;
};

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const validEmail = false;
    
    return (
        <SafeAreaView
            style={stylesheet.loginScreenArea}>
            <TextInput 
                placeholder='Email'
                onChangeText={(newEmail) => {
                    setEmail(newEmail);
                    validEmail = valdateEmail(email);
                }}
                style={stylesheet.textEntry}
            />
            <TextInput
                placeholder='Password'
                style={stylesheet.passwordEntry}
                onChangeText={(newPassword) => {
                    setPassword(newPassword);
                }}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={stylesheet.loginButton}
                >
                <Text style={stylesheet.loginButtonText}>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
        
    );
};

export default LoginScreen;