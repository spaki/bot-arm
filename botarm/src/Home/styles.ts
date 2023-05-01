import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    pressed: {
      color: 'rgba(255, 255, 10, 0.8)',
      borderless: true
    }
  });