import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


export const BookCard = ({book, handler = () => {}}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handler}>
      <Image 
        style={styles.image} 
        source={{uri: book.coverURL}}/>
      <View 
        style={styles.cardBody}>
        <Text style={styles.cardTitle}>{book.bookName}</Text>
      </View>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'white',
    margin: 5,
    alignItems: 'center',
    width: 250,
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

  