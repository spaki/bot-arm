import { useState } from "react";
import { Joystick } from "./Joystick";
import { DevicesList } from "./DevicesList";

export function Home() {
    const [selectedDevice, setSelectedDevice] = useState();

    return (<Joystick />);

    if(selectedDevice)
      return (<Joystick />);

    return (<DevicesList/>);
  }