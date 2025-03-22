import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomeScreen from "./src/screens/homeScreen";
import { AuthProvider } from "./src/misc/authProvider";
import './src/screens/gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
  });
  return (
    <AuthProvider>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </AuthProvider>
  );
}
