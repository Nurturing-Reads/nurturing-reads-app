import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import stylesheet from "./misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext } from "./authProvider";

// Dashboard Screen
const DashboardScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const navigation = useNavigation();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      console.log("Cannot Sign out.")
    }
    console.log("Successfully signed out.")
  };

  return (
    <SafeAreaView>
      <View style={stylesheet.screenHeader}>
        <Text 
          style={stylesheet.screenTitle}>Welcome, {user ? user.email : "Guest"}!
          </Text>
        <Button 
          onPress={() => {
            handleSignOut();
          }}
          title="Sign Out"/>
      </View>
      <View id="dashboard-body" style={stylesheet.dashboardBody}>
        <View id="dashboard-nav" style={stylesheet.dashboardNav}>
          <Text>Navigation</Text>
        </View>
        <View id="dashboard-content" style={stylesheet.dashboardContent}>
          <Text>content</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default DashboardScreen;
