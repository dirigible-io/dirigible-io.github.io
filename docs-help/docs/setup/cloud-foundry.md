---
title: Cloud Foundry
---

Setup in the Cloud Foundry environment
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

2. Clone the "deployment-sap-cloud-foundry" repository

> git clone https://github.com/dirigiblelabs/deployment-sap-cloud-foundry

3. Follow the [README.md](https://github.com/dirigiblelabs/deployment-sap-cloud-foundry) steps

4. Login with user which has assigned the Developer and Operator roles

For more detailed setup follow these [steps](https://github.com/dirigiblelabs/deployment-sap-cloud-foundry)
