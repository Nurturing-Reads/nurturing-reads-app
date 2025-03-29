import React, {useState} from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { Table } from "../components/Table";
import { sampleData } from "../utils/sampleData";


const UserDashboardScreen = () => {
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

export default UserDashboardScreen;