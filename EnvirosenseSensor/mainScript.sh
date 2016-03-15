#! /bin/sh
sleep 10
node /home/pi/Desktop/EnvirosenseSensor/Server/APIserver.js & 
sleep 10
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/motion.py &
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/door.py &
/home/pi/Desktop/EnvirosenseSensor/libs/C/temphum