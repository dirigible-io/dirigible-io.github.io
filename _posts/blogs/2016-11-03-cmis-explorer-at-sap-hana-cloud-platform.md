---
title: Document Service Explorer at SAP HANA Cloud Platform
author: yordan.pavlov
---


Wondering how you can easily manage the **SAP HANA Cloud Platform Document Service** through the browser? Now this is possible with the help of **Eclipse Dirigible** and the **CMIS Explorer** application.

## Overview

Wondering how you can easily manage the **SAP HANA Cloud Platform** [Document Service](https://help.hana.ondemand.com/help/frameset.htm?e60b7e45bb57101487a881c7c5487778.html) through the browser? Now this is possible with the help of **Eclipse Dirigible** and the **CMIS Explorer** application.

In this blog, you will see how to download, configure, deploy, and run **Eclipse Dirigible** on the **SAP HANA Cloud Platform**. After that, you can go through the steps of installing and running the **CMIS Explorer** application.

## Download Eclipse Dirigible

1. Download the latest milestone/release, which you can find at [http://download.eclipse.org/dirigible/](http://download.eclipse.org/dirigible/).

   >**Note**: At the time of the blog, the latest milestone was *M20161021-1818*.

2. From the selected release/milestone, navigate to the **HANA Cloud Platform** category and download the **sap/allinone/ROOT.war** file.

## Create a Document Repository

1. Log in to the SAP HANA Cloud Platform Cockpit.
2. In the **Repositories** section, open the **Document Repositories** tab.
3. Create a new document repository.
4. Please remember the values for the **Name** and the **Repository Key**, as we will need them later on.

![Create a Document Repository](/img/posts/20161103-0/1-create-document-repository.png){: .img-responsive }

## Deploy Eclipse Dirigible

1. In the **Applications** section, open the **Java Applications** tab.
2. Click on the **Deploy Application** button.
3. Browse to the **ROOT.war** file, which you have already downloaded.
4. For the application name, you can specify whatever you want (for example, dirigible, doc, …).
5. Change the runtime to **Java Web Tomcat 8**.
6. For the **JVM Arguments** input, enter this:
			
			-DjndiCmisServiceName=<name_of_repository> -DjndiCmisServiceKey=<repository_key>

These are the magic settings that will allow the Eclipse Dirigible to connect and use the document repository. List of all available environment variables can be found [here](www.dirigible.io/help/setup_env_vars.html).

Finally, the **Deploy Application** wizard should look something like this:

![Deploy Application](/img/posts/20161103-0/2-deploy-application.png){: .img-responsive }

**Wait till the deployment is finished, but don't start the application yet!**

## Configure Data Source

>**Note**: This step can be skipped if the [https://hanatrial.ondemand.com](https://hanatrial.ondemand.com) landscape is used.

1. Navigate to your application (in this example *dirigible*) in the **Java Applications** tab.
2. In the **Configuration** section, open the **Data Source Bindings** tab.
3. Create a **New Binding**:
	* For the name of the data source, leave the default name.
	* Select the desired DB/Schema ID.
	* Provide the required credentials.

## Assign Security Roles

1. After deploying the application in the cockpit, click on its name.
2. In the **Security** section, open the **Roles** tab.
3. Assign the **Developer** and **Operator** roles to your user.

## Launch Eclipse Dirigible

1. Go back to the **Overview** section and click on the **Start** button.
2. Wait till the application is started.
3. Launch Eclipse Dirigible from the **Application URLs** link.

Finally, Eclipse Dirigible has been configured and deployed and is running into your SAP HANA Cloud Platform account.

## Install the CMIS Explorer

The **CMIS Explorer** is a project in the [DirigibleLabs](github.com/dirigiblelabs) GitHub organization.

1. Open the [CMIS Explorer](https://github.com/dirigiblelabs/sample_cmis_explorer) in GitHub, choose **Clone or download** and then copy the URL.
2. Go back to the **Eclipse Dirigible Registry UI**.

   >**Note**: If you are wondering, this is how it looks like:

   >![Registry UI](/img/posts/20161103-0/3-registry-ui.png){: .img-responsive }

3. Click on the **Develop** tile and after that on the **Web IDE**.

   >**Note**: If this is the first time you are launching the "Web IDE", cancel the “Get Started Project Wizard”.

4. Right-click on the **Workspace Explorer** and select **Team > Clone**.
5. Paste the Git URL that you’ve copied earlier.
6. Username and Password are not required, so just click **OK**.
7. After the project is imported into the workspace, right-click on it and press the **Publish** button.
8. Expand the project and find the **index.html**.
9. The application should be visible in the **Preview** tab, you can copy the link and open it in a new tab.
10. The application URL can be found also through the **Eclipse Dirigible Registry UI** from **Discover > Web**.

![Registry UI](/img/posts/20161103-0/4-cmis-explorer.png){: .img-responsive }

## Recap

In this tutorial, you have downloaded, configured, deployed, and run **Eclipse Dirigible** on the **SAP HANA Cloud Platform**, and you have leveraged the **Document Service** and the **CMIS Explorer** application.

## Enjoy!
