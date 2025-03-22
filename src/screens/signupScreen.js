import React, { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import stylesheet from "../misc/stylesheet";
import FormField from "../components/FormField";
import PasswordInput from "../components/PasswordInput";

const SignupScreen = () => {
  const [displayName, setName] = useState("");
  const [signupEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [pwdErrorMsg, setPwdErrorMsg] = useState("");

  const passwordMatched = (pw1 = password, pw2=checkPassword) => {
    if (pw1 === pw2){
      setPwdErrorMsg("");
    } else {
      setPwdErrorMsg("Inconssitent Password.")
    }
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

        <Text style={stylesheet.fieldNameLabel}>Password</Text>
        <PasswordInput
          value={password}
          placeholder={"Password"}
          onChangeText={(newPwd) => {
            setPassword(newPwd);
            passwordMatched();
          }}
        />

        <PasswordInput
          value={checkPassword}
          placeholder={"Confirm Password"}
          onChangeText={(newPwd) => {
            setCheckPassword(newPwd);
            passwordMatched();
          }}
        />
        
        
      </View>
      <View style={stylesheet.loginCover}>
        <Image
          source={require("../assets/imgs/login-cover.jpg")}
          style={stylesheet.loginCoverImage}
        />
      </View>
    </View>
  );
};

export default SignupScreen;
