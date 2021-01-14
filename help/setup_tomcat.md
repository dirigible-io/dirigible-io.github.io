---
layout: help
title: Tomcat
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


Prerequisites
---

The Tomcat specific WAR files can be deployed on a [Apache Tomcat](http://tomcat.apache.org/) web container. In this case the built-in H2 database is used.

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

#### Java
> JDK 11+

OpenJDK versions can be found [here](https://openjdk.java.net/projects/jdk/)

#### macOS

> brew install ttyd

#### Linux

> Linux support is built-in

More info about **ttyd** can be found at: [ttyd](https://github.com/tsl0922/ttyd)

#### Windows

You may experience certain functional limitations if you decide to run the Web IDE locally on Windows using Tomcat. In this case, we recommend that you perform the setup using Docker. See [Setup as a Docker Image](https://www.dirigible.io/help/setup_docker.html).

Steps
---

1. Download ROOT.war for Tomcat from [https://download.eclipse.org/dirigible](https://download.eclipse.org/dirigible).

2. Configure the Users store under $CATALINA_HOME/conf/tomcat-users.xml:

```xml
<tomcat-users>
	<role rolename="Developer"/>
	<role rolename="Operator"/>
	<role rolename="Everyone"/>
	<user username="dirigible" password="dirigible" roles="Developer,Operator,Everyone"/>
</tomcat-users>
```

3. Copy the Dirigible's ROOT.war to $TOMCAT/webapps folder.
       
4. Start the Tomcat server

5. Open a web browser and go to:

	> [http://localhost:8080/](http://localhost:8080/)

6. Login with user dirigible and password dirigible.

---

#### Manager App

In case you want to use Apache Tomcat's [Manager App](https://tomcat.apache.org/tomcat-8.5-doc/manager-howto.html) 
to deploy the ROOT.war file, you have to increase the file size limit for upload (e.g. to 200MB):

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
