import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const EntryButton = ({ label, iconName, pageName }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(pageName);
      }}
      style={styles.buttonStyle}
    >
      <Ionicons
        name={iconName}
        size={70}
        color={"white"}
        style={styles.iconStyle}
      />
      <Text style={styles.textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    margin: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: "orange",
    borderColor: "orange",
    borderStyle: "solid",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "white",
  },
  iconStyle: {
    marginBottom: 10,
  },
});
