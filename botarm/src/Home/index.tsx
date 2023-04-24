import {  Pressable, View, Image } from 'react-native';
import { styles } from './styles'

export function Home() {
    return (
      <View style={styles.container}>
  
        <View style={styles.container}>
          <Pressable >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.upArrow}
            />
          </Pressable>
          
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable >
                <Image
                  source={require('../../assets/arrow.png')}
                  style={styles.leftArrow}
                />
            </Pressable>
            <Pressable >
              <Image
                source={require('../../assets/arrow.png')}
                style={styles.rightArrow}
              />
            </Pressable>
          </View>
          
          <Pressable >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.downArrow}
            />
          </Pressable>
        </View>
        
        <View style={styles.container}>
          <Pressable >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.upArrow}
            />
          </Pressable>
          
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable >
                <Image
                  source={require('../../assets/closed-hand.png')}
                  style={styles.buttonIcon}
                />
            </Pressable>
            <Pressable >
              <Image
                source={require('../../assets/opened-hand.png')}
                style={styles.buttonIcon}
              />
            </Pressable>
          </View>
          
          <Pressable >
            <Image
              source={require('../../assets/arrow.png')}
              style={styles.downArrow}
            />
          </Pressable>
        </View>
  
        <View style={styles.container}>
          <View style={{flexDirection: 'row', columnGap: 64}}>
            <Pressable >
                <Image
                  source={require('../../assets/default.png')}
                  style={styles.buttonIcon}
                />
            </Pressable>
            <Pressable >
              <Image
                source={require('../../assets/automatic.png')}
                style={styles.buttonIcon}
              />
            </Pressable>
            <Pressable >
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