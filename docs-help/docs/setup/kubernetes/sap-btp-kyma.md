---
title: SAP BTP Kyma
---

Setup in SAP BTP Kyma
===

Deploy Eclipse Dirigible in SAP BTP[^1], Kyma environment.

[^1]: SAP Cloud Platform is called SAP Business Technology Platform (SAP BTP) as of 2021.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) - this step is optional.
    - Access to SAP BTP account _(the Trial landscape can be accessed [here](https://account.hanatrial.ondemand.com/))._

## Steps
---

1. Access the SAP BTP, Kyma environment via the SAP BTP cockpit:

1. Create deployment configuration file: `deployment.yaml`

    === "Deployment"

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: dirigible
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
                resources:
                    requests:
                      memory: "1Gi"
                      cpu: "0.5"
                    limits:
                      memory: "4Gi"
                      cpu: "2"
                env:
                - name: DIRIGIBLE_THEME_DEFAULT
                  value: fiori
                - name: DIRIGIBLE_HOST
                  value: https://dirigible.<your-kyma-cluster-host>
                ports:
                - containerPort: 8080
                  name: dirigible
                  protocol: TCP
        ```

    === "Deployment with PVC"

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: dirigible
        spec:
          replicas: 1
          strategy:
            type: Recreate
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
                resources:
                    requests:
                      memory: "1Gi"
                      cpu: "0.5"
                    limits:
                      memory: "4Gi"
                      cpu: "2"
                env:
                - name: DIRIGIBLE_THEME_DEFAULT
                  value: fiori
                - name: DIRIGIBLE_HOST
                  value: https://dirigible.<your-kyma-cluster-host>
                volumeMounts:
                - name: dirigible-volume
                  mountPath: /usr/local/tomcat/target/dirigible/repository
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
        kind: PersistentVolumeClaim
        metadata:
          name: dirigible-claim
        spec:
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
        ```

    !!! note "Replace Placeholders"
        Before deploying, replace the following placeholders:

        - `<your-kyma-cluster-host>` with your Kyma cluster host _(e.g. `c-xxxx.kyma.yyyy.ondemand.com`)_.

    !!! tip "Eclipse Dirigible versions"
        Instead of using the `latest` tag (version), for production and development use cases it is recomended to use stable release version:

        - All released versions can be found [here](https://github.com/eclipse/dirigible/releases/).
        - All Eclipse Dirigible Docker images and tags (versions) can be found [here](https://hub.docker.com/u/dirigiblelabs).

1. Create service configuration file: `service.yaml`

    === "Service"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          labels:
            app: dirigible
          name: dirigible
        spec:
          ports:
          - name: dirigible
            port: 8080
            protocol: TCP
            targetPort: 8080
          selector:
            app: dirigible
          type: ClusterIP
        ```

    === "APIRule"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          labels:
            app: dirigible
          name: dirigible
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
        apiVersion: gateway.kyma-project.io/v1alpha1
        kind: APIRule
        metadata:
          name: dirigible
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

        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-kyma-cluster-host>` with your Kyma cluster host _(e.g. `c-xxxx.kyma.yyyy.ondemand.com`)_.

1. Click on the **Deploy new resource** button and select the `deployment.yaml` and `service.yaml` files.

    !!! info "Note"
        Alternatively the `kubectl` could be used to deploy the resources:

        ```
        kubectl -f deployment.yaml

        kubectl -f service.yaml
        ```

1. Create XSUAA service instance:

    - From the Kyma dashboard, go to **Service Management** **&rarr;** **Catalog**.
    - Find the `Authorization & Trust Management` service.
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
                 "name": "Dirigible Developer",
                 "description": "Dirigible Developer",
                 "role-template-references": [ 
                    "$XSAPPNAME.Developer"
                 ]
              },
	      {
                 "name": "Dirigible Operator",
                 "description": "Dirigible Operator",
                 "role-template-references": [ 
                    "$XSAPPNAME.Operator"
                 ]
              }
           ]	
        }
        ```

        !!! Note
            Replace the **`<your-kyma-cluster-host>`** placeholder with your Kyma cluster host (e.g. **`c-xxxxxxx.kyma.xxx.xxx.xxx.ondemand.com`**).

    - Bind the servce instance to the **`dirigible`** application.

1. Assign the `Developer` and `Operator` roles.

1. Log in.