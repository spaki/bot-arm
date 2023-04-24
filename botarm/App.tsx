import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  Pressable, StyleSheet, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

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
      </View>
      
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
                source={require('./assets/closed-hand.png')}
                style={styles.buttonIcon}
              />
          </Pressable>
          <Pressable >
            <Image
              source={require('./assets/opened-hand.png')}
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
        
        <Pressable >
          <Image
            source={require('./assets/arrow.png')}
            style={styles.downArrow}
          />
        </Pressable>
      </View>

      <View style={styles.container}>
        <View style={{flexDirection: 'row', columnGap: 64}}>
          <Pressable >
              <Image
                source={require('./assets/default.png')}
                style={styles.buttonIcon}
              />
          </Pressable>
          <Pressable >
            <Image
              source={require('./assets/automatic.png')}
              style={styles.buttonIcon}
            />
          </Pressable>
          <Pressable >
            <Image
              source={require('./assets/switch.png')}
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
        
      </View>
  
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
  buttonIcon: {
    width: 64,
    height: 64,
  },
});
