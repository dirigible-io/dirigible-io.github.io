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

###web.xml###
Be sure the initial parameter *jndiDefaultDataSource* is uncommented
<pre><code>
    < init-param>
        < param-name>jndiDefaultDataSource< /param-name>
        < param-value>java:comp/env/jdbc/DefaultDB< /param-value>
    < /init-param>
</code></pre>

Also, initial parameter *jdbcAutoCommit* must be set to true

<pre><code>
    < init-param>
        < param-name>jdbcAutoCommit< /param-name>
        < param-value>true< /param-value>
    < /init-param>
</code></pre>

Lastly, the resource reference for the datasource have to be uncommented too

<pre><code>
    < resource-ref>
        < res-ref-name>jdbc/DefaultDB< /res-ref-name>
        < res-type>javax.sql.DataSource< /res-type>
        < res-auth>Container< /res-auth>
    < /resource-ref>
</code></pre>

###Deploy###

Copy the deployable artifact e.g. `dirigible.war` to *<TOMCAT_HOME>/webapps*.

###Start###

Run Tomcat server via *strtup.sh*. 

The IDE should be available at the following locations: 

* `http://localhost:8080/dirigible/services/index.html` IDE
* `http://localhost:8080/dirigible/services/ui/index.html` Registry

