import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import stylesheet from "../misc/stylesheet";
import FormField from "../components/FormField";
import PasswordInput from "../components/PasswordInput";
import ActionButton from "../components/ActionButton";
import { AuthContext } from "../misc/authProvider";
import { signupHandler } from "../utils/signupHandler";

const SignupScreen = () => {
  const { signup } = useContext(AuthContext);
  const [displayName, setName] = useState("");
  const [signupEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  // Function for handling signup
  const handleSignup = async () => {
    const result = await signupHandler({
      email: signupEmail,
      password,
      checkPassword,
      displayName,
      signup,
    });

    if (!result.success) {
      console.log(result.error);
      setErrorMsg(result.error);
    } else {
      console.log("User created");
    }
  };

  return (
    <View style={stylesheet.loginScreenArea}>
      <KeyboardAvoidingView
        style={stylesheet.loginScreenCol}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
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
          }}
        />

        <PasswordInput
          value={checkPassword}
          placeholder={"Confirm Password"}
          onChangeText={(newPwd) => {
            setCheckPassword(newPwd);
          }}
        />
        <Text style={{ color: "red", marginLeft: 10 }}>{errMsg}</Text>
        {/* Signup Button */}
        <ActionButton buttonLabel={"Signup"} handler={handleSignup} />
      </KeyboardAvoidingView>
      <View style={stylesheet.loginCover}>
        <Image
          source={require("../../assets/imgs/login-cover.jpg")}
          style={stylesheet.loginCoverImage}
        />
      </View>
    </View>
  );
};

export default SignupScreen;
