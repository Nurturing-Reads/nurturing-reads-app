import {createDrawerNavigator} from "@react-navigation/drawer";
import React, {useContext} from "react";
import {AuthContext} from "../misc/authProvider";
import {useNavigation} from "@react-navigation/native";
import {signOut} from "firebase/auth";
import {auth} from "../misc/firebaseConfig";
import {DrawerLayout} from "../components/DrawerLayout";
import {Text, TouchableOpacity, View} from "react-native";
import {stylesheet} from "../misc/stylesheet";

// Screens Import
import {UserDashboardScreen} from "../screens/dashboard/UserDashboardScreen";
import {WellbeingManagementScreen} from "../screens/dashboard/WellbeingManagementScreen";
import {ReadingUtilizationScreen} from '../screens/dashboard/ReadingUtilizationScreen';
const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
    const {user, logout, name} = useContext(AuthContext);
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
    const leftHeader = () => {
        return;
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
