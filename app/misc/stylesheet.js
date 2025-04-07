import { StyleSheet } from "react-native";

export const stylesheet = StyleSheet.create({
  dashboardBody: {
    flex: 1,
    flexDirection: "column",
  },
  dashboardNav: {
    width: "30%",
  },
  dashboardContent: {
    width: "70%",
  },
  screenHeader: {
    padding: 50,
  },
  screenTitle: {
    fontFamily: "PoppinsLight",
    fontSize: 30,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA500", // More vibrant orange
    borderRadius: 8,
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow effect
    // width: "80%", // Full width for better usability
  },

  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  loginCover: {
    // Temperory Placeholder properties
    // borderColor: "black",
    // borderWidth: 3,
    width: "65%",
    height: "100%",
  },
  loginCoverImage: {
    resizeMode: "cover",
  },
  loginScreenArea: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginScreenCol: {
    padding: 30,
    alignContent: "left",
    flex: 1,
    flexDirection: "column",
    width: "35%",
  },
  loginScreenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  textEntry: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  passwordEntry: {
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  fieldNameLabel: {
    margin: 10,
    marginBottom: 3,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  drawerSubtitles: {
    margin: 10,
    marginTop: 20,
    color: "grey",
  },
  drawerItem: {
    marginLeft: 10,
  },
  drawerLogo: {
    resizeMode: "contain",
    width: "60%",
    alignSelf: "left",
    marginLeft: 15,
    marginTop: 10, 
  },
  logoutButton: {
    marginRight: 10,
    
  },
  logoutButtonText: {
    fontSize: 15,
  }
});