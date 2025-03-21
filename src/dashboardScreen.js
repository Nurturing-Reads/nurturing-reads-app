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
import stylesheet from "./misc/stylesheet";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { AuthContext } from "./authProvider";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

const DashboardDrawer = createDrawerNavigator();

// Test Class List
const ClassesList = [
  {
    classid: 1,
    classname: "1A",
    students: [
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
    ],
  },
  {
    classid: 2,
    classname: "1B",
    students: [
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
    ],
  },
  {
    classid: 3,
    classname: "1C",
    students: [
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
      { firstName: "John", lastName: "Chan", age: 10 },
    ],
  },
];

// Test for the mapping function
const extractClassName = (classJson) => {
  return classJson.classname;
};
// console.log(ClassesList.map(extractClassName))

const DrawerLayout = (props) => {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  return (
    <DrawerContentScrollView {...props}>
      <Image
        source={require("../assets/imgs/NR-logo.png")}
        style={stylesheet.drawerLogo}
      />
      <DrawerItem
        style={stylesheet.drawerItem}
        focused={currentRoute === "User Dashboard"}
        label="Dashboard"
        onPress={() => props.navigation.navigate("User Dashboard")}
      />
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

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={stylesheet.drawerSubtitles}>Class Management</Text>
        <TouchableOpacity style={{ margin: 10 }} onPress={}>
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
        headerShown: true,
        headerLeft: () => null,
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
