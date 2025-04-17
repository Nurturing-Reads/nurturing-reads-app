import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Type config 
type EntryButtonProps = {
  title?: string;
  handler?: () => void;
}

export const EntryButton: React.FC<EntryButtonProps> = ({ title, handler }) => {
  return <TouchableOpacity onPress={handler} style={styles.button}>
    <Ionicons name={title == "Student"? 'book-outline' :'people-outline' } size={50} color={'white'}/>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200, width: 200,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
    margin: 20,
  },
  buttonText: {
    marginTop: 10, 
    fontSize: 30, 
    color: 'white'
  },
})