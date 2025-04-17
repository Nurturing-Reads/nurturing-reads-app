import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/FirebaseAuthContext";

export default function () {
  const {user, signOut} = useAuth();
  
  return (
    <View style={styles.container}>
      <Text>
        Welcome, {user?.email}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})