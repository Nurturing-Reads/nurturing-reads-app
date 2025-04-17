import { Stack, router} from "expo-router";
import React, { useEffect } from "react";
import { FirebaseAuthProvider, useAuth} from "@/contexts/FirebaseAuthContext";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const {user, isLoading} = useAuth();
  useEffect(() => {
    if (!isLoading){
      if (user){
        router.replace('/(adult)/dashboard');
      }
    }
  }, [user, isLoading]);

  if (isLoading){
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={"large"}/>
    </View>
  }
  if (!user && !isLoading) {
    // router.replace('/')
  }
  return (
    <FirebaseAuthProvider>
      <Stack screenOptions={{ headerShown: false,}} initialRouteName="index">
        <Stack.Screen name='index'/>
        <Stack.Screen name="student-login" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="adult-login" />
      </Stack>
    </FirebaseAuthProvider>
  );
};

