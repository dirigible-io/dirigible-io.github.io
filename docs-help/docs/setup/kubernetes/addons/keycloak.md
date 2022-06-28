---
title: Keycloak
---

Keycloak Setup
===

Deploy Keycloak in Kubernetes environment.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    - Access to Kubernetes cluster.

## Steps
---

1. Create deployment configuration file: `deployment.yaml`

    === "Deployment"

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: keycloak
          labels:
            app: keycloak
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: keycloak
          template:
            metadata:
              labels:
                app: keycloak
            spec:
              containers:
                - name: keycloak
                  image: jboss/keycloak:12.0.4
                  env:
                    - name: PROXY_ADDRESS_FORWARDING
                      value: "true"
                    - name: KEYCLOAK_USER
                      value: <your-keycloak-username>
                    - name: KEYCLOAK_PASSWORD
                      value: <your-keycloak-password>
                    - name: KEYCLOAK_FRONTEND_URL
                      value:  "https://keycloak.<your-keycloak-host>/auth/"
                  ports:
                    - name: http
                      containerPort: 8080
                      protocol: TCP
        ```

        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-keycloak-username>` with your Keycloak username _(e.g. `admin`)_.
            - `<your-keycloak-password>` with your Keycloak password _(e.g. `admin`)_.
            - `<your-keycloak-host>` with your Keycloak host _(e.g. `my-company.com`)_.

    === "Deployment with PostgreSQL"

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: keycloak
          labels:
            app: keycloak
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: keycloak
          template:
            metadata:
              labels:
                app: keycloak
            spec:
              initContainers:
                - name: wait-db-ready
                  image: busybox:1.28
                  command:
                    - sh
                    - -c
                    - for i in {1..15}; do echo "Waiting for database creation."; sleep 2; done;
              containers:
                - name: keycloak
                  image: jboss/keycloak:12.0.4
                  env:
                    - name: PROXY_ADDRESS_FORWARDING
                      value: "true"
                    - name: KEYCLOAK_USER
                      value: <your-keycloak-username>
                    - name: KEYCLOAK_PASSWORD
                      value: <your-keycloak-password>
                    - name: KEYCLOAK_FRONTEND_URL
                      value:  "https://keycloak.<your-keycloak-host>/auth/"
                    - name: DB_VENDOR
                      value: postgres
                    - name: DB_USER
                      value: <your-keycloak-database-username>
                    - name: DB_PASSWORD
                      value: <your-keycloak-database-password>
                    - name: DB_DATABASE
                      value: <your-keycloak-database-username>
                    - name: DB_ADDR
                      value: keycloak-database
                  ports:
                    - name: http
                      containerPort: 8080
                      protocol: TCP
        ---
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: keycloak-database
          labels:
            app: keycloak-database
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: keycloak-database
          template:
            metadata:
              labels:
                app: keycloak-database
            spec:
              containers:
                - name: keycloak-database
                  image: postgres:13
                  volumeMounts:
                  - name: keycloak-database-data
                    mountPath: /var/lib/postgresql/data
                  env:
                    - name: PGDATA
                      value: "/var/lib/postgresql/data/pgdata"
                    - name: POSTGRES_USER
                      value: <your-keycloak-database-username>
                    - name: POSTGRES_PASSWORD
                      value: <your-keycloak-database-password>
                  ports:
                    - name: jdbc
                      containerPort: 5432
                      protocol: TCP
              volumes:
                - name: keycloak-database-data
                  persistentVolumeClaim:
                    claimName: keycloak-database-data
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: keycloak-database-data
        spec:
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: 2Gi
        ```

        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-keycloak-username>` with your Keycloak username _(e.g. `admin`)_.
            - `<your-keycloak-password>` with your Keycloak password _(e.g. `admin`)_.
            - `<your-keycloak-host>` with your Keycloak host _(e.g. `my-company.com`)_.
            - `<your-keycloak-database-username>` with your Keycloak database username _(e.g. `dbadmin`)_.
            - `<your-keycloak-database-password>` with your Keycloak database password _(e.g. `dbadmin`)_.

1. Create service configuration file: `service.yaml`

    === "Service"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: keycloak
          labels:
            app: keycloak
        spec:
          type: ClusterIP
          ports:
            - port: 8080
              targetPort: http
              protocol: TCP
              name: http
          selector:
            app: keycloak
        ```

    === "Service with PostgreSQL"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: keycloak
          labels:
            app: keycloak
        spec:
          type: ClusterIP
          ports:
            - port: 8080
              targetPort: http
              protocol: TCP
              name: http
          selector:
            app: keycloak
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: keycloak-database
          labels:
            app: keycloak-database
        spec:
          type: ClusterIP
          ports:
            - port: 5432
              targetPort: jdbc
              protocol: TCP
              name: jdbc
          selector:
            app: keycloak-database
        ```

    === "Route (OpenShift)"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: keycloak
          labels:
            app: keycloak
        spec:
          type: ClusterIP
          ports:
            - port: 8080
              targetPort: http
              protocol: TCP
              name: http
          selector:
            app: keycloak
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: keycloak-database
          labels:
            app: keycloak-database
        spec:
          type: ClusterIP
          ports:
            - port: 5432
              targetPort: jdbc
              protocol: TCP
              name: jdbc
          selector:
            app: keycloak-database
        ---
        kind: Route
        apiVersion: route.openshift.io/v1
        metadata:
          name: keycloak
        spec:
          host: keycloak.<your-openshift-domain>
          to:
            kind: Service
            name: keycloak
          port:
            targetPort: http
          tls:
            termination: edge
            insecureEdgeTerminationPolicy: Redirect
          wildcardPolicy: None
        ```

        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-openshift-domain>` with your OpenShift domain _(e.g. `apps.sandbox.xxxx.yy.openshiftapps.com`)_.

1. Deploy to the Kubernetes Cluster with:

    ```
    kubectl apply -f deployment.yml

    kubectl apply -f service.yml
    ```

1. Open a web browser and go to: **`https://keycloak.<your-openshift-domain>`**
