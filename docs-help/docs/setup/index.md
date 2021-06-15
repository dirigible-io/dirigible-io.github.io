---
title: Tomcat
---

Setup in Tomcat
===



The Tomcat specific WAR files can be deployed on a [Apache Tomcat](http://tomcat.apache.org/) web container. In this case the built-in H2 database is used.

!!! Note
	[Download](https://tomcat.apache.org/download-80.cgi) the Tomcat binary. More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

## Prerequisites
---

- JDK 11 or later - OpenJDK versions can be found [here](https://adoptopenjdk.net/).

=== "macOS"

    > brew install ttyd

=== "Linux"

    Linux support is built-in.

    More info about ttyd can be found at: [ttyd](https://github.com/tsl0922/ttyd)

=== "Windows"

    You may experience certain functional limitations if you decide to run the Web IDE locally on Windows using Tomcat. In this case, we recommend that you perform the setup using Docker.

    See [Setup as a Docker Image](https://www.dirigible.io/help/setup_docker.html).

## Steps
---

1. Download `ROOT.war` for Tomcat from: [download.dirigible.io](http://download.dirigible.io)

1. Configure the Users store under `$CATALINA_HOME/conf/tomcat-users.xml`:

    ```xml
    <tomcat-users>
    	<role rolename="Developer"/>
    	<role rolename="Operator"/>
    	<role rolename="Everyone"/>
    	<user username="dirigible" password="dirigible" roles="Developer,Operator,Everyone"/>
    </tomcat-users>
    ```

1. Copy the Dirigible's `ROOT.war` to `$TOMCAT/webapps` folder.

1. Configure the target Database setup, if needed:

    === "Local (H2)"

        No additional setup is needed.

    === "PostgreSQL"

        1. Install postgresql on Linux (Debian-based) with:

            ```
            sudo apt-get update
            
            sudo apt-get install postgresql postgresql-contrib
            ```

        1. Create a default database for Eclipse Dirigible:

            ```
            sudo -i -u postgres
            
            createdb dirigible_database
            ```

        1. Create a system user for the Eclipse Dirigible database:

            ```
            psql dirigible_database
            
            create user dirigible_system with password 'dirigible1234';
            
            grant all on database dirigible_database to dirigible_system;
            ```

        1. Datasource configuration:

            - Download the postgresql JDBC driver version 4.1 from [here](http://jdbc.postgresql.org/download.html).
            - Copy the `postgresql-*.jar` file to the `<TOMCAT_HOME>/lib` directory.

        1. Set the environment variables:

            ```
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
            ```

    === "MySQL"

        1. Install mysql on Linux (Debian-based) with:

            ```
            sudo apt-get update

            sudo apt-get install mysql-server

            sudo mysql\_install\_db

            sudo /usr/bin/mysql\_secure\_installation
            ```

        1. Create the default database for Dirigible:

            ```
            sudo -i -u postgres

            createdb dirigible_database
            ```

        1. Create a system user for the Eclipse Dirigible database:
 
            ```
            mysql -u root -p

            CREATE DATABASE dirigible_database;

            CREATE USER 'dirigible_system'@'localhost' IDENTIFIED BY 'dirigible1234';

            GRANT ALL PRIVILEGES ON dirigible_database.* TO 'dirigible_system'@'localhost' WITH GRANT OPTION;
            ```

        1. Datasource configuration:
        - Download the `mysql` JDBC driver version 5.1 from [here](http://dev.mysql.com/downloads/connector/j/).
        - Copy the `mysql-*.jar` file to the `<TOMCAT_HOME>/lib` directory.
        - Open the file `<TOMCAT_HOME>/conf/context.xml` and add the following within the context:

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

            `web.xml` - make sure the initial parameter `jndiDefaultDataSource` is uncommented:

            ```xml hl_lines="2 3"
            <init-param>
	            <param-name>jndiDefaultDataSource</param-name>
	            <param-value>java:comp/env/jdbc/DefaultDB</param-value>
            </init-param>
            ```

            Also, the initial parameter `jdbcAutoCommit` must be set to false (by default).

            ```xml hl_lines="2 3"
            <init-param>
	            <param-name>jdbcAutoCommit</param-name>
	            <param-value>false</param-value>
            </init-param>
            ```

            The type of the datasource is `jndi` instead of `local`.

            ```xml hl_lines="2 3"
            <init-param>
	            <param-name>defaultDataSourceType</param-name>
	            <param-value>jndi</param-value>
            </init-param>
            ```

            Lastly, the resource reference for the datasource has to be uncommented.

            ```xml hl_lines="2-4"
            <resource-ref>
	            <res-ref-name>jdbc/DefaultDB</res-ref-name>
	            <res-type>javax.sql.DataSource</res-type>
	            <res-auth>Container</res-auth>
            </resource-ref>
            ```

    === "HANA"

        1. Install [HANA Express](https://www.sap.com/developer/topics/sap-hana-express.html).
        1. Set the environment variables:
            ```
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
            ```

        Remember to replace the **`<host>`**, **`<port>`**, **`<user>`**, **`<password>`** placeholders.

    === "Sybase ASE"

        1. How to setup a test environment on Amazon:

         - Select Image Size: **`t2.medium`**
         - Security Group: **`TCP Custom, 5000`**

        1. Download Sybase ASE Express from [here](https://www.sap.com/cmp/syb/crm-xu15-int-asexprdm/index.html).
        1. Transfer:

            ```
            scp -i dirigible-aws.pem ASE_Suite.linuxamd64.tgz ec2-user@<ip-address>:~
            scp -i dirigible-aws.pem apache-tomcat-XXX.zip ec2-user@<ip-address>:~
            scp -i dirigible-aws.pem ROOT.war ec2-user@<ip-address>:~
            scp -i dirigible-aws.pem jdk-8u144-linux-x64.tar.gz ec2-user@<ip-address>:~
            ```

        1. Prepare OS:

              ```
              sudo mkdir -p /opt/sybase
              sudo mkdir -p /var/sybase
              sudo groupadd sybase
              sudo useradd -g sybase -d /opt/sybase sybase
              sudo passwd sybase
              sudo chown sybase:sybase /opt/sybase
              sudo chown sybase:sybase /var/sybase
              ```
	
        1. Login:

            ```
            ssh ec2-user@<ip-address> -i dirigible-aws.pem
            ```

        1. Setup:

            ```
            su - sybase
            mkdir install
            cd install
            cp /home/ec2-user/ASE_Suite.linuxamd64.tgz .
            tar -xvf ASE_Suite.linuxamd64.tgz
            ./setup.bin -i console
            ```

        1. Parameters:

            ```
            Choose Install Folder -> use: /opt/sybase
            Choose Install Set -> 1- Typical
            Software License Type Selection -> 2- Install Express Edition of SAP Adaptive Server Enterprise
            End-user License Agreement -> 1) All regions
            Configure New Servers -> [X] 1 -  Configure new SAP ASE
            Configure Servers with Different User Account -> 2- No
            SAP ASE Name                                  ASE160
            System Administrator's Password               ******
            Enable SAP ASE for SAP ASE Cockpit monitoring false
            Technical user                                tech_user
            Technical user password                       ********
            Host Name                                     ip-<internal-ip-address>.eu-central-1.comp
            Port Number                                   5000
            Application Type                              Mixed (OLTP/DSS)
            Create sample databases                       false
            Page Size                                     4k
            Error Log                                     /opt/sybase/ASE-16_0/install/ASE1
            Default Language                              <use default>
            Default Character Set                         <use default>
            Default Sort Order                            <use default>
            Master Device                                 /opt/sybase/data/master.dat
            Master Device Size (MB)                       500
            Master Database Size (MB)                     250
            System Procedure Device                       /opt/sybase/data/sysprocs.dat
            System Procedure Device Size (MB)             500
            System Procedure Database Size (MB)           500
            System Device                                 /opt/sybase/data/sybsysdb.dat
            System Device Size (MB)                       100
            System Database Size (MB)                     100
            Tempdb Device                                 /opt/sybase/data/tempdbdev.dat
            Tempdb Device Size (MB)                       1000
            Tempdb Database Size (MB)                     1000
            Enable PCI                                    false
            Optimize SAP ASE Configuration                false
            ```

        1. Show Servers:

            ```
            /opt/sybase/ASE-16_0/install/showserver
            ```

        1. Prepare Test Environment:

            ```
            cd /opt/sybase/install
            cp /home/ec2-user/apache-tomcat-XXX.zip .
            cp /home/ec2-user/jdk-8u144-linux-x64.tar.gz .
            unzip apache-tomcat-XXX.zip
            tar -xvf jdk-8u144-linux-x64.tar.gz
            export JAVA_HOME=/opt/sybase/install/jdk1.8.0_144
            ```

        1. Add the provided JDBC driver to the lib folder:

            ```
            cp /opt/sybase/shared/lib/jconn4.jar /home/ec2-user/apache-tomcat-XXX/lib
            ```

        1. Useful actions in case of issues:

            - Start Server:

                ```
                export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/sybase/OCS-16_0/lib3p64
                export LANG=C
                cd /opt/sybase/ASE-16_0/bin
                ./startserver -f /opt/sybase/ASE-16_0/install/RUN_ASE160
                ```

            - Stop Server:

                ```
                cd /opt/sybase/OCS-16_0/bin
                export LANG=C
                ./isql -Usa -SASE160
                shutdown with nowait
                go
                ```

            - Kill Hanging Requests:

                ```
                cd /opt/sybase/OCS-16_0/bin
                export LANG=C
                ./isql -Usa -SASE160
                sp_who
                go
                kill spid
                ```

            - Uninstall:

                ```
                cd /opt/sybase/sybuninstall/ASESuite
                ./uninstall -i console
                ```

        1. Set the environment variables

            ```
            export DIRIGIBLE_DATABASE_PROVIDER=custom
            export DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES=SYBASE
            export DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT=SYBASE
            export SYBASE_DRIVER=com.sybase.jdbc4.jdbc.SybDriver
            export SYBASE_URL=jdbc:sybase:Tds:<host>:<port>?ServiceName=<database>
            export SYBASE_USERNAME=<user>
            export SYBASE_PASSWORD=<password>
            export SYBASE_CONNECTION_PROPERTIES="DYNAMIC_PREPARE=true;SSL_TRUST_ALL_CERTS=true;JCONNECT_VERSION=0;ENABLE_SSL=true;"
            export DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE=false
            export DIRIGIBLE_SCHEDULER_DATABASE_DRIVER=com.sybase.jdbc4.jdbc.SybDriver
            export DIRIGIBLE_SCHEDULER_DATABASE_URL="jdbc:sybase:Tds:<host>:<port>?ServiceName=<database>&DYNAMIC_PREPARE=true&JCONNECT_VERSION=0&ENABLE_SSL=true&SSL_TRUST_ALL_CERTS=true"
            export DIRIGIBLE_SCHEDULER_DATABASE_USER=<user>
            export DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD=<password>
            export DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE=org.quartz.impl.jdbcjobstore.SybaseDelegate
            ```

        Remember to replace the **`<host>`**, **`<port>`**, **`<user>`**, **`<password>`** placeholders._


1. Start the Tomcat server.

1. Open a web browser and go to: [http://localhost:8080/](http://localhost:8080/)

1. Login with user **`dirigible`** and password **`dirigible`**.

---

## Manager App

In case you want to use Apache Tomcat's [Manager App](https://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html) 
to deploy the `ROOT.war` file, you have to increase the file size limit for upload (e.g. to 200MB):

`conf\server.xml`

```xml hl_lines="4"
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxPostSize="209715200" />
```

`webapps\manager\WEB-INF\web.xml`

```xml hl_lines="7 8"
<web-app>
  ...
  <servlet>
    ...
    <multipart-config>
      <file-size-threshold>0</file-size-threshold>
      <max-file-size>209715200</max-file-size>
      <max-request-size>209715200</max-request-size>
    </multipart-config>
    ...
  </servlet>
  ...
</web-app>
```
