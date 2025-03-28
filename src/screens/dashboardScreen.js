import React, { useContext } from "react";
import {View, Text, TouchableOpacity} from "react-native";
import { stylesheet } from "../misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../misc/firebaseConfig";
import { AuthContext } from "../misc/authProvider";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Table} from "../components/Table";
import { sampleData } from "../utils/sampleData";
import { DrawerLayout } from "../components/DrawerLayout";


// Create application drawer
const DashboardDrawer = createDrawerNavigator();

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
          backgroundColor: 'transparent'
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
