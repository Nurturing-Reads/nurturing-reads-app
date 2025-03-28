import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../misc/firebaseConfig";

export const loginHandler = async ({ email, password, setErrorMsg, setUser, navigation }) => {
  if (email === "" || password === "") {
    console.log("Empty Email/password");
    setErrorMsg("Empty Email/password");
    return false;
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    console.log(userCredential);
  } catch (error) {
    console.log(error.message);
    console.log("Login Unsuccessful");
    setErrorMsg(error.message);
    return false;
  }
  console.log("Login Success");
  navigation.navigate("Dashboard");
  return true;
};