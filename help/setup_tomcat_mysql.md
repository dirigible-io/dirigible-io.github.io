---
layout: help
title: Tomcat with MySQL
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


Prerequisites
---

Download and unpack Apache Tomcat 8.0.x from [here](http://tomcat.apache.org/download-80.cgi).

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

#### macOS

> brew install ttyd

#### Linux

> Linux support is built-in

More info about **ttyd** can be found at: [ttyd](https://github.com/tsl0922/ttyd)

MySQL
---

Install *mysql* on Linux (Debian-based) with:

> sudo apt-get update

> sudo apt-get install mysql-server

> sudo mysql\_install\_db

> sudo /usr/bin/mysql\_secure\_installation

Create Database
---

Create the default database for Dirigible:

> sudo -i -u postgres

> createdb dirigible_database

Create System User for the Eclipse Dirigible Database
---

> mysql -u root -p

> CREATE DATABASE dirigible_database;

> CREATE USER 'dirigible_system'@'localhost' IDENTIFIED BY 'dirigible1234';

> GRANT ALL PRIVILEGES ON dirigible_database.* TO 'dirigible_system'@'localhost' WITH GRANT OPTION;

Datasource Configuration
---

1. Download the *mysql* JDBC driver version 5.1 from [here](http://dev.mysql.com/downloads/connector/j/).
2. Copy the **mysql-*.jar** file to the *<TOMCAT_HOME>/lib* directory.
3. Open the file *<TOMCAT_HOME>/conf/context.xml* and add the following within the context:

```xml
<Resource 
	name="jdbc/DefaultDB"
	auth="Container"
	type="javax.sql.DataSource"
	maxActive="100"
	maxIdle="30"
	maxWait="10000"
	username="dirigible_system"
	password="dirigible1234"
	driverClassName="com.mysql.jdbc.Driver"
	url="jdbc:mysql://localhost:3306/dirigible_database?useUnicode=true&amp;characterEncoding=UTF-8"
/>
```

web.xml
---

Make sure the initial parameter *jndiDefaultDataSource* is uncommented.

```xml
<init-param>
	<param-name>jndiDefaultDataSource</param-name>
	<param-value>java:comp/env/jdbc/DefaultDB</param-value>
</init-param>
```

Also, the initial parameter *jdbcAutoCommit* must be set to false (by default).

```xml
<init-param>
	<param-name>jdbcAutoCommit</param-name>
	<param-value>false</param-value>
</init-param>
```

The type of the datasource is 'jndi' instead of 'local'

```xml
<init-param>
	<param-name>defaultDataSourceType</param-name>
	<param-value>jndi</param-value>
</init-param>
```

Lastly, the resource reference for the datasource has to be uncommented.

```xml
<resource-ref>
	<res-ref-name>jdbc/DefaultDB</res-ref-name>
	<res-type>javax.sql.DataSource</res-type>
	<res-auth>Container</res-auth>
</resource-ref>
```

Deploy
---

Copy the deployable artifact e.g. ROOT.war to *<TOMCAT_HOME>/webapps*.

Start
---

Run Tomcat server via *strtup.sh*. 

Go to the following location: 

> [http://localhost:8080/](http://localhost:8080/)
