#! /bin/sh
sleep 10
node /home/pi/Desktop/EnvirosenseSensor/Server/server.js & 
sleep 7
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/motion.py &
/home/pi/Desktop/EnvirosenseSensor/libs/C/temphum