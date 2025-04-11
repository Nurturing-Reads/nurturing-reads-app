import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

export const BrandLogoButton = () => {
  const nav = useNavigation();

  return (
    <View style={styles.brandContainer}>
      <TouchableOpacity
        onPress={() => {
          nav.navigate("Home");
        }}
      >
        <Image
          source={require("../../assets/imgs/NR-logo.png")}
          style={styles.bookIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  brandContainer: {
    alignItems: "left",
  },
  bookIcon: {
    width: 275,
    height: 50,
    resizeMode: "contain",
  },
});
