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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import stylesheet from "./misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import DashboardScreen from "./dashboardScreen";
import { AuthContext } from "./authProvider";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [rememberLogin, setRemeberLogin] = useState(false);
  const { setUser } = useContext(AuthContext);
  
  const handleLogin = async () => {
    if (email === "" || password === "") {
      return false;
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
        console.log(userCredential)
        navigation.navigate('Dashboard');
      } catch (error) {
        console.log(error);
        console.log("Invalid Email or password. Try Again.")
        return false;
      }
    }
    return true;
  };

  return (
    <View style={stylesheet.loginScreenArea}>
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
        <View style={{ margin: 10 }}>
          <TouchableOpacity
            onPress={() => {
              let loginSucess = handleLogin();
              if (loginSucess){
                navigation.navigate("Dashboard");
              } else {
                setErrorMsg("Error for Logging in");
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
        <Image
          source={require("../assets/imgs/login-cover.jpg")}
          style={stylesheet.loginCoverImage}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
