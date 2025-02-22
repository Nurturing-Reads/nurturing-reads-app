import React from "react";
import { StyleSheet } from "react-native";

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  formContainer: {
    flex: 0.3,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  signupText: {
    color: "#facc15",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  forgotPassword: {
    color: "gray",
  },
  button: {
    backgroundColor: "#facc15",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    flex: 0.3,
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
  },
  imageContainer: {
    flex: 0.7,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 5
  },
  keepLoginLabel:{
    color: 'gray'
  }
});

export default stylesheet;