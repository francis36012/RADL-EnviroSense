#!/bin/bash

# Change the value of warchive to match whatever the filename might be for the WAR
warchive=envirosense.war

# Check WAR exists
if [[ ! -f  $warchive ]] ; then
	printf "Error: $warchive: WAR not found\nAborting...\n"
	exit 1
fi

tomcatwebapps=$1
if [[ -d $CATALINA_HOME ]] ; then
	tomcatwebapps=$CATALINA_HOME/webapps
else
	if [[ ! -d $tomcatwebapps ]] ; then
		printf "If CATALINA_HOME home is not set, first argument of this script must be the webapps directory\n"
		printf "Error: No variable set for CATALINA_HOME\n"
		printf "Error: $1: Specified webapps directory does not exists\nAborting..."
		exit 1
	fi
fi

explodedarc=`echo $warchive | cut -f1 -d '.'`

sudo rm -rf $tomcatwebapps/$explodedarc
sudo cp -v $warchive $tomcatwebapps

printf "Stopping the tomcat server...\n"
sudo $tomcatwebapps/../bin/catalina.sh stop
printf "\n"

printf "Starting the tomcat server...\n"
sudo $tomcatwebapps/../bin/catalina.sh start
printf "\n"
