import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";


export const Header = ({handler = () => {}}) => {   
   return (
      <View style={headerStyle.container}>
         {/* <Text>Nurturing Reads</Text> */}
         <Image alt="Logo" source={require('@/assets/images/NR-logo.png')} style={headerStyle.logo}/>
         <TouchableOpacity onPress={() => handler()} style={headerStyle.button}>
            <Text style={headerStyle.text}>Logout</Text>
         </TouchableOpacity>
      </View>
   );
};

const headerStyle = StyleSheet.create({
   container: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center', 
      height: 70,
      backgroundColor: 'white'
   },
   logo: {
      marginTop: 15,
      resizeMode: 'contain', 
      height: 40, 
      width: 250,
      alignSelf: 'flex-start'
   },
   button: {
      width: 100, height: 40, backgroundColor: 'orange', 
      marginRight: 10, 
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5, 
   },
   text: {
      color: 'white'
   }
})