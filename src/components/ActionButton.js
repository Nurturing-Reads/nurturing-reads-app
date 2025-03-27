import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import stylesheet from "../misc/stylesheet";

const ActionButton = ({buttonLabel, handler}) => {
  return (
      <TouchableOpacity onPress={handler} style={stylesheet.actionButton}>
        <Text style={stylesheet.actionButtonText}>{buttonLabel}</Text>
      </TouchableOpacity>
  );
};


export default ActionButton;