# RADL-EnviroSense
Environmental monitoring system built for SAIT RAD Lab (SD Capstone 2015-2016)

This repository contains all the projects that were produced for the
EnviroSense system. There are also scripts for building a distribution package
and also for deploying the web and reelyactive components of the system.

### envirosense
This directory contains a gradle based java project. It is the web component of
the system. Any IDE that supports building projects with gradle can be used for
this project. The gradle build script has a task for deploying the built project
to a Glassfish (version 4.1.x) application server.

To deploy on Tomcat (version 8.x) instead of Glassfish, a bash script `scripts/tomcat_deploy.sh`
has been provided. This script requires the project WAR to be in the same
directory as the script itself.

This project requires JDK 1.8.x to build.

### EnvirosenseSensor
This directory contains all the programs that will gather data from sensors
attached to the RaspberryPis. It also contains a Node.JS based server that will
receive the gathered data and transmit that data to the web application via HTTP.

### reelyactive
This directory contains a Node.JS package for reading Bluetooth data from There
ReelyActive Hub and sending it to the web component of the system over an HTTP.

### database_scripts
This directory contains the SQL scripts for setting up a database for the system.
The web component of the application relies on a MySQL (version 5.7.x) database for its database
needs and so must be present for proper functioning of the application.

#### Building distribution package
To build the distribution package, simply execute `package.sh` located at the root
of this repository. This will produce a `dist.zip` containing the necessary artifacts
that can be used to deploy the web and reelyactive components. The built archive
will contain a script, `main_setup.sh`, that can be executed to setup the database,
deploy the web application (onto tomcat), and setup the reelyactive package.
