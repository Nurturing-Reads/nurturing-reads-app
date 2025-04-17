import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { TextInputField } from "@/components/TextField";
import { useSession } from "@/contexts/AuthContext";
import { router } from 'expo-router';

export default function SignInScreen() {
  const [email, setEmail] = useState<string>("")
  const [pwd, setPwd] = useState<string>("");
  const { signIn } = useSession();
  
  return (
    <View style={[styles.container, { flexDirection: 'row' }]}>
      <KeyboardAvoidingView style={[styles.container, { flex: 0.3 }]}>
        <Text style={styles.title}>Sign In to Nurturing Reads</Text>
        <TextInputField
          fieldName="Email"
          value={email}
          onChange={(val) => {
            // Set email for new input 
            setEmail(val);
          }}
          hint="e.g. John.Doe@domain.com"
        />
        
        <TextInputField
          fieldName="Password"
          value={pwd}
          onChange={(val) => {
            // Set password for new input
            setPwd(val);
          }}
          hint="Password"
          enableSecureInput={true}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            signIn();
            setTimeout(() => {
              signIn();
              router.replace('/(adult)')
            }, 1500);
          }}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={[styles.container, { flex: 0.8 }]}>
        <Image source={require('@/assets/images/login-cover.jpg')} style={styles.image} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: "100%",
    padding: 20
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
  },
  loginButton: {
    backgroundColor: 'orange',
    height: 40, width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: 'rgba(1,1, 1,0.3)', shadowRadius: 5
  },
  loginButtonText: {
    color: 'white'
  }
})