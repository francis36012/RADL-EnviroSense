#! /bin/bash
set -e
node /home/pi/Desktop/EnvirosenseSensor/Server/server.js & 
pid[0]=$!
sleep 5
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/motion.py &
pid[1]=$!
/home/pi/Desktop/EnvirosenseSensor/libs/C/temphum &
pid[2]=$!
trap "kill ${pid[0]} ${pid[1]} ${pid[2]}; exit 1" INT
wait