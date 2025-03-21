import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import HomeScreen from "./src/homeScreen";
import { AuthProvider } from "./src/authProvider";
import './src/gesture-handler';

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
