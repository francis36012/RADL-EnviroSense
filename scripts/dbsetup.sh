#!/bin/bash

dbuser=root
dbpass=password
scripts=(setup.sql tables.sql testusers.sql roomsAndSensors.sql data.sql events.sql)

check_files() {
	for script in ${scripts[@]} ; do
		printf "Checking %s " "$script"
		if [[ ! -f $script ]] ; then
			printf "\e[1;31m%s\e[m\e[0m\n" "NOT FOUND"
			exit -1
		else
			printf "\e[1;32m%s\e[m\e[0m\n" "OK"
		fi
	done
}
check_files
for script in ${scripts[@]} ; do
	mysql --user=$dbuser --password=$dbpass < $script
done
