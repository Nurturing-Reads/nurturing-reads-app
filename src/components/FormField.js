import React from "react";
import {View, Text, TextInput} from 'react-native';
import stylesheet from "../misc/stylesheet";

const FormField = ({fieldName, hint = "", value, valueHandler, secureInput = false}) => {
  return (
    <View>
      <Text style={stylesheet.fieldNameLabel}>{fieldName}</Text>
      <TextInput 
        style={stylesheet.textEntry}
        placeholder={hint}
        value={value}
        onChangeText={(val) => {
          valueHandler(val);
        }}
        secureTextEntry={secureInput}/>
    </View>
  );
};


export default FormField;