---
title: Kyma
---

Setup in Kyma
===

Deploy Eclipse Dirigible in SAP BTP[^1], Kyma environment.

[^1]: SAP Cloud Platform is called SAP Business Technology Platform (SAP BTP) as of 2021.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - this step is optional.
    - Access to SAP BTP account _(the Trial landscape can be accessed [here](https://account.hanatrial.ondemand.com/))._

## Steps
---

1. Access the SAP BTP, Kyma environment via the SAP BTP cockpit:

    !!! Note
		The Trial landscape can be accessed from [here](https://account.hanatrial.ondemand.com)

1. Deploy Eclipse Dirigible:

    - Copy and paste the following content into `deployment.yaml`:

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: dirigible
          namespace: default
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: dirigible
          template:
            metadata:
              labels:
                app: dirigible
            spec:
              containers:
              - name: dirigible
                image: dirigiblelabs/dirigible-sap-kyma:latest
                imagePullPolicy: Always
                env:
                - name: DIRIGIBLE_THEME_DEFAULT
                  value: fiori
                - name: DIRIGIBLE_HOST
                  value: https://dirigible.<your-kyma-cluster-host>
                volumeMounts:
                - name: dirigible-volume
                  mountPath: /usr/local/tomcat/target/dirigible
                ports:
                - containerPort: 8080
                  name: dirigible
                  protocol: TCP
              volumes:
              - name: dirigible-volume
                persistentVolumeClaim:
                  claimName: dirigible-claim
        ---
        apiVersion: v1
        kind: Service
        metadata:
          labels:
            app: dirigible
          name: dirigible
          namespace: default
        spec:
          ports:
          - name: dirigible
            port: 8080
            protocol: TCP
            targetPort: 8080
          selector:
            app: dirigible
          type: ClusterIP
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: dirigible-claim
        spec:
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
        ---
        apiVersion: gateway.kyma-project.io/v1alpha1
        kind: APIRule
        metadata:
          name: dirigible
          namespace: default
        spec:
          gateway: kyma-gateway.kyma-system.svc.cluster.local
          rules:
          - accessStrategies:
            - config: {}
              handler: noop
            methods:
            - GET
            - POST
            - PUT
            - PATCH
            - DELETE
            - HEAD
            path: /.*
          service:
            host: dirigible.<your-kyma-cluster-host>
            name: dirigible
            port: 8080
        ```
        Replace the **`<your-kyma-cluster-host>`** placeholder with your Kyma cluster host (e.g. **`c-xxxxxxx.kyma.xxx.xxx.xxx.ondemand.com`**)._

        !!! tip "Eclipse Dirigible versions"
            Instead of using the `latest` tag (version), for production and development use cases it is recomended to use stable release version:

            - All released versions can be found [here](https://github.com/eclipse/dirigible/releases/).
            - All Eclipse Dirigible Docker images and tags (versions) can be found [here](https://hub.docker.com/u/dirigiblelabs).

    - Navigate to your Kyma dashboard and select the "default" namespace.

    - Click on the **Deploy new resource** button and select the `deployment.yaml` file.

    !!! Note
		Alternatively the `kubectl -f deployment.yaml` could be used to deploy the resources.

1. Create XSUAA service instance:

    - From the Kyma dashboard, go to **Service Management** **&rarr;** **Catalog**.
    - Find the Authorization & Trust Management service.
    - Create new service instance.
    - Provide the following additional parameters.

        ```json
        {
           "xsappname": "dirigible-xsuaa",
           "oauth2-configuration": {
              "token-validity": 7200,
              "redirect-uris": [
                 "https://dirigible.<your-kyma-cluster-host>"
              ]
           },
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

        Replace the **`<your-kyma-cluster-host>`** placeholder with your Kyma cluster host (e.g. **`c-xxxxxxx.kyma.xxx.xxx.xxx.ondemand.com`**).

    - Bind the servce instance to the dirigible application.

1. Assign the Developer and Operator roles.

1. Log in.

!!! info "Helm"
    The `helm` package manager could be used to install Eclipse Dirigible via Helm [Chart](https://artifacthub.io/packages/search?page=1&org=dirigiblelabs).

    Example:

    ```
    helm repo add dirigible https://eclipse.github.io/dirigible
    helm repo update
    helm install dirigible dirigible/dirigible
    ```

    More about the setup with Helm can be found [here](../helm/).


!!! example "Additional Materials"
    - For deployment through the kubectl, refer to the Kubernetes [setup](../kubernetes/).
    - Step by step tutorial can be found [here](https://blogs.sap.com/2020/10/13/how-to-deploy-eclipse-dirigible-in-the-sap-cloud-platform-kyma-environment/).
