import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../misc/authProvider";
import { auth } from "../misc/firebaseConfig";
import { DrawerLayout } from "../components/DrawerLayout";
import { stylesheet } from "../misc/stylesheet";

// Screens Import
import { UserDashboardScreen } from "../screens/dashboard/UserDashboardScreen";
import { WellbeingManagementScreen } from "../screens/dashboard/WellbeingManagementScreen";
import { ReadingUtilizationScreen } from "../screens/dashboard/ReadingUtilizationScreen";

const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
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
        <Drawer.Navigator
            drawerContent={(props) => <DrawerLayout {...props} />}
            initialRouteName="User Dashboard"
            screenOptions={{
                drawerType: "permanent",
                headerTitle: "",
                headerShown: true,
                headerStyle: {
                    height: 80,
                    backgroundColor: "transparent",
                },
                headerLeft: () => (
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 20 }}>
                            Welcome, {name || "User"}!
                        </Text>
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        style={stylesheet.logoutButton}
                        onPress={() => {
                            handleSignOut();
                            navigation.navigate("User Dashboard");
                        }}
                    >
                        <Text style={stylesheet.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                ),
            }}
        >
            <Drawer.Screen
                name="User Dashboard"
                component={UserDashboardScreen}
            />
            <Drawer.Screen
                name="Child Wellbeing Management"
                component={WellbeingManagementScreen}
            />
            <Drawer.Screen
                name="Story Reading Utilization"
                component={ReadingUtilizationScreen}
            />
        </Drawer.Navigator>
    );
};

export default DashboardNavigator;
