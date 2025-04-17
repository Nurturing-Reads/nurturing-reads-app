import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView} from "react-native";
// import loginCover from '@/assets/images/login-cover.jpg';
import { TextInputField } from "@/components/TextField";


export default function SignInScreen (){
  const [email, setEmail] = useState<String>("")
  const [pwd, setPwd] = useState<String>("");
  
  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <KeyboardAvoidingView style={[styles.container, {width: "30%"}]}>
      <TextInputField fieldName="Email"/>
        
      </KeyboardAvoidingView>
      <View style={styles.container}>
        <Image source={require('@/assets/images/login-cover.jpg')} style={styles.image}/>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center', 
  },
  
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: "100%"
  }
})