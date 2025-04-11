import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AudioControl from './AudioControl';
import { useNavigation } from '@react-navigation/native';
import { BrandLogoButton } from './BrandLogoButton';

export default function Header({ to_booklist, audioUrl }) {
  const nav = useNavigation();
  return (
    <View style={styles.navbar}>
      {/* Logo and Title */}
      <BrandLogoButton />

      {/* Navigation Icons */}
      <View style={styles.navContainer}>
        <AudioControl audioUrl={audioUrl} />
        
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../images/parents_corner.png')} style={styles.icon} />
          <Text style={styles.navText}>Parent's Corner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={to_booklist}>
          <Image source={require('../images/bookshelf.png')} style={styles.icon} />
          <Text style={styles.navText}>My Bookshelf</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../images/abstract-user.png')} style={styles.icon} />
          <Text style={styles.navText}>About Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  brandContainer: {
    alignItems: 'left'
  },
  nurturingReads: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  nurturingReadsText: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 220,
    height: 30,
    resizeMode: 'contain',
  },
  bookIcon: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
    marginLeft: 15,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  navText: {
    fontSize: 12,
  },
});
