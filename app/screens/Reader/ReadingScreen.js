import React, { useState } from "react";
import {View, Text, StyleSheet} from 'react-native';
import storyData from "../../../database/story001/story_section_question_clean.json";

export const ReadingScreen = ({storyData = storyData.sections}) => {
  const [story, setStory] = useState(storyData.sections);
  const [currentSection, setCurrentSection] = useState(0);
  
  
  
  return (
    <View>
      <Text onPress={() => console.log(story)}>Reading Screen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  
})