import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Table} from "../../components/Table";
import {sampleData} from "../../utils/sampleData";
import AddStudentPopup from "../AddStudentPopup";

// Screen placeholders
export const UserDashboardScreen = () => {
  const [studentData, setStudentData] = useState(sampleData);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{flex: 0.5, padding: 10}}>
      <View style={{flex: 0.5, flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
        <Text style={{flex: 1}}>Class List</Text>
        <TouchableOpacity 
          onPress={() => {
            setModalVisible(true)
          }}>
          <Text>Add Student</Text>
        </TouchableOpacity>
        <AddStudentPopup 
          controlVar={modalVisible}
          setControlVar={setModalVisible}/>
      </View>
      <Table 
        data={studentData}/>
    </View>
  );
};