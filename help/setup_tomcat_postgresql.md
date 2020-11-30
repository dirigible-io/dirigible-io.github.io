---
layout: help
title: Tomcat with PostgreSQL
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


Prerequisites
---

Download and unpack Apache Tomcat 8.0.x from [here](http://tomcat.apache.org/download-80.cgi).

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

#### Java
> JDK 11+

OpenJDK versions can be found [here](https://openjdk.java.net/projects/jdk/)

#### macOS

> brew install ttyd

#### Linux

> Linux support is built-in

More info about **ttyd** can be found at: [ttyd](https://github.com/tsl0922/ttyd)

PostgreSQL
---

Install *postgresql* on Linux (Debian-based) with:

> sudo apt-get update

> sudo apt-get install postgresql postgresql-contrib

Create Database
---

Create the default database for Eclipse Dirigible:

> sudo -i -u postgres

> createdb dirigible_database

Create System User for the Eclipse Dirigible Database
---

> psql dirigible_database

> create user dirigible_system with password 'dirigible1234';

> grant all on database dirigible_database to dirigible_system;

Datasource Configuration
---

1. Download the *postgresql* JDBC driver version 4.1 from [here](http://jdbc.postgresql.org/download.html).
2. Copy the **postgresql-*.jar** file to the *<TOMCAT_HOME>/lib* directory.

Set the Environment Variables
---

	export DIRIGIBLE_DATABASE_PROVIDER=custom
	export DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES=POSTGRES
	export DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT=POSTGRES
	export POSTGRES_DRIVER=org.postgresql.Driver
	export POSTGRES_URL=jdbc:postgresql://localhost:5432/dirigible_database
	export POSTGRES_USERNAME=dirigible_system
	export POSTGRES_PASSWORD=dirigible1234
	export DIRIGIBLE_SCHEDULER_DATABASE_DRIVER=org.postgresql.Driver
	export DIRIGIBLE_SCHEDULER_DATABASE_URL=jdbc:postgresql://localhost:5432/dirigible_database
	export DIRIGIBLE_SCHEDULER_DATABASE_USER=dirigible_system
	export DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD=dirigible1234
	export DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE=org.quartz.impl.jdbcjobstore.PostgreSQLDelegate
	export DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE=true
	export DIRIGIBLE_FLOWABLE_USE_DEFAULT_DATABASE=true
	export DIRIGIBLE_DATABASE_NAMES_CASE_SENSITIVE=true

Deploy
---

Copy the deployable artifact e.g. ROOT.war to *<TOMCAT_HOME>/webapps*.

Start
---

Run Tomcat server via *strtup.sh*. 

Go to the following locations: 

> [http://localhost:8080/](http://localhost:8080/)

