import React from "react";
import { View, Text, Button, Modal } from "react-native";
import FormField from '../components/FormField';

const AddStudentPopup = ({ controlVar, setControlVar, datalist}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={controlVar}
      onRequestClose={() => setControlVar(false)}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: "80%",
            width: "90%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <Button title="close" onPress={() => setControlVar(false)} />
        </View>
      </View>
    </Modal>
  );
};

export default AddStudentPopup;
