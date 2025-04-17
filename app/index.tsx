import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { EntryButton } from "@/components/EntryButton";
import { useAuth } from "@/contexts/FirebaseAuthContext";

export default function Index() {
  const {user, isLoading} = useAuth();
  useEffect(()=> {
    if (!isLoading && user) {
      router.replace("/(adult)");
      
    }
  }, [user, isLoading]);
  if (isLoading || user) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nurturing Reads</Text>
      <View style={styles.buttonRow}>
        <EntryButton title="Adult" handler={() => router.navigate('/adult-login')} />
        <EntryButton title="Student" handler={() => router.navigate('/student-login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})