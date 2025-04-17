import { Stack, router} from "expo-router";
import React, { useEffect } from "react";
import { SessionProvider } from "@/contexts/AuthContext";

export default function RootLayout() {

  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false,}} initialRouteName="index">
        <Stack.Screen name='index'/>
        <Stack.Screen name="student-login" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="adult-login" />
      </Stack>
    </SessionProvider>
  );
};

