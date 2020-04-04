---
layout: help
title: Tomcat with HANA
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


Tomcat
---

Download and unpack Apache Tomcat 8.0.x from [here](http://tomcat.apache.org/download-80.cgi).

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

#### macOS

> brew install ttyd

#### Linux

> Linux support is built-in

More info about **ttyd** can be found at: [ttyd](https://github.com/tsl0922/ttyd)

HANA
---

Install *HANA Express*:

	https://www.sap.com/developer/topics/sap-hana-express.html

Set the Environment Variables
---

	export DIRIGIBLE_DATABASE_PROVIDER=custom
	export DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES=HANA
	export DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT=HANA
	export HANA_DRIVER=com.sap.db.jdbc.Driver
	export HANA_URL=jdbc:sap://<host>:<port>
	export HANA_USERNAME=<user>
	export HANA_PASSWORD=<password>
	export DIRIGIBLE_SCHEDULER_DATABASE_DRIVER=com.sap.db.jdbc.Driver
	export DIRIGIBLE_SCHEDULER_DATABASE_URL=jdbc:sap://<host>:<port>
	export DIRIGIBLE_SCHEDULER_DATABASE_USER=<user>
	export DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD=<password>
	export DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE=false
	export DIRIGIBLE_FLOWABLE_USE_DEFAULT_DATABASE=false
	

Deploy
---

Copy the deployable artifact e.g. ROOT.war to *<TOMCAT_HOME>/webapps*.

Start
---

Run Tomcat server via *strtup.sh*. 

Go to the following locations:

> [http://localhost:8080/](http://localhost:8080/)

