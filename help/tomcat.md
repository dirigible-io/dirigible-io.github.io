---
layout: help
title: Tomcat
icon: fa-cogs
group: help-setup
---

Setup on Tomcat
===



The Tomcat specific WAR files can be deployed on [Tomcat](http://tomcat.apache.org/) web container. In this case the built-in Derby database is used.

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-7.0-doc/appdev/deployment.html).

##### Steps

1. Download `dirigible.war` for Tomcat from [http://download.dirigible.io](http://download.dirigible.io)

2. Configure Users store:

        <tomcat-users>
                <role rolename="Developer"/>
                <role rolename="Operator"/>
                <role rolename="Everyone"/>
                <user username="dirigible" password="dirigible" roles="Developer,Operator,Everyone"/>
        </tomcat-users>

4. Open a web browser and go to:

        http://localhost:8080/dirigible

4. Login with dirigible/dirigible.
