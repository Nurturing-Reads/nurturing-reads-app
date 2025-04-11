import React from "react";
import { View, Text, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { stylesheet } from "../misc/stylesheet";
import { EntryButton } from "../components/EntryButton";

export default WelcomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flex: 0.5,
          flexDirection: "Column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ resizeMode: "contain", height: 50, margin: 20 }}
          source={require("../../assets/imgs/NR-logo.png")}
        />
        <Text
          style={{
            fontSize: 30,
          }}
        >
          Welcome to Nurturing Reads
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <EntryButton
          label="Student"
          iconName={"school-outline"}
          pageName={"Book Shelf"}
        />
        <EntryButton
          label="Adult"
          iconName={"man-outline"}
          pageName={"Parent"}
        />
      </View>
    </View>
  );
};
