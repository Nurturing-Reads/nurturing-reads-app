import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import stylesheet from "./stylesheet";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = ({ userName = "John" }) => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <View style={stylesheet.screenHeader}>
        <Text style={stylesheet.screenTitle}>Welcome, {userName}!</Text>
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
