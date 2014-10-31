---
layout: help
title: Tomcat with PostgreSQL
icon: fa-cogs
group: help-setup
---

Setup on Tomcat with PostgreSQL
===


###Tomcat###

Download and unpack Apache Tomcat 7.0.x from [here](http://tomcat.apache.org/download-70.cgi).

###PostgreSQL###

Install *postgresql* on Linux (Debian-based) with:

> sudo apt-get update

> sudo apt-get install postgresql postgresql-contrib

###Create Database###

Create the default database for Dirigible:

> sudo -i -u postgres

> createdb dirigible_database

###Create System User for Dirigible Database###

> psql dirigible_database

> create user dirigible_system with password 'dirigible1234';

> grant all on database dirigible_database to dirigible_system;

###Datasource Configuration###

1. Download the *postgresql* JDBC driver version 4.1 from [here](http://jdbc.postgresql.org/download.html).
2. Copy **postgresql-*.jar** file to the *<TOMCAT_HOME>/lib* directory.
3. Open the file *<TOMCAT_HOME>/conf/context.xml* and add the following within the context:

<pre><code>
    < Resource name="jdbc/DefaultDB" auth="Container"
          type="javax.sql.DataSource" driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://127.0.0.1:5432/dirigible_database"
          username="dirigible_system" password="dirigible1234" maxActive="20" maxIdle="10" maxWait="-1"/>
</code></pre>

###Deploy###

Copy the deployable artifacts to *<TOMCAT_HOME>/webapps*.

###Start###

Run Tomcat server via *strtup.sh*. 

The IDE should be available at the following locations: 

* *http://localhost:8080/com.sap.dirigible.ide-[version]/ide/index.html*
* *http://localhost:8080/dirigible-ide/ide/index.html* (in case you follow the best practices and have renamed the produced WAR files for the local Tomcat setup)

