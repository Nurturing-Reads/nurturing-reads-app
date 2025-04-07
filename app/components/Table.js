import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Table = ({ data }) => {
  // function for rendering list item
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", padding: 5, borderBottomWidth: 1, borderColor: "#eee" }}>
      {/* render each item */}
      <Text style={{ flex: 4 }}>{item.studentName}</Text>
      <Text style={{ flex: 2 }}>{item.yearGroup}</Text>
      <Text style={{ flex: 2 }}>{item.gender}</Text>

      {/* Remove Button */}
      <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
        <Ionicons name="remove-circle-outline" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", borderRadius: 8, margin: 20, padding: 10 }}>
      <View style={{ flexDirection: "row", paddingBottom: 10, borderBottomWidth: 2, borderColor: "#ccc" }}>
        <Text style={{ flex: 3, fontWeight: "bold" }}>Name</Text>
        <Text style={{ flex: 2, fontWeight: "bold" }}>Year Group</Text>
        <Text style={{ flex: 2, fontWeight: "bold" }}>Gender</Text>
        <Text style={{ flex: 1, fontWeight: "bold" }}>Edit</Text>
      </View>
      {/* Flat list of the data */}
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};