---
layout: help
title: the Cloud Foundry Environment
icon: none
group: help-setup
---

Setup in {{ page.title }}
===

Deploy Eclipse Dirigible in the Cloud Foundry environment of SAP Cloud Platform with the [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).

Prerequisites
---

- Install [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)
- Create instance of the [XSUAA](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/51ec15a8979e497fbcaadf80da9b63ba.html) service for User Authentication and Authorization
- Deploy [AppRouter](https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.03/en-US/6ba89596e3a64a5480c3977d4ea7fdba.html) for managing authentication flows
> Follow the tutorial for brief introduction on how to "[Secure Your Application on SAP Cloud Platform Cloud Foundry](https://developers.sap.com/tutorials/s4sdk-secure-cloudfoundry.html)"


Steps
---

1. Login to the SAP Cloud Platform Cloud Foundry environment with:

> cf login -a [CloudFoundry Platform Host]

2. Deploy on the SAP Cloud Platform Cloud Foundry environment with:

> cf push dirigible --docker-image dirigiblelabs/dirigible-sap-cf -m 2G -k 2G

3. Open a web browser and go to:

> https://dirigible.[CloudFoundry Platform Host]/

4. Login with user which has assigned the Developer and Operator roles
