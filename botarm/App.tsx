import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Pressable, StyleSheet, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Pressable >
        <Image
          source={require('./assets/arrow.png')}
          style={styles.upArrow}
        />
      </Pressable>
      
      <View style={{flexDirection: 'row', columnGap: 64}}>
        <Pressable >
            <Image
              source={require('./assets/arrow.png')}
              style={styles.leftArrow}
            />
          </Pressable>
          <Pressable >
          <Image
            source={require('./assets/arrow.png')}
            style={styles.rightArrow}
          />
        </Pressable>
      </View>
      
      <Pressable >
        <Image
          source={require('./assets/arrow.png')}
          style={styles.downArrow}
        />
      </Pressable>
  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightArrow: {
    width: 64,
    height: 64,
  },
  leftArrow: {
    width: 64,
    height: 64,
    transform: [{rotate: '180deg'}],
  },
  downArrow: {
    width: 64,
    height: 64,
    transform: [{rotate: '90deg'}],
  },
  upArrow: {
    width: 64,
    height: 64,
    transform: [{rotate: '270deg'}],
  },
});
