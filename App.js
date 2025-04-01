import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomeNavigator from "./src/navigation/HomeNavigator";
import { AuthProvider } from "./src/misc/authProvider";
import './src/screens/gesture-handler';
import InitialNavigator from "./src/navigation/InitialNavigator";

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
