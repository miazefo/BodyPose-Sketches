#include <Wire.h>
#include <MPR121.h>
#define numElectrodes 12

//Adafruit_MPR121 cap = Adafruit_MPR121();

void setup() {
  Serial.begin(9600);
  Wire.begin();
  
  MPR121.begin( 0x5A );
  MPR121.setInterruptPin( 4 );
  MPR121.setTouchThreshold( 40 );
  MPR121.setReleaseThreshold( 20 );
}

void loop() {
  MPR121.updateTouchData();
  MPR121.updateFilteredData();
  Serial.println(MPR121.getFilteredData(2)); 
  Serial.println(MPR121.getFilteredData(8));
  Serial.println(MPR121.getFilteredData(11));
 delay(100);
}
