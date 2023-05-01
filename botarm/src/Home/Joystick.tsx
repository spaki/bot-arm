import {  Pressable, View, Image } from 'react-native';
import { styles } from './Styles'

export function Joystick() {

    function upClick() {
    }

    function downClick() {
      
    }

    function leftClick() {
      
    }

    function rightClick() {
      
    }

    function frontClick() {
      
    }

    function backClick() {
      
    }

    function openClick() {
      
    }

    function holdClick() {
      
    }

    function defaultPositionClick() {
      
    }

    function automaticModeClick() {
      
    }

    function selectDeviceClick() {
      
    }

    return (
      <View style={styles.container}>
  
        <View style={styles.container}>
          <Pressable onPress={upClick} android_ripple={styles.pressed}>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.upArrow}
            />
          </Pressable>
          
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable onPress={leftClick} android_ripple={styles.pressed}>
                <Image
                  source={require('../../assets/arrow.png')}
                  style={styles.leftArrow}
                />
            </Pressable>
            <Pressable onPress={rightClick} android_ripple={styles.pressed}>
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.rightArrow}
              />
            </Pressable>
          </View>
          
          <Pressable onPress={downClick} android_ripple={styles.pressed}>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.downArrow}
            />
          </Pressable>
        </View>
        
        <View style={styles.container}>
          <Pressable onPress={frontClick} android_ripple={styles.pressed}>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.upArrow}
            />
          </Pressable>
          
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable onPress={holdClick} android_ripple={styles.pressed}>
                <Image
                  source={require('../../assets/closed-hand.png')}
                  style={styles.buttonIcon}
                />
            </Pressable>
            <Pressable onPress={openClick} android_ripple={styles.pressed}>
              <Image
                source={require('../../assets/opened-hand.png')}
                style={styles.buttonIcon}
              />
            </Pressable>
          </View>
          
          <Pressable onPress={backClick} android_ripple={styles.pressed}>
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.downArrow}
            />
          </Pressable>
        </View>
  
        <View style={styles.container}>
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable onPress={defaultPositionClick} android_ripple={styles.pressed}>
                <Image
                  source={require('../../assets/default.png')}
                  style={styles.buttonIcon}
                />
            </Pressable>
            <Pressable onPress={automaticModeClick} android_ripple={styles.pressed}>
              <Image
                source={require('../../assets/automatic.png')}
                style={styles.buttonIcon}
              />
            </Pressable>
            <Pressable onPress={selectDeviceClick} android_ripple={styles.pressed}>
              <Image
                source={require('../../assets/switch.png')}
                style={styles.buttonIcon}
              />
            </Pressable>
          </View>
          
        </View>
      </View>
    );
  }