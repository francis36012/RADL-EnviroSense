#!/bin/bash

#setupscripts=(./dbsetup.sh ./glassfishSetup.sh ./reelyactive_setup.sh)
setupscripts=(./dbsetup.sh ./tomcat_deploy.sh ./reelyactive_setup.sh)

check_sscripts() {
	for script in ${setupscripts[@]} ; do
		printf "Checking setup script: %s " "$script"
		if [[ ! -f $script ]] ; then
			printf "\e[1;31m%s\e[m\e[0m\n" "NOT FOUND"
			exit -1
		else
			printf "\e[1;32m%s\e[m\e[0m\n" "OK"
		fi
	done
}

check_sscripts
for sscript in ${setupscripts[@]} ; do
	. $sscript
done
