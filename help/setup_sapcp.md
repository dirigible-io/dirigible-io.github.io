---
layout: help
title: the Neo Environment
icon: none
group: help-setup
---

Setup in {{ page.title }}
===
Deploy Eclipse Dirigible in the Neo environment of [SAP Cloud Platform](https://account.hana.ondemand.com/) with the [Cloud SDK](https://tools.hana.ondemand.com/#cloud).

Prerequisites
---
You need to set up:

- SAP Cloud Platform [developer account](https://help.hana.ondemand.com/help/frameset.htm?65d74d39cb3a4bf8910cd36ec54d2b99.html)
- [SAP Cloud Platform SDK](https://tools.hana.ondemand.com/#cloud) for Tomcat 8
- [GIT](https://git-scm.com/)
- [Maven 3.0.x](http://maven.apache.org/docs/3.0.5/release-notes.html)

Steps
---
There are two ways to set up Eclipse Dirigible in the Neo environment of SAP Cloud Platform. You can either use console client commands or the SAP Cloud Platform Cockpit.

Using the Console Client
---
1. Download the latest All-In-One WAR file for SAP Cloud Platform from [http://download.eclipse.org/dirigible/](http://download.eclipse.org/dirigible/).
2. Go to the `neo-java-web-sdk-3.xxx/tools` SDK folder.
3. Deploy with the command:

        neo deploy --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --source <source_directory> --password <your_password> --runtime neo-java-web --runtime-version 3 -j 8

4. Start with the command:

        neo start --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --password <your_password> -y

5. Go to `https://account.hanatrial.ondemand.com/cockpit` and to the Authorizations section. Add Developer and Operator roles to your user to get full access to all features.

Using the SAP Cloud Platform Cockpit
---

 1. Download the latest "SAP All" WAR file for SAP Cloud Platform from [http://download.eclipse.org/dirigible/](http://download.eclipse.org/dirigible/)
 2. Go to https://account.hanatrial.ondemand.com/cockpit and sign in to your account.
 3. Go to **Applications** and then to **Java Applications**.
 4. Click on **Deploy Applications**. Find the "SAP All" WAR file for SAP Cloud Platform and deploy it.
 5. Click on the name of your application. Go to **Security** and to the **Roles** section.
 6. Add the *Developer* and *Operator* roles to your user account to get full access to all features. To do that, select the role, choose **Assign**, and type your User ID.
 7. Create a user in your associated database i.e. HANA DB, then go to Data Source Bindings and create the default connection.
 8. (re)-start the application to activate these changes.
