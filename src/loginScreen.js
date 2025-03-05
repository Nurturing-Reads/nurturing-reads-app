import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import stylesheet from './stylesheet';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <SafeAreaView
            style={stylesheet.loginScreenArea}>
            <TextInput 
                placeholder='Email'
                onChangeText={(newEmail) => {
                    setEmail(newEmail);
                }}
                style={stylesheet.textEntry}
            />
            <TextInput
                placeholder='Password'
                style={stylesheet.passwordEntry}
                onChangeText={(newPassword) => {
                    
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