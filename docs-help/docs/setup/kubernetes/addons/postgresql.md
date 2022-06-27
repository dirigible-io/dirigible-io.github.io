---
title: PostgreSQL
---

PostgreSQL Setup
===

Deploy PostgreSQL in Kubernetes environment.

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
          name: dirigible-database
          labels:
            app: dirigible-database
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: dirigible-database
          template:
            metadata:
              labels:
                app: dirigible-database
            spec:
              containers:
                - name: dirigible-database
                  image: postgres:13
                  env:
                    - name: PGDATA
                      value: "/var/lib/postgresql/data/pgdata"
                    - name: POSTGRES_USER
                      value: <your-dirigible-database-username>
                    - name: POSTGRES_PASSWORD
                      value: <your-dirigible-database-password>
                  ports:
                    - name: jdbc
                      containerPort: 5432
                      protocol: TCP
        ```

    === "Deployment with PVC"

        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: dirigible-database
          labels:
            app: dirigible-database
        spec:
          replicas: 1
          selector:
            matchLabels:
              app: dirigible-database
          template:
            metadata:
              labels:
                app: dirigible-database
            spec:
              containers:
                - name: dirigible-database
                  image: postgres:13
                  volumeMounts:
                  - name: dirigible-database-data
                    mountPath: /var/lib/postgresql/data
                  env:
                    - name: PGDATA
                      value: "/var/lib/postgresql/data/pgdata"
                    - name: POSTGRES_USER
                      value: <your-dirigible-database-username>
                    - name: POSTGRES_PASSWORD
                      value: <your-dirigible-database-password>
                  ports:
                    - name: jdbc
                      containerPort: 5432
                      protocol: TCP
              volumes:
                - name: dirigible-database-data
                  persistentVolumeClaim:
                    claimName: dirigible-database-data
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: dirigible-database-data
        spec:
          accessModes:
          - ReadWriteOnce
          resources:
            requests:
              storage: 2Gi
        ```

    !!! note "Replace Placeholders"
        Before deploying, replace the following placeholders:

        - `<your-dirigible-username>` with your Keycloak username _(e.g. `admin`)_.
        - `<your-dirigible-password>` with your Keycloak password _(e.g. `admin`)_.

1. Create service configuration file: `service.yaml`

    === "Service"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: dirigible-database
          labels:
            app: dirigible-database
        spec:
          type: ClusterIP
          ports:
            - port: 8080
              targetPort: http
              protocol: TCP
              name: http
          selector:
            app: dirigible-database
        ```

1. Deploy to the Kubernetes Cluster with:

    ```
    kubectl apply -f deployment.yml

    kubectl apply -f service.yml
    ```