import React from "react";
import { View, Text, Button } from "react-native";
import LoginScreen from "./loginScreen";

const profileScreen = ({signedIn = false}) => {
  if (signedIn) {
    return (
      <View>
        <Text>This is Profile Screen </Text>
      </View>
    );
  } 
  return <LoginScreen />;
};
export default profileScreen;
