import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomeNavigator from "./app/navigation/HomeNavigator";
import { AuthProvider } from "./app/misc/authProvider";
import './app/screens/gesture-handler';
import InitialNavigator from "./app/navigation/InitialNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
  });
  return (
    <AuthProvider>
      <NavigationContainer>
        <InitialNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
