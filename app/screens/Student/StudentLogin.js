import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";

const StudentLogin = () => {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");

  const handleKeyPress = (digit) => {
    if (pin.length < 6) {
      setPin((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    // Replace this with real auth logic
    if (pin.length !== 6) {
      Alert.alert("Error", "PIN must be 6 digits");
      return;
    }
    if (pin === "123456") {
      // Alert.alert("Success", "Logged in!");
      navigation.navigate(Platform.OS == 'ios'? 'Student Reading': 'student/desktop')
    } else {
      Alert.alert("Error", "Invalid PIN");
    }
    setPin("");
  };

  const renderKey = (digit) => (
    <TouchableOpacity key={digit} style={styles.key} onPress={() => handleKeyPress(digit)}>
      <Text style={styles.keyText}>{digit}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter PIN</Text>
      <View style={styles.pinContainer}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.pinBox}>
            <View style={[styles.dot, pin.length > index ? styles.dotFilled : null]} />
          </View>
        ))}
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          {[1, 2, 3].map((digit) => renderKey(digit))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map((digit) => renderKey(digit))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map((digit) => renderKey(digit))}
        </View>
        <View style={styles.row}>
          {/* spacer */}
          <View style={styles.key} /> 
          {renderKey(0)}
          <TouchableOpacity style={styles.key} onPress={handleDelete}>
            <Text style={styles.keyText}>⌫</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.submitButton, pin.length !== 6 && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={pin.length !== 6}
      >
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  pinBox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // ensure it's not filled by default
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999",
  },
  dotFilled: {
    backgroundColor: "#000",
    borderWidth: 0,
  },
  keypad: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: 60,
    height: 60,
    margin: 5,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  keyText: { fontSize: 24 },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  submitText: { color: "#fff", fontSize: 18 },
});

export default StudentLogin;