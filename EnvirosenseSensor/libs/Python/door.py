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

s = socket.socket()
host = "127.0.0.1"
port = 8124
s.connect((host, port))

countA0 = 0
currentStateA0 = 0
countA1 = 0
currentStateA1 = 0
countA2 = 0
currentStateA2 = 0

while True:
	# A0 Port.
	grovepi.pinMode(0,"INPUT")
	try:
		sensor_value = grovepi.analogRead(0)
		if sensor_value==0 or (sensor_value>800 and sensor_value<900):
            #0 Means opened
			if sensor_value==0: 
                #Write first state found
				if countA0==0:
					countA0 = 1
					currentStateA0 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")                   
					s.send("A0 door open " + cTime)
                    
				if currentStateA0 != sensor_value:
					currentStateA0 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A0 door open " + cTime)     
			# > 800 Means closed
			else: 
				sensor_value=1
                #Write first state found
				if countA0==0:
					countA0 = 1
					currentStateA0 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")                 
					s.send("A0 door closed " + cTime)
                    
				if currentStateA0 != sensor_value:
					currentStateA0 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")                      
					s.send("A0 door closed " + cTime)                               
	except IOError:
		print ("")
	time.sleep(.4)    
	# A1 Port.
	grovepi.pinMode(1,"INPUT")
	try:
		sensor_value = grovepi.analogRead(1)
        
		if sensor_value==0 or (sensor_value>800 and sensor_value<900):
            #0 Means opened
			if sensor_value==0: 
                #Write first state found
				if countA1==0:
					countA1 = 1
					currentStateA1 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					#s.send("A1 door open " + cTime)
					s.send("A1 door open " + cTime)                    
                    
				if currentStateA1 != sensor_value:
					currentStateA1 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A1 door open " + cTime)     
			# > 800 Means closed
			else: 
				sensor_value=1
                #Write first state found
				if countA1==0:
					countA1 = 1
					currentStateA1 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A1 door closed " + cTime)
                    
				if currentStateA1 != sensor_value:
					currentStateA1 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A1 door closed " + cTime)                               
	except IOError:
		print ("")
	time.sleep(.4)        
	# A2 Port.
	grovepi.pinMode(2,"INPUT")
	try:
		sensor_value = grovepi.analogRead(2)
        
		if sensor_value==0 or (sensor_value>800 and sensor_value<900):
            #0 Means opened
			if sensor_value==0: 
                #Write first state found
				if countA2==0:
					countA2 = 1
					currentStateA2 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A2 door open " + cTime)
                    
				if currentStateA2 != sensor_value:
					currentStateA2 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A2 door open " + cTime)     
			# > 800 Means closed
			else: 
				sensor_value=1
                #Write first state found
				if countA2==0:
					countA2 = 1
					currentStateA2 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A2 door closed " + cTime)
                    
				if currentStateA2 != sensor_value:
					currentStateA2 = sensor_value
					cTime = time.strftime("%H %M %S %d %m %Y")
					s.send("A2 door closed " + cTime)                               

	except IOError:
		print ("")
	time.sleep(.4)