import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../misc/firebaseConfig";
import {stylesheet} from "../misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../misc/authProvider";
import ActionButton from "../components/ActionButton";

const LoginScreen = () => {
  
  /* States for Login */
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberLogin, setRemeberLogin] = useState(false);
  const { setUser } = useContext(AuthContext);

  // Handler for login
  const handleLogin = async () => {
    if (email === "" || password === "") {
      console.log("Empty Email/pasword");
      setErrorMsg("Empty Email/pasword");
      return false;
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log(userCredential);
      } catch (error) {
        console.log(error.message);
        console.log('Login Unsuccessful');
        setErrorMsg(error.message);
        return false;
      }
    }
    console.log("Login Success")
    navigation.navigate('Dashboard');
    return true;
  };

  
  return (
    <View style={stylesheet.loginScreenArea}>
      {/* // User Input space */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={stylesheet.loginScreenCol}
      > 
        <Text style={stylesheet.loginScreenTitle}>Login to your account</Text>
        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text style={{ marginRight: 5, marginBottom: 20, color: "grey" }}>
            Don't have and account?
          </Text>
          <TouchableOpacity onPress={() => {navigation.navigate("Signup")}}>
            <Text style={{ color: "#FFA500" }}>Sign Up</Text>
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
        <View style={{ margin: 10 }}>
          <Text id="error-message" style={{ color: "red", fontSize: 12 }}>
            {errorMsg}
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "grey" }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 10, justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={{marginTop: 10, color: 'grey', fontSize: 15}}>Keep Me Logged In</Text>
          <Switch 
            value={rememberLogin}
            trackColor={{false: '#767577', true: '#FFA500'}}
            onValueChange={() => {
              setRemeberLogin(previousState => !previousState);
            }}
            />
        </View>
        
        {/* Login Button */}
        <ActionButton 
          buttonLabel={"Login"}
          handler={handleLogin}/>
      </KeyboardAvoidingView>

      {/* Image Cover */}
      <View 
        style={stylesheet.loginCover} 
        id="login-screen-cover">
        <Image
          source={require("../../assets/imgs/login-cover.jpg")}
          style={stylesheet.loginCoverImage}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
