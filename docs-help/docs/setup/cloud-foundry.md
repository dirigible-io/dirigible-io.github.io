---
title: Cloud Foundry
---

Setup in Cloud Foundry
===

Deploy Eclipse Dirigible in the SAP Cloud Platform Cloud Foundry environment.

!!! info "Prerequisites"
    - Install [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html).
    - Access to SAP Cloud Platform account _(the Trial landscape can be accessed [here](https://account.hanatrial.ondemand.com/))._

Steps
---

1. Login to the SAP Cloud Platform Cloud Foundry environment with:

    ```
    cf login -a <cloud-foundry-api-host>
    ```

1. Create XSUAA service instance:

    - Copy and paste the following content into **xs-security.json**:

        ```json
        {
           "xsappname": "<applicationName>-xsuaa",
           "tenant-mode": "shared",
           "scopes": [
              {
                 "name": "$XSAPPNAME.Developer",
                 "description": "Developer scope"
              },
              {
                 "name": "$XSAPPNAME.Operator",
                 "description": "Operator scope"
              }
           ],
           "role-templates": [
              {
                 "name": "Developer",
                 "description": "Developer related roles",
                 "scope-references": [
                    "$XSAPPNAME.Developer"
                 ]
              },
              {
                 "name": "Operator",
                 "description": "Operator related roles",
                 "scope-references": [
                    "$XSAPPNAME.Operator"
                 ]
              }
           ],
           "role-collections": [
              {
                 "name": "dirigible",
                 "description": "Dirigible Developer",
                 "role-template-references": [
                    "$XSAPPNAME.Developer",
                    "$XSAPPNAME.Operator"
                 ]
              }
           ]
        }
        ```

        > _**Note:** Replace the `<applicationName>` placeholder with your application name, e.g. `dirigible`_

    - Create a XSUAA service instance:

        ```
        cf create-service xsuaa application <applicationName>-xsuaa -c xs-security.json
        ```

        > _**Note:** Use the same `<applicationName>` as in the previous step_

1. Deploy Eclipse Dirigible:

    ```
    cf push dirigible \
    --docker-image=dirigiblelabs/dirigible-sap-cf:latest \
    --hostname dirigible-<org-name> \
    -m 2G -k 2G
    ```
    > _**Note:** Replace the `<org-name>` placeholder with your subaccount's **Subdomain** value._

    !!! tip "Eclipse Dirigible versions"
        Instead of using the `latest` tag (version), for production and development use cases it is recomended to use stable release version:

        - All released versions can be found [here](https://github.com/eclipse/dirigible/releases/).
        - All Eclipse Dirigible Docker images and tags (versions) can be found [here](https://hub.docker.com/u/dirigiblelabs).

1. Bind the XSUAA service instance to the Eclipse Dirigible deployment:

    - Bind the service instance:

        ```
        cf bind-service dirigible <applicationName>-xsuaa
        ```

        > _**Note:** Replace the `<applicationName>` placeholder with the application name, used in the previous steps_

    - Restart the `dirigible` deployment:

        ```
        cf restart dirigible
        ```

1. Assign the `Developer` and `Operator` roles.

1. Login.

!!! example "Additional Materials"
    - For deployment through `manifest.yaml` follow this [steps](https://github.com/dirigiblelabs/deployment-sap-cloud-foundry).
    - Step by step tutorial can be found [here](https://blogs.sap.com/2020/03/15/how-to-deploy-eclipse-dirigible-in-the-sap-cloud-platform-cloud-foundry-environment/).
