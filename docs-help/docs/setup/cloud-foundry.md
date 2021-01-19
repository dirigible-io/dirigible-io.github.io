---
title: Cloud Foundry
---

Setup in Cloud Foundry
===

Deploy Eclipse Dirigible in the Cloud Foundry environment of SAP Cloud Platform with the [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).

Prerequisites
---

- Install [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)

Steps
---

1. Login to the SAP Cloud Platform Cloud Foundry environment with:

    ```
    cf login -a <cloud-foundry-api-host>
    ```

1. Clone the `dirigiblelabs\deployment-sap-cloud-foundry` repository:

    ```
    git clone https://github.com/dirigiblelabs/deployment-sap-cloud-foundry
    ```

1. Follow the [README.md](https://github.com/dirigiblelabs/deployment-sap-cloud-foundry) steps.

1. Login with user which has assigned the Developer and Operator roles.

Tutorial
---

Step by step tutorial can be found [here](https://blogs.sap.com/2020/03/15/how-to-deploy-eclipse-dirigible-in-the-sap-cloud-platform-cloud-foundry-environment/).
