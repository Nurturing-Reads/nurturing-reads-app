import { View, Text, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import { stylesheet } from "../misc/stylesheet";
import Ionicons from "@expo/vector-icons/Ionicons";

export const DrawerLayout = (props) => {
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
      </View>Chat
    </DrawerContentScrollView>
  );
};
