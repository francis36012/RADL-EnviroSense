#!/usr/bin/env python
#
# GrovePi Example for using the analog read command to read analog sensor values
#
# The GrovePi connects the Raspberry Pi and Grove sensors.  You can learn more about GrovePi here:  http://www.dexterindustries.com/GrovePi
#
# Have a question about this example?  Ask on the forums here:  http://www.dexterindustries.com/forum/?forum=grovepi
#
'''
## License
The MIT License (MIT)
GrovePi for the Raspberry Pi: an open source platform for connecting Grove Sensors to the Raspberry Pi.
Copyright (C) 2015  Dexter Industries
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
'''

import time
import grovepi
import socket

#Sensor connected to A0 Port 
sensor = 14		# Pin 14 is A0 Port.
grovepi.pinMode(sensor,"INPUT")

s = socket.socket()
host = "127.0.0.1"
port = 8124
s.connect((host, port))

count = 0
currentState = 0

while True:
	try:
		sensor_value = grovepi.analogRead(sensor)
        
		if sensor_value==0 or sensor_value>800:
            #Means opened
			if sensor_value==0: 
                #Write first state found
				if count==0:
					count = 1
					currentState = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A0 door open " + cTime)
                    
				if currentState != sensor_value:
					currentState = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A0 door open " + cTime)     
			#Means closed
			else: 
				sensor_value=1
                #Write first state found
				if count==0:
					count = 1
					currentState = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A0 door closed " + cTime)
                    
				if currentState != sensor_value:
					currentState = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A0 door closed " + cTime)  
                
                
		#cTime = time.strftime("%H %M %S %d %m %Y")
		#s.send("A0 door true " + cTime)
		#print("sensor_value =", sensor_value)
		time.sleep(.5)

	except IOError:
		print ("")