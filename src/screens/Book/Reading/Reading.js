import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function Reading( {img_url, content, controls} ) {

  return (
    <View style={[styles.background, { backgroundImage: `url('${img_url}')` }]}> 
      {controls.prev}
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{content}</Text>
      </View>
      {controls.next}
    </View>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'contain',
    height: '100vh',
  },
  contentContainer: {
    position: 'absolute',
    bottom: '20%',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 100,
  },
  text: {
    color: 'black',
    backgroundColor: 'rgba(200, 200, 200, 0.80)',
    fontSize: 40,
    textAlign: 'center',
    padding: 20,
    borderRadius: 10,
  },
  button: {
    position: 'absolute',
    height: '60%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    left: 0,
  },
  rightButton: {
    right: 0,
  },
  arrow: {
    width: 80,
    height: 120,
  },
});
