 #!/usr/bin/env python
#
# GrovePi Example for using the Grove PIR Motion Sensor (http://www.seeedstudio.com/wiki/Grove_-_PIR_Motion_Sensor)
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
# NOTE:
# 	There are also 2x potentiometers on the board for adjusting measuring distance and hold time
# 	Rotate the pot labelled "Delay time" clockwise to decrease the hold time (0.3s - 25s)
# 	Rotate the pot labelled "Distance" clockwise to decrease the measuring distance (10cm - 6m)
	
# 	There are multiple revisions of this board with different components for setting retriggerable/non-retriggerable.
# 	Revision 1.0 contains a switch and revision 1.2 contains a jumper hat.
# 	The 1.0 switch board is labelled with H,L - H=retriggerable, L=non-retriggerable.
# 	The 1.2 jumper board has a pin diagram printed on the back.
	
# 	retriggerable means the sensor will continue outputting high if motion was detected before the hold timer expires.
# 	non-retriggerable means the sensor will output high for the specified hold time only, then output low until motion is detected again.
# 	if there is constant motion detected, retriggerable will stay high for the duration and non-retriggerable will oscillate between high/low.

import time
import grovepi
import socket

s = socket.socket()
host = "127.0.0.1"
port = 8124

s.connect((host, port))

currentStateD2 = 0
noMotionCountD2 = 0
currentStateD3 = 0
noMotionCountD3 = 0
currentStateD4 = 0
noMotionCountD4 = 0

while True:
	# SIG,NC,VCC,GND
	motion=0
	grovepi.pinMode(2,"INPUT")

    #Reads from D2
	try:    
		# Sense motion, usually human, within the target range
		motion=grovepi.digitalRead(2)
		cTime = time.strftime("%H %M %S %d %m %Y")
		if motion == 1:
			noMotionCountD2 = 0	
			if currentStateD2 != 1:
				currentStateD2 = 1
				s.send("D2 motion true " + cTime)
		elif motion==0:
			noMotionCountD2 += 1
			if currentStateD2!=0 and noMotionCountD2 > 5:
				currentStateD2 = 0
				s.send("D2 motion false " + cTime)	        
	except IOError:
		print ("")
		
	# SIG,NC,VCC,GND
	motion=0
	grovepi.pinMode(3,"INPUT")

    #Reads from D3
	try:    
		# Sense motion, usually human, within the target range
		motion=grovepi.digitalRead(3)
		cTime = time.strftime("%H %M %S %d %m %Y")
		if motion == 1:
			noMotionCountD3 = 0	
			if currentStateD3 != 1:
				currentStateD3 = 1
				s.send("D3 motion true " + cTime)
		elif motion==0:
			noMotionCountD3 += 1
			if currentStateD3!=0 and noMotionCountD3 > 5:
				currentStateD3 = 0
				s.send("D3 motion false " + cTime)	        
	except IOError:
		print ("")
		
	
	# SIG,NC,VCC,GND
	motion=0
	grovepi.pinMode(4,"INPUT")

    #Reads from D4
	try:    
		# Sense motion, usually human, within the target range
		motion=grovepi.digitalRead(4)
		cTime = time.strftime("%H %M %S %d %m %Y")
		if motion == 1:
			noMotionCountD4 = 0	
			if currentStateD4 != 1:
				currentStateD4 = 1
				s.send("D4 motion true " + cTime)
		elif motion==0:
			noMotionCountD4 += 1
			if currentStateD4!=0 and noMotionCountD4 > 5:
				currentStateD4 = 0
				s.send("D4 motion false " + cTime)	        
	except IOError:
		print ("")
		
		
	time.sleep (0.5)
    
s.close()