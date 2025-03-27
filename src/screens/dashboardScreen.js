import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
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

import {Table} from "../components/Table";
import Ionicons from "@expo/vector-icons/Ionicons";

// Create application drawer
const DashboardDrawer = createDrawerNavigator();

// Sample Data for rendering
const sampleData = [
  {id: 1, studentName: "Wong Siu Ching", yearGroup: 1, gender: 'F'},
  {id: 2, studentName: "Chris Chow", yearGroup: 1, gender: 'M'},
  {id: 3, studentName: "Wu Ho Pui", yearGroup: 1, gender: 'F'},
  {id: 4, studentName: "Chan Tai Man", yearGroup: 1, gender: 'M'}
]
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
  const { user, logout, name } = useContext(AuthContext);
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
        headerLeft: () => {
          return (
            <View style={{
              marginLeft: 10,
            }}>
              <Text style={{fontSize: 20}}>Welcome, {name || "User"}!</Text>
            </View>
          );
        },
        headerRight: () => {
          return (
            <TouchableOpacity
              style={stylesheet.logoutButton}
              onPress={() => {
                handleSignOut();
                navigation.navigate("Profile");
              }}
            >
              <Text style={stylesheet.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          );
        },
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

      <DashboardDrawer.Screen
        name="Story Reading Utilization"
        component={ReadingUtilizationScreen}
      />
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
    <View style={{flex: 1, padding: 10}}>
      <Text style={{}}>Class List</Text>
      <Table 
        data={sampleData}/>
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
