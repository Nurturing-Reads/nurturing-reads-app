import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button
} from "react-native";
import stylesheet from "./stylesheet";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const handleErrorMsg = () => {
    // Empty Fields
    if (email === "" || password === ""){
      setErrorMsg("Empty Field");
      return false;
    }
    else{
      setErrorMsg("");
      return true;
    }
  };
  
  return (
    <View style={stylesheet.loginScreenArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios'? 'padding': 'height'}
        style={stylesheet.loginScreenCol}>
        <Text style={stylesheet.loginScreenTitle}>Login to your account</Text>
        <View style={{flexDirection: "row", padding: 10, }}>
          <Text style={{marginRight: 5, marginBottom: 20,color: 'grey'}}>Don't have and account?</Text>
          <TouchableOpacity>
            <Text style={{color: '#FFA500'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(newEmail) => {
            setEmail(newEmail);
            // validEmail = valdateEmail(email);
          }}
          style={stylesheet.textEntry}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          style={stylesheet.passwordEntry}
          onChangeText={(newPassword) => {
            setPassword(newPassword);
          }}
          secureTextEntry={true}
        />
        <View style={{margin: 10}}>
          <Text id='error-message' style={{color: 'red', fontSize: 12}}>{errorMsg}</Text>
          <TouchableOpacity>
            <Text style={{color: 'grey'}}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 10 }}>
          <TouchableOpacity
            onPress={() => {
              let validCred = handleErrorMsg();
              if (validCred){
                navigation.navigate('Dashboard Screen');
              } else {
                return ;
              }
            }}
            style={stylesheet.loginButton}
          >
            <Text style={stylesheet.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Image Column */}
      <View style={stylesheet.loginCover} id="login-screen-cover">
        <Image source={require('../assets/imgs/login-cover.jpg')} style={stylesheet.loginCoverImage}/>
      </View>
      
    </View>
   
  );
};

export default LoginScreen;