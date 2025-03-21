import React from "react";
import { Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Subheading 1</Text>
      <DrawerItem 
        label="Screen 1"
        onPress={() => props.navigation.navigate("Screen1")}/>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
