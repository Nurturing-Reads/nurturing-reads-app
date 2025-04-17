import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSession } from "@/contexts/AuthContext";

export default function () {
  const {session} = useSession();
  
  return (
    <View style={styles.container}>
      <Text>
        Welcome, {session}
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