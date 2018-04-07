---
layout: help
title: Tomcat
icon: none
group: help-setup
---

Setup on {{ page.title }}
===



The Tomcat specific WAR files can be deployed on a [Tomcat](http://tomcat.apache.org/) web container. In this case the built-in Derby database is used.

More information about how to deploy on Tomcat can be found [here](http://tomcat.apache.org/tomcat-8.0-doc/appdev/deployment.html).

Steps
---

1. Download ROOT.war for Tomcat from [http://download.dirigible.io](http://download.dirigible.io).

2. Configure the Users store under $CATALINA_HOME/conf/tomcat-users.xml:

        <tomcat-users>
                <role rolename="Developer"/>
                <role rolename="Operator"/>
                <role rolename="Everyone"/>
                <user username="dirigible" password="dirigible" roles="Developer,Operator,Everyone"/>
        </tomcat-users>
        
3. Start the Tomcat server

4. Open a web browser and go to:

        http://localhost:8080/

5. Login with user dirigible and password dirigible.
