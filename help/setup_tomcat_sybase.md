---
layout: help
title: Tomcat with Sybase ASE
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


Tomcat
---

Download and unpack Apache Tomcat 8.0.x from [here](http://tomcat.apache.org/download-80.cgi).

Sybase ASE
---

How to setup a test environment on Amazon
---

### Select Image Size:

	t2.medium

### Security Group:

	TCP Custom, 5000

### Download Sybase ASE Express

       https://www.sap.com/cmp/syb/crm-xu15-int-asexprdm/index.html
       
### Transfer:

	> scp -i dirigible-aws.pem ASE_Suite.linuxamd64.tgz ec2-user@<ip-address>:~
	> scp -i dirigible-aws.pem apache-tomcat-XXX.zip ec2-user@<ip-address>:~
	> scp -i dirigible-aws.pem ROOT.war ec2-user@<ip-address>:~
	> scp -i dirigible-aws.pem jdk-8u144-linux-x64.tar.gz ec2-user@<ip-address>:~

### Prepare OS:

	> sudo mkdir -p /opt/sybase
	> sudo mkdir -p /var/sybase
	> sudo groupadd sybase
	> sudo useradd -g sybase -d /opt/sybase sybase
	> sudo passwd sybase
	> sudo chown sybase:sybase /opt/sybase
	> sudo chown sybase:sybase /var/sybase
	
### Login:

	> ssh ec2-user@<ip-address> -i dirigible-aws.pem

### Setup:

	> su - sybase
	> mkdir install
	> cd install
	> cp /home/ec2-user/ASE_Suite.linuxamd64.tgz .
	> tar -xvf ASE_Suite.linuxamd64.tgz
	> ./setup.bin -i console

### Parameters:

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

### Show Servers:

	> /opt/sybase/ASE-16_0/install/showserver

### Prepare Test Environment:

	> cd /opt/sybase/install
	> cp /home/ec2-user/apache-tomcat-XXX.zip .
	> cp /home/ec2-user/jdk-8u144-linux-x64.tar.gz .
	> unzip apache-tomcat-XXX.zip
	> tar -xvf jdk-8u144-linux-x64.tar.gz
	> export JAVA_HOME=/opt/sybase/install/jdk1.8.0_144

### Add the provided JDBC driver to the lib folder:

	> cp /opt/sybase/shared/lib/jconn4.jar /home/ec2-user/apache-tomcat-XXX/lib

Useful actions in case of issues
---

### Start Server:
	> export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/sybase/OCS-16_0/lib3p64
	> export LANG=C
	> cd /opt/sybase/ASE-16_0/bin
	> ./startserver -f /opt/sybase/ASE-16_0/install/RUN_ASE160

### Stop Server:
	> cd /opt/sybase/OCS-16_0/bin
	> export LANG=C
	> ./isql -Usa -SASE160
	$> shutdown with nowait
	$> go

### Kill Hanging Requests:
	> cd /opt/sybase/OCS-16_0/bin
	> export LANG=C
	> ./isql -Usa -SASE160
	1> sp_who
	2> go
	1> kill spid

### Uninstall:
	> cd /opt/sybase/sybuninstall/ASESuite
	> ./uninstall -i console
	

Set the Environment Variables
---

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

Deploy
---

Copy the deployable artifact e.g. ROOT.war to *<TOMCAT_HOME>/webapps*.

	> cp /home/ec2-user/ROOT.war /home/ec2-user/apache-tomcat-XXX/webapps

Start
---

Run Tomcat server via *strtup.sh*. 

Go to the following locations: 

> http://<aws-host>:8080/

