#! /bin/bash
set -e
node /home/pi/Desktop/EnvirosenseSensor/Server/APIserver.js & 
pid[0]=$!
sleep 15
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/motion.py &
pid[1]=$!
/home/pi/Desktop/EnvirosenseSensor/libs/C/temphum &
pid[2]=$!
python /home/pi/Desktop/EnvirosenseSensor/libs/Python/door.py &
pid[3]=$!
trap "kill ${pid[0]} ${pid[1]} ${pid[2]} ${pid[3]}; exit 1" INT
wait