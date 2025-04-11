import React, { act, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Header } from "./Header";
import storyData from "../../../database/story001/story_section_question_clean.json";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { audioMap, imageMap } from "./dataMap";

export const Reader = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const bookPages = storyData.sections;
  const bookLength = bookPages.length;
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [sound, setSound] = useState();
  const [muted, setMuted] = useState(false);

  
  async function playSound(index) {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    const audioFile = audioMap[index];
    if (!audioFile) {
      console.warn("No audio file for index:", index);
      return;
    }
    if (muted) return;

    const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
    setSound(newSound);
    await newSound.playAsync();
  }
  useEffect(() => {
    playSound(index);
  }, [index]);

  const handlePageChange = (action) => {
    if (action === "next") {
      const currentSection = bookPages[index];
      if (currentSection.has_question) {
        if (!showQuestion) {
          setShowQuestion(true);
          return;
        }
        if (!questionAnswered) {
          Alert.alert("Please answer the question before continuing.");
          return;
        }
      }
      if (index < bookLength - 1) {
        setIndex(index + 1);
        setShowQuestion(false);
        setFeedback("");
        setQuestionAnswered(false);
      } else {
        Alert.alert("Congratulations!", "You have finished the book. Well Done!", [
          {
            text: 'OK', onPress: () => {
              navigation.goBack()
            }
          }
        ])
      }
    } else if (action == "prev") {
      if (index > 0) {
        setIndex(index - 1);
        setShowQuestion(false);
        setFeedback("");
        setQuestionAnswered(false);
      }
    } else {
      return;
    }
  };
  const handleAnswerSelect = (option) => {
    if (option.flag) {
      setFeedback("That's right!");
      setQuestionAnswered(true);
      Alert.alert("Brilliant", "You get 1 coin!", [
        { text: "Continue" },
      ]);
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{flex: 1, flexDirection: 'row',}}>
      <Header />
      <TouchableOpacity
                onPress={async () => {
                  setMuted(prev => {
                    if (!prev && sound) {
                      sound.stopAsync();
                      sound.unloadAsync();
                    }
                    return !prev;
                  });
                }}
        style={{ padding: 10, position: "absolute", top: 60, right: 20, zIndex: 1 }}
      >
        <Ionicons
          name={muted ? "volume-mute" : "volume-high"}
          size={32}
          color="black"
        />
      </TouchableOpacity>
      </View>
      
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingHorizontal: 10,
        }}
      >
        <Image
          source={imageMap[index]}
          style={{ resizeMode: "contain", height: "100%", width: "50%" }}
        />
        {showQuestion &&
          bookPages[index].has_question &&
          bookPages[index].questions.length > 0 && (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {bookPages[index].questions[0].question}
              </Text>
              {bookPages[index].questions[0].options.map((opt, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAnswerSelect(opt)}
                >
                  <Text style={styles.optionText}>{opt.option}</Text>
                </TouchableOpacity>
              ))}
              {feedback !== "" && (
                <Text style={{ marginTop: 10 }}>{feedback}</Text>
              )}
            </View>
          )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Arrow */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            handlePageChange("prev");
          }}
        >
          <Ionicons
            name={"arrow-back-circle-outline"}
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.storyText}>{bookPages[index].content}</Text>
        {/* Right Arrow */}
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => {
            handlePageChange("next");
          }}
        >
          <Ionicons
            name={"arrow-forward-circle-outline"}
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrowButton: {
    flex: 0.5,
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  storyText: {
    flex: 1,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "100%",
  },
  questionContainer: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    width: "100%",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  optionText: {
    fontSize: 18,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#eee",
    borderRadius: 5,
    marginVertical: 5,
  },
});
