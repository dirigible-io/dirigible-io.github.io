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

The Tomcat specific WAR files can be deployed on a [Tomcat](http://tomcat.apache.org/) web container. In this case the built-in Derby database is used.

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

#### macOS

> brew install ttyd

#### Linux

> Linux support is built-in

More info about **ttyd** can be found at: [ttyd](https://github.com/tsl0922/ttyd)

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
       
3. Start the Tomcat server

4. Open a web browser and go to:

	> [http://localhost:8080/](http://localhost:8080/)

5. Login with user dirigible and password dirigible.
