/**
 * PasswordInput Component
 * 
 * A reusable password input field with an eye icon to toggle password visibility.
 * 
 * @component
 * @example
 * // Example usage in a Login or Signup form:
 * <PasswordInput 
 *   placeholder="Enter your password"
 *   value={password}
 *   onChangeText={setPassword}
 * />
 * 
 * @param {Object} props - Component props
 * @param {string} props.placeholder - The placeholder text for the password input field.
 * @param {string} props.value - The current value of the password input field.
 * @param {function} props.onChangeText - Function to handle changes in the input field.
 * 
 * @returns {JSX.Element} A password input field with a visibility toggle.
 */


import React, { useState } from "react";
import { View, TextInput, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import stylesheet from "../misc/stylesheet";

const PasswordInput = ({ placeholder, value, onChangeText }) => {
  
  const [secureText, setSecureText] = useState(true);
  return (
    <View style={stylesheet.inputContainer}>
      <TextInput
        style={stylesheet.input}
        placeholder={placeholder}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
        />
      <TouchableOpacity onPress={() => {
        setSecureText(!secureText)
      }} style={stylesheet.icon}>
        <MaterialCommunityIcons 
          name={secureText ? "eye-off-outline": "eye-outline"}
          size={20} color="grey"/>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;