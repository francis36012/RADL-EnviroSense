#!/bin/bash

# Set listener 1 to listen on port 80
# This will require starting glassfish as root
# Also we assume GLASSFISH_HOME is set
# $GLASSFISH_HOME/bin/asadmin set configs.config.server-config.network-config.network-listeners.network-listener.http-listener-1.port=80

APPNAME=envirosense
APPCTXT="/"
APPARCH=envirosense.war

if [[ ! -f $APPARCH ]] ; then
	printf "\e[1;31m%s\e[m\e[0m%s\n" "Error: " "$APPARCH: Web archive not found"
fi

$GLASSFISH_HOME/bin/asadmin deploy --contextroot $APPCTXT --name $APPNAME --force $APPARCH
