import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const MuteButton = () => {
  return (
    <TouchableOpacity
    onPress={() => setMuted(!muted)}
    style={{ padding: 10, position: "absolute", top: 60, right: 20, zIndex: 1 }}
  >
    <Ionicons
      name={muted ? "volume-mute" : "volume-high"}
      size={32}
      color="black"
    />
  </TouchableOpacity>
  )
}