import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { AddressContext } from '../../AddressContext.js';

export default function BookSelection({ book_list, setCurrBook }) {
  const backendAddress = useContext(AddressContext);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={() => setCurrBook(book_list[0].id)}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/story001story_cover_cropped.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Luna and Finn's Turn-Taking Lesson</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Celebrate Your Body.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Celebrate Your Body</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Roaring Mad Riley.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Roaring Mad Riley</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/My Friend Toothy.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>My Friend Toothy</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Celebrate Your Feelings.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Celebrate Your Feelings</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/The Snuggle Is Real.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>The Snuggle Is Real</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/ABCs of Kindness.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>ABCs of Kindness</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/The Wonder Of Thunder.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>The Wonder Of Thunder</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Walking Together.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Walking Together</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Birdsong.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Birdsong</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: backendAddress + "media/images/Empathy Is Your Superpower.png" }} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Empathy Is Your Superpower</Text>
          </View>
        </View>
      </View>
    </View>
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
    width: 300,
  },
  image: {
    width: 300,
    height: 450,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

	
