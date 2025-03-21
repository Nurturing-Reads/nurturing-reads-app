import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// Drawer navigation for Dashboard Screen
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Subheading 1</Text>
      <DrawerItem 
        label="Screen 1"
        onPress={() => props.navigation.navigate("Screen1")}/>
      <Text>Subheading 2</Text>
      <DrawerItem 
        label="Screen 2"
        onPress={() => props.navigation.navigate("Screen2")}/>
    </DrawerContentScrollView>
  );
};
// Screen for demonstrating
const Screen1 = ({nav}) => {
  return (
    <View>
      <Text>Screen 1</Text>
      
    </View>
  );
};

const Screen2 = () => {
  return (
    <View>
      <Text>Screen 2</Text>
    </View>
  )
};


const DrawerScreen = () => {
  return (
    <Drawer.Navigator 
      drawerContent={
        (props) => <CustomDrawerContent {...props} />
      }
      initialRouteName="Screen1" 
      screenOptions={{
        drawerType: 'permanent',
        headerShown: false,
      }}>
        {/* Screen 1 */}
      <Drawer.Screen name="Screen1" component={Screen1}/>
      {/* Screen 2 */}
      <Drawer.Screen name="Screen2" component={Screen2}/>
      
      
    </Drawer.Navigator>        
  );
};

const styles = StyleSheet.create({
  
})
export default DrawerScreen;