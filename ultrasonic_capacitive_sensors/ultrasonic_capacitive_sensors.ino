//capacitive sensor
#include <Wire.h>
#include <MPR121.h>
#define numElectrodes 12
//Adafruit_MPR121 cap = Adafruit_MPR121();


//ultrasonic sensor
#include <NewPing.h>
#define TRIGGER_PIN 5
#define ECHO_PIN 6
#define MAX_DISTANCE 100

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

void setup() {
  Serial.begin(115200);  //not sure capacitive sensor will work on this baud rate try it to see
  Wire.begin();

  MPR121.begin(0x5A);
  MPR121.setInterruptPin(4);
  MPR121.setTouchThreshold(40);
  MPR121.setReleaseThreshold(20);
}

void loop() {
  //update capacitive sensor
  MPR121.updateTouchData();
  MPR121.updateFilteredData();

  //print the capacitive sensor data
  Serial.print(MPR121.getFilteredData(2));
  Serial.print(",");  //split by ',' comma . This is important for how P5 splits the data up

  Serial.print(MPR121.getFilteredData(8));
  Serial.print(",");  //split by ',' comma

  Serial.print(MPR121.getFilteredData(11));
  Serial.print(",");  //split by ',' comma

//when sending ultrasonic data remove the "cm" and "Ping:" words and only send numbers. Its easier for P5 to receive 
  Serial.print(sonar.ping_cm());
  //Serial.print(",");  //split by ',' comma
  Serial.println("");  //newline marker this is important for how P5 receives the data
  delay(50); //small delay for control
}