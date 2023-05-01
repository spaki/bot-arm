import { Text, View } from 'react-native';
import { styles } from './Styles'
import { Device } from '../Models/Device';
import { useState } from 'react';

export function DevicesList() {
  const [devices, setDevices] = useState(new Array<Device>());


  
    return (
      <View style={styles.container}>
        {devices.length === 0 && <Text>No devices found</Text>}
        {devices.map(device => {
          return (
            <div key={device.id}>
              <Text>{device.name}</Text>
            </div>
          )
        })}
      </View>
    );
  }