import Choice from './Choice.js';
import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

import { AddressContext } from '../../../AddressContext.js';

const { height, width } = Dimensions.get('window');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function right_answer_selected(question, choiceStatus) {
  for (let i = 0; i <  question.options.length; i++) {
      if (question.options[i].flag && choiceStatus[i]) {
		return true;  
	  }
    }
   return false;
}

export default function Question( {img_url, question, choiceStatus, updateChoiceStatus, controls} ) {
	
  const backendAddress = useContext(AddressContext);
  const img_idx = getRandomInt(1, 7);
  img_url = backendAddress+"media/images/p"+img_idx+".png";
  if (right_answer_selected(question, choiceStatus)) {
	 img_url = backendAddress+"media/images/f1.png";
  }
	
	//~ console.log(choiceStatus)
  const listItems = question.options.map((choice, index) =>
    <li key={index}> 
      <Choice choice={choice.option} isRight={choice.flag}
        index={index} isChosen={choiceStatus[index]}
        setIsChosen={updateChoiceStatus}/> 
      </li>
  );

	
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Question time:</Text>
        <Text style={styles.question}>{question.question}</Text>
        <FlatList
          data={question.options}
          renderItem={({ item, index }) => (
            <Choice 
              choice={item.option} 
              isRight={item.flag} 
              index={index} 
              isChosen={choiceStatus[index]} 
              setIsChosen={updateChoiceStatus} 
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {controls.prev}
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: img_url }} style={styles.image} resizeMode="contain" />
        {controls.next}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  questionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  question: {
    fontSize: 40,
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  image: {
    width: width / 2,
    height: width / 2,
  },
});
