#!/bin/bash

pkgdir=dist
dbscripts=(database_scripts/setup.sql database_scripts/tables.sql database_scripts/roomsAndSensors.sql database_scripts/testusers.sql database_scripts/data.sql database_scripts/events.sql)
wararch=(envirosense/build/libs/envirosense.war)

dbsetupscript=scripts/dbsetup.sh
glassfishSetupScript=scripts/glassfishSetup.sh
tomcatDeployScript=scripts/tomcat_deploy.sh
mainSetupScript=scripts/main_setup.sh

REELYACTIVE_INIT_SCRIPT=scripts/rabluetooth
REELYACTIVE_SETUP_SCRIPT=scripts/reelyactive_setup.sh
REELYACTIVE_DIR=reelyactive

if [[ ! -d $pkgdir ]] ; then
	mkdir -p $pkgdir
fi

check_files() {
	printf "Checking and copying database scripts\n"
	for dbscript in ${dbscripts[@]} ; do
		printf "Checking $dbscript ... "
		if [[ ! -f $dbscript ]] ; then
			printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
			exit -1
		else
			printf "\e[1;32m%s\e[m\n\e[0m" "OK"
			cp $dbscript $pkgdir
		fi
	done
	printf "\n"

	printf "Checking and copying web archive... "
	if [[ ! -f $wararch ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp $wararch $pkgdir
	fi
	printf "\n"

	printf "Checking and copying setup scripts\n"
	printf "Checking database setup script: $dbsetupscript... "
	if [[ ! -f $dbsetupscript ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp $dbsetupscript $pkgdir && chmod 755 $pkgdir/$(basename $dbsetupscript)
	fi

	printf "Checking glassfish setup script: $glassfishSetupScript... "
	if [[ ! -f $glassfishSetupScript ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp $glassfishSetupScript $pkgdir && chmod 755 $pkgdir/$(basename $glassfishSetupScript)
	fi

	printf "Checking tomcat deployment script: $tomcatDeployScript... "
	if [[ ! -f $tomcatDeployScript ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp $tomcatDeployScript $pkgdir && chmod 755 $pkgdir/$(basename $tomcatDeployScript)
	fi

	printf "Checking main setup script: $mainSetupScript... "
	if [[ ! -f $mainSetupScript ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp -v $mainSetupScript $pkgdir && chmod 755 $pkgdir/$(basename $mainSetupScript)
	fi
	printf "\n"

	# Reelyactive stuff
	printf "Checking reelyactive related files\n"
	printf "Checking source directory... "
	if [[ ! -d $REELYACTIVE_DIR ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp -rv $REELYACTIVE_DIR $pkgdir
	fi

	printf "Checking init script... "
	if [[ ! -f $REELYACTIVE_INIT_SCRIPT ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp -v $REELYACTIVE_INIT_SCRIPT $pkgdir && chmod 755 $pkgdir/$(basename $REELYACTIVE_INIT_SCRIPT)
	fi
	printf "Checking setup script... "
	if [[ ! -f $REELYACTIVE_SETUP_SCRIPT ]] ; then
		printf "\e[1;31m%s\e[m\n\n\e[0m" "NOT FOUND"
		exit -1
	else
		printf "\e[1;32m%s\e[m\n\e[0m" "OK"
		cp -v $REELYACTIVE_SETUP_SCRIPT $pkgdir && chmod 755 $pkgdir/$(basename $REELYACTIVE_SETUP_SCRIPT)
	fi
	printf "\n"
}
check_files
tar czvf $pkgdir.tar.gz $pkgdir
zip -r $pkgdir.zip $pkgdir
