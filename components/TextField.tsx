import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";


export const TextInputField: React.FC<{
  fieldName: string;
  value?: any;
  onChange?: (text: string) => void;
  hint?: string;
  enableSecureInput?: boolean;
}> = ({fieldName, value, onChange = () => {}, hint, enableSecureInput = false}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <TextInput 
        placeholder={hint} 
        placeholderTextColor="#888"
        value={value} 
        onChangeText={onChange} 
        secureTextEntry={enableSecureInput}
        style={styles.textInput}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start', 
    justifyContent: 'center',
    flexDirection: 'column',
    width: "100%",
    padding: 20
  },
  fieldName: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20, 
  },
  textInput: {
    borderColor: '#EAEAEA',
    backgroundColor: '#EAEAEA',
    borderRadius: 5, 
    height: 40,
    borderWidth: 1, 
    borderStyle: 'solid', 
    width: "100%",
    paddingRight: 10,
    paddingLeft: 10, 
    
  },
})