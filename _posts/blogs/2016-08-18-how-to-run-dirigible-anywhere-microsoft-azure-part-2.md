---
title: How to Run Dirigible Anywhere - Microsoft Azure - Part II?
author: yordan.pavlov
---


This blog is part of the **"How to Run Dirigible Anywhere?"** series. In this edition, we will see how to simplify the deployment process on **Microsoft Azure**.

## Overview
Do you remember the first blog, about the **Microsoft Azure** and how to run **Eclipse Dirigible** on it (<a href="http://www.dirigible.io/blogs/2016/08/09/how-to-run-dirigible-anywhere-microsoft-azure.html" target="_blank">How to Run Dirigible Anywhere - Microsoft Azure</a>)? In that blog, there were lot of steps, before we can get Eclipse Dirigible up and running on Azure. Now, it's time to simplify the steps and narrow them down to only few mouse clicks.

How is that possible? Thanks to <a href="https://azure.microsoft.com/en-us/documentation/templates/" target="_blank">Azure Quickstart Templates</a> and more specifically to <a href="https://github.com/azure-appservice-samples/TomcatTemplate" target="_blank">Azure App Service Samples - Tomcat Template</a>.

## Steps
Bellow you can find the steps of how to deploy Eclipse Dirigible on Microsoft Azure, through templates available on <a href="https://github.com/dirigiblelabs" target="_blank">DirigibleLabs</a>.

The templates that you can choose between are:

* <a href="https://github.com/dirigiblelabs/dirigible-trial-azure-template" target="_blank">Dirigible Trial - Azure Template</a>
	* This template offers the **Trial Distribution** of Eclipse Dirigible, which is available on **http://trial.dirigible.io**.

* <a href="https://github.com/dirigiblelabs/dirigible-tomcat-azure-template" target="_blank">Dirigible Tomcat - Azure Template</a>
	* This template offers the **Tomcat Distribution** of Eclipse Dirigible, protected with **BASIC** authentication, pre-configured with **Default User** and using the **Apache Derby** database.


To deploy your own instance of **Eclipse Dirigible** on **Microsoft Azure**, first choose one of the available templates and then follow the steps:

1. Click the **Deploy to Azure** button.
2. Fill the required properties.
		
	![Deploy to Microsoft Azure](/img/posts/20160818-0/deploy-to-azure.png){: .img-responsive }
3. Wait until the deployment is finished.
4. Use the links from the *Deploy* page, or log into your **Microsoft Azure Portal**.
5. Now, you are ready to start developing with **Eclipse Dirigible** on **Microsoft Azure**.

## References

* <a href="http://www.dirigible.io/help/index.html" target="_blank">Help</a>
* <a href="http://www.dirigible.io/api/index.html" target="_blank">API</a>
* <a href="http://www.dirigible.io/samples/bookstore.html" target="_blank">Bookstore Sample</a>
* <a href="http://www.dirigible.io/blogs/2016/08/09/how-to-run-dirigible-anywhere-microsoft-azure.html" target="_blank">How to Run Dirigible Anywhere - Microsoft Azure?</a>


## Enjoy!
