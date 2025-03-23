import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import stylesheet from "../misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../misc/firebaseConfig";
import { AuthContext } from "../misc/authProvider";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

// Create application drawer
const DashboardDrawer = createDrawerNavigator();

const DrawerLayout = (props) => {

  // Initialize states for navigations and updates
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  return (
    // Drawer view container 
    <DrawerContentScrollView {...props}>
      {/* Logo */}
      <Image
        source={require("../../assets/imgs/NR-logo.png")}
        style={stylesheet.drawerLogo}
      />

      {/* Dashboard */}
      <DrawerItem
        style={stylesheet.drawerItem}
        focused={currentRoute === "User Dashboard"}
        label="Dashboard"
        onPress={() => props.navigation.navigate("User Dashboard")}
      />

      {/* Analytics Section */}
      <Text style={stylesheet.drawerSubtitles}>Analytics</Text>
      <DrawerItem
        style={stylesheet.drawerItem}
        focused={currentRoute === "Story Reading Utilization"}
        label="Story Reading Utilization"
        onPress={() => props.navigation.navigate("Story Reading Utilization")}
      />

      <DrawerItem
        style={stylesheet.drawerItem}
        focused={currentRoute === "Child Wellbeing Management"}
        label="Child Wellbeing Management"
        onPress={() => props.navigation.navigate("Child Wellbeing Management")}
      />

      {/* Class Management Section */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={stylesheet.drawerSubtitles}>Class Management</Text>
        <TouchableOpacity style={{ margin: 20 }}>
          <Ionicons name="add" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// Dashboard Screen
const DashboardScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
      console.log("Cannot Sign out.");
    }
    console.log("Successfully signed out.");
  };

  return (
    <DashboardDrawer.Navigator
      drawerContent={(props) => <DrawerLayout {...props} />}
      initialRouteName="User Dashboard"
      screenOptions={{
        drawerType: "permanent",
        headerTitle: "",
        headerShown: true,
        headerStyle: {
          height: 80,
        },
        headerLeft: () => null,
        headerRight: () => {
          return (
            <TouchableOpacity 
              style={stylesheet.logoutButton} 
              onPress={() => {
                handleSignOut();
                navigation.navigate("Profile")
              }}>
              <Text style={stylesheet.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )
        }
      }}
    >
      <DashboardDrawer.Screen
        name="User Dashboard"
        component={UserDashboardScreen}
      />
      <DashboardDrawer.Screen
        name="Child Wellbeing Management"
        component={WellbeingManagementScreen}
      />

      <DashboardDrawer.Screen name="Story Reading Utilization" component={ReadingUtilizationScreen}/>
    </DashboardDrawer.Navigator>
  );
};

const AddUserScreen = () => {
  return (
    <View>
      <Text>Add User Screen</Text>
    </View>
  );
};

// Screen placeholders
const UserDashboardScreen = () => {
  return (
    <View>
      <Text>User Dashboard</Text>
    </View>
  );
};

const WellbeingManagementScreen = () => {
  return (
    <View>
      <Text>Wellbeing Management</Text>
    </View>
  );
};

const ReadingUtilizationScreen = () => {
  return (
    <View>
      <Text>Story Reading Utilization</Text>
    </View>
  );
};
export default DashboardScreen;
