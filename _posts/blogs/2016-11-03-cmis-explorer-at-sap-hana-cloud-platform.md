---
title: Document Service Explorer at SAP HANA Cloud Platform
author: yordan.pavlov
---


Wondering, how you can easily manage the **SAP HANA Cloud Platform Document Service**, through the browser? Now this is possible, with the help of **Eclipse Dirigible** and the **CMIS Explorer** application.

## Overview

Wondering, how you can easily manage the **SAP HANA Cloud Platform** [Document Service](https://help.hana.ondemand.com/help/frameset.htm?e60b7e45bb57101487a881c7c5487778.html), through the browser? Now this is possible, with the help of **Eclipse Dirigible** and the **CMIS Explorer** application.

In this blog, you will see how to download, configure, deploy and run **Eclipse Dirigible** on the **SAP HANA Cloud Platform**. After that you will go through the steps of installing and running the **CMIS Explorer** application.

## Download Eclipse Dirigible

* Download the latest milestone/release, that can be found on [http://download.eclipse.org/dirigible/](http://download.eclipse.org/dirigible/).
	* At the time of the blog, the latest milestone was *M20161021-1818*
* From the selected release/milestone, navigate to the **HANA Cloud Platform** category and download the **sap/allinone/ROOT.war** file.

## Create a Document Repository

* Log-in into the SAP HANA Cloud Platform
* Under the **Repositories** section, open the **Document Repositories** tab
* Create a new document repository
* Please remember the values for the **Name** and the **Repository Key**, as we will need them latter

![Create a Document Repository](/img/posts/20161103-0/1-create-document-repository.png){: .img-responsive }

## Deploy Eclipse Dirigible

* Under the **Applications** section, open the **Java Applications** tab
* Click on the **Deploy Application** button
* Browse the **ROOT.war** file, that was downloaded
* For the application name, you can specify whatever you want (e.g. dirigible, doc, …)
* The runtime should be **Java Web Tomcat 8**
* For the **JVM Arguments** input, enter this:
			
			-DjndiCmisServiceName=<name> -DjndiCmisServiceKey=<key>

These are the magic settings, that will allow Eclipse Dirigible to connect and use the document repository. List of all available environment variables can be found [here](www.dirigible.io/help/setup_env_vars.html).

Finally, the **Deploy Application** wizard should look something like this:

![Deploy Application](/img/posts/20161103-0/2-deploy-application.png){: .img-responsive }

**Wait till the deployment is finished, but don't start the application yet!**

## Configure Data Source

*This step can be skipped, if the [https://hanatrial.ondemand.com](https://hanatrial.ondemand.com) landscape is used*.


* Navigate to your application (in our example *dirigible*), under the **Java Applications** tab
* Under the **Configuration** section, open the **Data Source Bindings** tab
* Create a **New Binding**
	* For the name of the data source, leave as default
	* Select the desired DB/Schema ID
	* Provide the required credentials

## Assign Security Roles

* Under the **Security** section, open the **Roles** tab
* Assign the **Developer** and **Operator** roles to your user

## Launch Eclipse Dirigible

* Go back to the **Overview** section and click on the **Start** button
* Wait till the application is started
* Launch Eclipse Dirigible from the **Application URLs** link

Finally, Eclipse Dirigible is configured, deployed and running into your SAP HANA Cloud Platform account.

## Install the CMIS Explorer

* The **CMIS Explorer** is a project in the [DirigibleLabs](github.com/dirigiblelabs) GitHub organization.
* Copy the Git URL from the [CMIS Explorer](https://github.com/dirigiblelabs/sample_cmis_explorer)
* Go back to the **Eclipse Dirigible Registry UI**
	* If you are wondering, this is how it looks like:

	![Registry UI](/img/posts/20161103-0/3-registry-ui.png){: .img-responsive }

* Click on the **Develop** tile and after that on the **Web IDE**
	* *If this is the first time, you are launching the "Web IDE", cancel the “Get Started Project Wizard”*.
* Right click on the **Project Explorer** and select **Team->Clone**
* Paste the Git URL, that you’ve copied earlier
* Username and Password are not required, so just click “Ok”
* After the project is imported into the workspace, right click on it and press the **Publish** button
* Expand the project and find the **index.html**
* The application should be visible in the “Preview” tab, you can copy the link and open it in a new tab
* The application URL can be found also, through the **Eclipse Dirigible Registry UI**, from **Discover->Web**.

![Registry UI](/img/posts/20161103-0/4-cmis-explorer.png){: .img-responsive }

## Recap

In this tutorial, we've downloaded, configured, deployed and ran **Eclipse Dirigible** on the **SAP HANA Cloud Platform**, leveraged the **Document Service** and the **CMIS Explorer** application.

## Enjoy!
