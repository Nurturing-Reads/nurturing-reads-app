import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import stylesheet from "./styles";

const Login = () => {
  const [keepLogin, setKeepLogin] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [email, setEmail] = useState("");
  
  const validateEmail = (email) => {
    // Return the value of the test against the regex pattern
    return emailRegex.test(email);
  };
  const loginFunc = (email, password) => {
    return ;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={stylesheet.container}
    >
      {/* Left Section - Login Form */}
      <View style={stylesheet.formContainer}>
        <Text style={stylesheet.title}>Login to your account</Text>
        <Text style={stylesheet.subtitle}>
          Don’t have an account?{" "}
          <Text style={stylesheet.signupText}>Sign up</Text>
        </Text>
        <TextInput 
          placeholder="Email" style={stylesheet.input} 
          value={email} onChangeText={validateEmail}
          />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={stylesheet.input}
        />
        <View style={stylesheet.optionsContainer}>
          <View style={stylesheet.checkboxContainer}>
            <Checkbox
              style={stylesheet.checkbox}
              value={keepLogin}
              onValueChange={setKeepLogin}
              color={keepLogin ? "#facc15" : undefined}
            />
            <Text style={stylesheet.keepLoginLabel}>Keep me logged in</Text>
          </View>
          <Text style={stylesheet.forgotPassword}>Forgot your password?</Text>
        </View>
        <TouchableOpacity style={stylesheet.button}>
          <Text style={stylesheet.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesheet.imageContainer}>
        <Image
          source={require("../assets/images/login-image.jpg")}
          style={stylesheet.imageContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
