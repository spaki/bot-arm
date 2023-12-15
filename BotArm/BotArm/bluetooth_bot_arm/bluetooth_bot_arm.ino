#include <SoftwareSerial.h> 
#include <Servo.h> 
 
const int bluetoothRX = 2; 
const int bluetoothTX = 3; 

SoftwareSerial bluetooth(bluetoothRX, bluetoothTX); 



const int pinMotorBase = 5; 
const int pinMotorClamp = 6; 
const int pinMotorArmUpDown = 9; 
const int pinMotorArmFrontBack = 10; 

const int minBase = 60;
const int maxBase = 150;

const int minClamp = 125;
const int maxClamp = 145;

const int minArmUpDown = 80;
const int maxArmUpDown = 110;

const int minArmFrontBack = 110;
const int maxArmFrontBack = 180;

Servo motorBase;
Servo motorClamp;
Servo motorArmUpDown;
Servo motorArmFrontBack;

int posMotorBase = minBase; 
int posMotorClamp = minClamp; 
int posMotorArmUpDown = minArmUpDown; 
int posMotorArmFrontBack = minArmFrontBack; 

int command = 0;

void setup()
{
  SetupSerial();
  SetupBluetooth();
  SetupMotors();
}
 
void loop()
{
  CheckAndExecuteCommand(); 
  delay(100);
}



void SetupSerial()
{
  Serial.begin(9600); 
}

void SetupBluetooth()
{
  bluetooth.begin(9600); 
}

void SetupMotors()
{
  // motorBase.write(100);
  // motorBase.attach(pinMotorBase);

  motorBase.write(posMotorBase);
  motorBase.attach(pinMotorBase);

  motorClamp.write(posMotorClamp);
  motorClamp.attach(pinMotorClamp);
  
  motorArmUpDown.write(posMotorArmUpDown);
  motorArmUpDown.attach(pinMotorArmUpDown);
  
  motorArmFrontBack.write(posMotorArmFrontBack);
  motorArmFrontBack.attach(pinMotorArmFrontBack);
}



void CheckAndExecuteCommand()
{
  String data = ReadDataFromSerial();
  ExecuteCommandFromSerial(data);

  data = "";
  
  data = ReadDataFromBluetooth();
  ExecuteBluetoothCommand(data);
}

void ExecuteCommandFromSerial(String data)
{
  if(data == NULL || data.length() < 1)  
  {
    return;
  }
  
  int degrees = data.toInt();
  
  Serial.println("");
  Serial.print("Received data: ");
  Serial.println(degrees);
  
  MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, degrees);
  
  Serial.println("Servo moved!");
  Serial.println("------------");
}

void ExecuteBluetoothCommand(String data)
{
  if(data == NULL || data.length() < 1)  
  {
    command = 0;
    return;
  }
  
  command = data.toInt();
  
  Serial.println("");
  Serial.print("Received data: ");
  Serial.println(data);
  Serial.print("Converted command: ");
  Serial.println(command);
  Serial.println("------------");

  RouteCommandData();
}

String ReadDataFromSerial() 
{
  String result;
  
  if(Serial.available()) 
  {
    result = Serial.readString(); 
    result.trim();
  }
      
  return result;
}

String ReadDataFromBluetooth() 
{
  String result;
  
  if(bluetooth.available()) 
  {
      result = bluetooth.readString(); 
      result.trim();
  }
  
  return result;
}

void RouteCommandData()
{
  int commandToExecute = command;
  command = 0; // reset to wait another command

  switch(commandToExecute)
  {
    case 1: // up
      MoveMotor(motorArmUpDown, &posMotorArmUpDown, -1, minArmUpDown, maxArmUpDown);
      break;  
    case 2: // down
      MoveMotor(motorArmUpDown, &posMotorArmUpDown, 1, minArmUpDown, maxArmUpDown);
      break;  
    case 3: // right
      MoveMotor(motorBase, &posMotorBase, -1, minBase, maxBase);
      break;  
    case 4: // left
      MoveMotor(motorBase, &posMotorBase, 1, minBase, maxBase);
      break;  
    case 5: // front
      MoveMotor(motorArmFrontBack, &posMotorArmFrontBack, -1, minArmFrontBack, maxArmFrontBack);
      break;
    case 6: // back
      MoveMotor(motorArmFrontBack, &posMotorArmFrontBack, 1, minArmFrontBack, maxArmFrontBack);
      break;
    case 7: // close hand
      MoveMotor(motorClamp, &posMotorClamp, 1, minClamp, maxClamp);
      break;
    case 8: // open hand
      MoveMotor(motorClamp, &posMotorClamp, -1, minClamp, maxClamp);
      break;
    case 9: // pause
      command = 9;
      break;
    case 10: // automatic
      StartAutomaticMoves();
      break;
    default:
      // do nothing (sometimes, the bluetooth command came concatenated, because of quick button press in the app... just ignore them)
      command = 0;
      break;
    break;
  }
}



void ResetSmothly()
{
  MoveMotorToTarget(motorBase, &posMotorBase, minBase); 
  MoveMotorToTarget(motorClamp, &posMotorClamp, minClamp); 
  MoveMotorToTarget(motorArmFrontBack, &posMotorArmFrontBack, minArmFrontBack);
  MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, minArmUpDown);
}

void StartAutomaticMoves()
{
  ResetSmothly();

  while (command == 0) // -> in case of a new command, it will interrupt to handle the new one
  {
    MoveMotorToTarget(motorBase, &posMotorBase, maxBase); // go right
    MoveMotorToTarget(motorClamp, &posMotorClamp, minClamp); // open hand
    MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, maxArmUpDown); // down
    MoveMotorToTarget(motorClamp, &posMotorClamp, maxClamp); // close hand    
    MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, minArmUpDown); // up
    MoveMotorToTarget(motorArmFrontBack, &posMotorArmFrontBack, maxArmFrontBack); // advance
    
    MoveMotorToTarget(motorBase, &posMotorBase, minBase); // go left
    MoveMotorToTarget(motorArmFrontBack, &posMotorArmFrontBack, minArmFrontBack); // go back
    MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, maxArmUpDown); // down
    MoveMotorToTarget(motorClamp, &posMotorClamp, minClamp); // open hand
    MoveMotorToTarget(motorArmUpDown, &posMotorArmUpDown, minArmUpDown); // up
  }
}

void MoveMotorToTarget(Servo motor, int* currentPosition, int target)
{
  int step = 1;
  int min = 0;
  int max = 180;
  
  if(target < *currentPosition)
  {
    step = -1;
    min = target;
  }
  else
  {
    max = target;
  }
    
  MoveMotor(motor, currentPosition, step, min, max);
}

void MoveMotor(Servo motor, int* currentPosition, int step, int min, int max)
{
  while (
    command == 0
    && *currentPosition <= max // -> motor limit
    && *currentPosition >= min // -> motor limit
  )
  {
    // Serial.print("Moving from ");
    // Serial.print(*currentPosition);
    // Serial.print(" , step ");
    // Serial.print(step);
    // Serial.print(" , min ");
    // Serial.print(min);
    // Serial.print(" , max ");
    // Serial.println(max);
    
    int newPos = *currentPosition + step;
    
    if(newPos < max && newPos > min)
    {
      *currentPosition += step;
      motor.write(*currentPosition);

      CheckAndExecuteCommand();
      delay(50);
    }
    else
    {
      CheckAndExecuteCommand();
      delay(50);

      break;
    }
  }
}