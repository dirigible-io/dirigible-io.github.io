---
title: Tomcat
---

Setup in Tomcat
===

Deploy Eclipse Dirigible in [Apache Tomcat](http://tomcat.apache.org/) web container. In this case the built-in H2 database is used.

::: info Prerequisites
- Download the Tomcat [binary](https://tomcat.apache.org/download-80.cgi). More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).
- JDK 11 or JDK 13 - OpenJDK versions can be found [here](https://adoptopenjdk.net/).


=== "macOS"
    Install `ttyd`:

    ```
    brew install ttyd
    ```

=== "Linux"
    Linux support is built-in. More info about ttyd can be found at: [ttyd](https://github.com/tsl0922/ttyd)

=== "Windows"
    You may experience certain functional limitations, if you decide to run the Web IDE locally on Windows using Tomcat:
    
    - Limitations related to the [Create symbolic links policy](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links). 
    - Some tests in local builds of Dirigible may fail on Windows due to the same policy restriction.

    You may grant your user account access to create symbolic links by editing the policy:
      
    - Go to _(WIN + R)_ > `gpedit.msc`
    - Navigate to: `Computer Configuration` -> `Windows Settings` -> `Security Settings` -> `Local Policies` -> `User Rights Assignment` -> `Create Symbolic links`.
    - Add your Windows user account to the policy.

    - _**Note**: Editing this policy may make your machine vulnerable to symbolic link attacks as noted [here](https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links#:~:text=Vulnerability,a%20DoS%20attack.)._

    Alternative of the `Windows` setup would be to follow the [Setup as a Docker Image](https://www.dirigible.io/help/setup_docker.html).

    Some parts of Dirigible are sensitive to line endings, and assume Unix-style newlines.  Git on Windows may attempt to switch files to use a Windows-style CR/LF endings, which will cause problems when building and running Dirigible on Windows.  In order to prevent this, git should be instructed to preserve the line endings of files.

    - From a command prompt, type `git config core.autocrlf`.
    - If the result is not `false`, change it with `git config core.autocrlf false`.
:::
## Steps
---

1. Download `ROOT.war` for Tomcat from: [download.dirigible.io](http://download.dirigible.io)

    !!! Note
            For local test & development purposes, we recommend the **server-all** distribution.

1. Configure the Users store under `$CATALINA_HOME/conf/tomcat-users.xml`:

    ```xml
    &lt;tomcat-users&gt;
    	&lt;role rolename="Developer"/&gt;
    	&lt;role rolename="Operator"/&gt;
    	&lt;role rolename="Everyone"/&gt;
    	&lt;user username="dirigible" password="dirigible" roles="Developer,Operator,Everyone"/&gt;
    &lt;/tomcat-users&gt;
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
            - Copy the `postgresql-*.jar` file to the ``&lt;TOMCAT_HOME&gt;`/lib` directory.

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
        - Copy the `mysql-*.jar` file to the ``&lt;TOMCAT_HOME&gt;`/lib` directory.
        - Open the file ``&lt;TOMCAT_HOME&gt;`/conf/context.xml` and add the following within the context:

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
            &lt;init-param&gt;
	            &lt;param-name&gt;jndiDefaultDataSource&lt;/param-name&gt;
	            &lt;param-value&gt;java:comp/env/jdbc/DefaultDB&lt;/param-value&gt;
            &lt;/init-param&gt;
            ```

            Also, the initial parameter `jdbcAutoCommit` must be set to false (by default).

            ```xml hl_lines="2 3"
            &lt;init-param&gt;
	            &lt;param-name&gt;jdbcAutoCommit&lt;/param-name&gt;
	            &lt;param-value&gt;false&lt;/param-value&gt;
            &lt;/init-param&gt;
            ```

            The type of the datasource is `jndi` instead of `local`.

            ```xml hl_lines="2 3"
            &lt;init-param&gt;
	            &lt;param-name&gt;defaultDataSourceType&lt;/param-name&gt;
	            &lt;param-value&gt;jndi&lt;/param-value&gt;
            &lt;/init-param&gt;
            ```

            Lastly, the resource reference for the datasource has to be uncommented.

            ```xml hl_lines="2-4"
            &lt;resource-ref&gt;
	            &lt;res-ref-name&gt;jdbc/DefaultDB&lt;/res-ref-name&gt;
	            &lt;res-type&gt;javax.sql.DataSource&lt;/res-type&gt;
	            &lt;res-auth&gt;Container&lt;/res-auth&gt;
            &lt;/resource-ref&gt;
            ```

    === "HANA"

        1. Install [HANA Express](https://www.sap.com/developer/topics/sap-hana-express.html).
        1. Set the environment variables:
            ```
            export DIRIGIBLE_DATABASE_PROVIDER=custom
            export DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES=HANA
            export DIRIGIBLE_DATABASE_DATASOURCE_NAME_DEFAULT=HANA
            export HANA_DRIVER=com.sap.db.jdbc.Driver
            export HANA_URL=jdbc:sap://&lt;host&gt;:&lt;port&gt;
            export HANA_USERNAME=&lt;user&gt;
            export HANA_PASSWORD=&lt;password&gt;
            export DIRIGIBLE_SCHEDULER_DATABASE_DRIVER=com.sap.db.jdbc.Driver
            export DIRIGIBLE_SCHEDULER_DATABASE_URL=jdbc:sap://&lt;host&gt;:&lt;port&gt;
            export DIRIGIBLE_SCHEDULER_DATABASE_USER=&lt;user&gt;
            export DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD=&lt;password&gt;
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
            scp -i dirigible-aws.pem ASE_Suite.linuxamd64.tgz ec2-user@&lt;ip-address&gt;:~
            scp -i dirigible-aws.pem apache-tomcat-XXX.zip ec2-user@&lt;ip-address&gt;:~
            scp -i dirigible-aws.pem ROOT.war ec2-user@&lt;ip-address&gt;:~
            scp -i dirigible-aws.pem jdk-8u144-linux-x64.tar.gz ec2-user@&lt;ip-address&gt;:~
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
            ssh ec2-user@&lt;ip-address&gt; -i dirigible-aws.pem
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
            Host Name                                     ip-&lt;internal-ip-address&gt;.eu-central-1.comp
            Port Number                                   5000
            Application Type                              Mixed (OLTP/DSS)
            Create sample databases                       false
            Page Size                                     4k
            Error Log                                     /opt/sybase/ASE-16_0/install/ASE1
            Default Language                              &lt;use default&gt;
            Default Character Set                         &lt;use default&gt;
            Default Sort Order                            &lt;use default&gt;
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
            export SYBASE_URL=jdbc:sybase:Tds:&lt;host&gt;:&lt;port&gt;?ServiceName=&lt;database&gt;
            export SYBASE_USERNAME=&lt;user&gt;
            export SYBASE_PASSWORD=&lt;password&gt;
            export SYBASE_CONNECTION_PROPERTIES="DYNAMIC_PREPARE=true;SSL_TRUST_ALL_CERTS=true;JCONNECT_VERSION=0;ENABLE_SSL=true;"
            export DIRIGIBLE_MESSAGING_USE_DEFAULT_DATABASE=false
            export DIRIGIBLE_SCHEDULER_DATABASE_DRIVER=com.sybase.jdbc4.jdbc.SybDriver
            export DIRIGIBLE_SCHEDULER_DATABASE_URL="jdbc:sybase:Tds:&lt;host&gt;:&lt;port&gt;?ServiceName=&lt;database&gt;&DYNAMIC_PREPARE=true&JCONNECT_VERSION=0&ENABLE_SSL=true&SSL_TRUST_ALL_CERTS=true"
            export DIRIGIBLE_SCHEDULER_DATABASE_USER=&lt;user&gt;
            export DIRIGIBLE_SCHEDULER_DATABASE_PASSWORD=&lt;password&gt;
            export DIRIGIBLE_SCHEDULER_DATABASE_DELEGATE=org.quartz.impl.jdbcjobstore.SybaseDelegate
            ```

        Remember to replace the **`<host>`**, **`<port>`**, **`<user>`**, **`<password>`** placeholders._


1. Start the Tomcat server.

1. Open a web browser and go to: [http://localhost:8080/](http://localhost:8080/)

    !!! Note
        The default user name and password are **`dirigible/dirigible`**

---

## Manager App

In case you want to use Apache Tomcat's [Manager App](https://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html) 
to deploy the `ROOT.war` file, you have to increase the file size limit for upload (e.g. to 200MB):

`conf\server.xml`

```xml
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443"
           maxPostSize="209715200" />
```

`webapps\manager\WEB-INF\web.xml`

```xml
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
