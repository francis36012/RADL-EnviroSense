#!/bin/bash

REELYACTIVE_INIT_SCRIPT=rabluetooth
REELYACTIVE_DIR=reelyactive
REELYACTIVE_JS="reelyactive.js"
NODE_BIN=/usr/bin/nodejs

if [[ ! -d  $REELYACTIVE_DIR ]] ; then
	printf "Error: $REELYACTIVE_DIR not found\n"
	printf "Aborting...\n"
	exit -1
fi

CURR_DIR=`pwd`
cp -rv $REELYACTIVE_DIR /home/envirosense

# Go into the reelactive directory and install dependencies
cd /home/envirosense/$REELYACTIVE_DIR
npm install

$NODE_BIN $REELYACTIVE_JS &
# Go back to our starting directory
cd $CURR_DIR

sudo cp -v $REELYACTIVE_INIT_SCRIPT /etc/init.d
sudo update-rc.d -f $REELYACTIVE_INIT_SCRIPT remove
sudo update-rc.d $REELYACTIVE_INIT_SCRIPT defaults
