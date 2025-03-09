import React, { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import stylesheet from "./misc/stylesheet";
import FormField from "./components/FormField";
import PasswordInput from "./components/PasswordInput";

const SignupScreen = () => {
  const [displayName, setName] = useState("");
  const [signupEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var samePassword = false;
  

  const confirmPassword = (pwEntered, password) => {
    return (pwEntered === password);
  };
  return (
    <View style={stylesheet.loginScreenArea}>
      <View style={stylesheet.loginScreenCol}>
        <Text style={stylesheet.loginScreenTitle}>Create your account</Text>
        {/* Name */}
        <FormField
          fieldName={"Name"}
          hint={"e.g. John Doe"}
          value={displayName}
          valueHandler={setName}
        />

        <FormField
          fieldName={"Email"}
          hint={"example@dot.com"}
          value={signupEmail}
          valueHandler={setEmail}
        />
        <PasswordInput 
          value={password}
          />
      </View>
      <View style={stylesheet.loginCover}>
        <Image 
          source={require('../assets/imgs/login-cover.jpg')}
          style={stylesheet.loginCoverImage}/>
      </View>
    </View>
  );
};

export default SignupScreen;
