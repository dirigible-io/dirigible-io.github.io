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

### Kubernetes

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

### GCP Cloud Dirigible PostgreSQL instances

1. Enable API

    === "Console"

        Enable API
        
        - [Cloud SQL Admin API](https://console.cloud.google.com/sql/instances)

    === "gcloud"

        ```
        gcloud services enable sqladmin.googleapis.com \
        servicenetworking.googleapis.com 
        ```

1. Create an instance with a private IP address and SSL enabled

    === "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - Click Create instance.
        - Click PostgreSQL.
        - Enter quickstart-instance for Instance ID.
        - Enter a password for the postgres user. Save this password for future use.
        - Click the Single zone option for Choose region and zonal availability.
        - Click and expand Show configuration options.
        - For Machine Type, select Lightweight.
        - In Connections, select Private IP.
        - Select default in the Network drop-down menu.
        - If you see a dialog stating Private services access connection required, click the Set Up Connection button.
          - In the Enable Service Networking API dialog, click the Enable API button.
          - In the Allocate an IP range dialog, select Use an automatically allocated IP range and click Continue.
          - In the Create a connection dialog, click Create Connection.
        - Clear the Public IP checkbox to create an instance only with a private IP.
        - Click Create instance and then wait for the instance to initialize and start.
        - Click Connections.
        - In the Security section, select Allow only SSL connections to enable SSL connections.
        - In the Allow only SSL connections dialog, click Save and then wait for the instance to restart.

    === "gcloud"

        * Creating an instance with a private IP address only requires configuring private services access to enable connections from other Google Cloud services, such as GKE.

          ```
          gcloud compute addresses create google-managed-services-default \
          --global \
          --purpose=VPC_PEERING \
          --prefix-length=16 \
          --description="peering range for Google" \
          --network=default
          ```

        * Run the gcloud services vpc-peerings connect command to create the private services access connection:

          ```
          gcloud services vpc-peerings connect \
          --service=servicenetworking.googleapis.com \
          --ranges=google-managed-services-default \
          --network=default
          ```

        * Create PostgreSQL instance

          ```
          gcloud beta sql instances create YOUR_DIRIGIBLE_SQL_INSTANCE \
          --database-version=POSTGRES_13 \
           --cpu=1 \
           --memory=4GB \
           --region=<your-region> \
           --root-password='DB_ROOT_PASSWORD' \
           --no-assign-ip \
          --network=default
          ```

        * Run the gcloud sql instances patch command to allow only SSL connections for the instance.

          `gcloud sql instances patch dirigible-postgre --require-ssl`

1. Create Dirigible database

    == "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - Select quickstart-instance.
        - Open the Databases tab.
        - Click Create database.
            - In the New database dialog box, enter quickstart_db as the name of the database.
            - Click Create.

    == "gcloud"

        ```
        gcloud sql databases create YOUR_DIRIGIBLE_DB_NAME \
        --instance=YOUR_DIRIGIBLE_SQL_INSTANCE
        ```

1. Create Dirigible user

    == "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - To open the Overview page of an instance, click the instance name.
        - Select Users from the SQL navigation menu.
        - Click Add user account.
        - In the Add a user account to instance instance_name page, add the following information:
            - Username: Set to quickstart-user
            - Password: Specify a password for your database user. Make a note of this for use in a later step of this quickstart.
        - Click Add.

    == "gcloud"

        ```
        gcloud sql users create dirigible-user \
        --instance=dirigible-instance \
        --password='DB_PASS'
        ```

1. Create new service account

    * Run the gcloud iam service-accounts create command as follows to create a new service account:

        ```
        gcloud iam service-accounts create YOUR_DIRIGIBLE_GOOGLE_SERVICE_ACCOUNT \
        --display-name="GKE Quickstart Service Account"
        ```

    * Run the gcloud projects add-iam-policy-binding command as follows to add the Cloud SQL Client role to the Google Cloud service account you just created. Replace YOUR_PROJECT_ID with the project ID.

        ```
        gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
        --member="serviceAccount:YOUR_DIRIGIBLE_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
        --role="roles/cloudsql.client"
        ```

1. Enable Workload Identity

    * To have access to Cloud SQL by binding it to the Google Cloud service account using Workload Identity.

    ```
    gcloud container clusters update CLUSTER_NAME \
    --region=COMPUTE_REGION \
    --workload-pool=PROJECT_ID.svc.id.goog
    ```

1. Create a Kubernetes Service Account

    ```
    kubectl create sa YOUR_KUBERNETES_SERVICE_ACCOUNT
    ```

1. Enable IAM binding

    * Run the gcloud iam service-accounts add-iam-policy-binding command as follows to enable IAM binding of the Google Cloud Service Account and the Kubernetes Service Account. Make the following replacements:

        ```
        gcloud iam service-accounts add-iam-policy-binding \
        --role="roles/iam.workloadIdentityUser" \
        --member="serviceAccount:YOUR_PROJECT_ID.svc.id.goog[YOUR_K8S_NAMESPACE/YOUR_KSA_NAME]" \
        YOUR_DIRIGIBLE_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com
        ```

1. Annotate the Kubernetes Service Account

    * Run the kubectl annotate command as follows to annotate the Kubernetes Service Account with IAM binding. Make the following replacements:

        ```
        kubectl annotate serviceaccount \
        YOUR_KSA_NAME  \
        iam.gke.io/gcp-service-account=YOUR_DIRIGIBLE_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com
        ```

1. Use your new account for the your deployment

    ```yaml
    spec:
      serviceAccountName: YOUR_SERVICE_ACCOUNT_NAME
    ```

1. Configure secrets

    ```
    kubectl create secret generic YOUR_DIRIGIBLE_SECRET_NAMET \
    --from-literal=database=YOUR_DIRIGIBLE_DATABASE \
    --from-literal=username=YOUR_DIRIGIBLE_USERNAME \
    --from-literal=password=DB_PASS
    ```

1. Deploye app connects to your Cloud SQL instance

    ```yaml
            env:
            - name: PORT
              value: "8080"
            - name: INSTANCE_HOST
              value: "127.0.0.1"
            - name: DB_PORT
              value: "5432"
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: YOUR_DIRIGIBLE_SECRET_NAMET
                  key: username
            - name: DB_PASS
              valueFrom:
                secretKeyRef:
                  name: YOUR_DIRIGIBLE_SECRET_NAMET
                  key: password
            - name: DB_NAME
              valueFrom:
                secretKeyRef:
                  name: YOUR_DIRIGIBLE_SECRET_NAMET
                  key: database
          - name: cloud-sql-proxy
            # This uses the latest version of the Cloud SQL proxy
            # It is recommended to use a specific version for production environments.
            # See: https://github.com/GoogleCloudPlatform/cloudsql-proxy
            image: gcr.io/cloudsql-docker/gce-proxy:latest
            command:
              - "/cloud_sql_proxy"

              # If connecting from a VPC-native GKE cluster, you can use the
              # following flag to have the proxy connect over private IP
              - "-ip_address_types=PRIVATE"

              # tcp should be set to the port the proxy should listen on
              # and should match the DB_PORT value set above.
              # Defaults: MySQL: 3306, Postgres: 5432, SQLServer: 1433
              - "-instances=<PROJECT_ID>:<LOCATION>:<SQL_INSTANCE>=tcp:5432"
            securityContext:
              # The default Cloud SQL proxy image runs as the
              # "nonroot" user and group (uid: 65532) by default.
              runAsNonRoot: true
    ```

### GCP Cloud Keycloak PostgreSQL instances

1. Enable API

    === "Console"

        Enable API
        
        - [Cloud SQL Admin API](https://console.cloud.google.com/sql/instances)

    === "gcloud"

        ```
        gcloud services enable sqladmin.googleapis.com \
        servicenetworking.googleapis.com 
        ```

1. Create an instance with a private IP address and SSL enabled

    === "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - Click Create instance.
        - Click PostgreSQL.
        - Enter quickstart-instance for Instance ID.
        - Enter a password for the postgres user. Save this password for future use.
        - Click the Single zone option for Choose region and zonal availability.
        - Click and expand Show configuration options.
        - For Machine Type, select Lightweight.
        - In Connections, select Private IP.
        - Select default in the Network drop-down menu.
        - If you see a dialog stating Private services access connection required, click the Set Up Connection button.
          - In the Enable Service Networking API dialog, click the Enable API button.
          - In the Allocate an IP range dialog, select Use an automatically allocated IP range and click Continue.
          - In the Create a connection dialog, click Create Connection.
        - Clear the Public IP checkbox to create an instance only with a private IP.
        - Click Create instance and then wait for the instance to initialize and start.
        - Click Connections.
        - In the Security section, select Allow only SSL connections to enable SSL connections.
        - In the Allow only SSL connections dialog, click Save and then wait for the instance to restart.

    === "gcloud"

        * Creating an instance with a private IP address only requires configuring private services access to enable connections from other Google Cloud services, such as GKE.

          ```
          gcloud compute addresses create google-managed-services-default \
          --global \
          --purpose=VPC_PEERING \
          --prefix-length=16 \
          --description="peering range for Google" \
          --network=default
          ```

        * Run the gcloud services vpc-peerings connect command to create the private services access connection:

          ```
          gcloud services vpc-peerings connect \
          --service=servicenetworking.googleapis.com \
          --ranges=google-managed-services-default \
          --network=default
          ```

        * Create Keycloak PostgreSQL instance

          ```
          gcloud beta sql instances create YOUR_KEYCLOAK_INSTANCE \
          --database-version=POSTGRES_13 \
           --cpu=1 \
           --memory=4GB \
           --region=<your-region> \
           --root-password='DB_ROOT_PASSWORD' \
           --no-assign-ip \
          --network=default
          ```

        * Run the gcloud sql instances patch command to allow only SSL connections for the instance.

          `gcloud sql instances patch keycloak-postgre --require-ssl`

1. Create Keycloak database

    == "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - Select quickstart-instance.
        - Open the Databases tab.
        - Click Create database.
            - In the New database dialog box, enter quickstart_db as the name of the database.
            - Click Create.

    == "gcloud"

        ```
        gcloud sql databases create YOUR_KEYCLOAK_DB \
        --instance=YOUR_KEYCLOAK_INSTANCE
        ```

1. Create Keycloak user

    == "Console"

        - In the Google Cloud console, go to the Cloud SQL Instances page.

        [Go to Cloud SQL Instances](https://console.cloud.google.com/sql)

        - To open the Overview page of an instance, click the instance name.
        - Select Users from the SQL navigation menu.
        - Click Add user account.
        - In the Add a user account to instance instance_name page, add the following information:
            - Username: Set to quickstart-user
            - Password: Specify a password for your database user. Make a note of this for use in a later step of this quickstart.
        - Click Add.

    == "gcloud"

        ```
        gcloud sql users create YOUR_KEYCLOAK_USER \
        --instance=YOUR_KEYCLOAK_GOOGLE_SERVICE_ACCOUNT \
        --password='DB_PASS'
        ```

1. Create new service account

    * Run the gcloud iam service-accounts create command as follows to create a new service account:

        ```
        gcloud iam service-accounts create YOUR_KEYCLOAK_GOOGLE_SERVICE_ACCOUNT \
        --display-name="GKE Keycloak Service Account"
        ```

    * Run the gcloud projects add-iam-policy-binding command as follows to add the Cloud SQL Client role to the Google Cloud service account you just created. Replace YOUR_PROJECT_ID with the project ID.

        ```
        gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
        --member="serviceAccount:YOUR_KEYCLOAK_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
        --role="roles/cloudsql.client"
        ```

1. Enable Workload Identity

    * To have access to Cloud SQL by binding it to the Google Cloud service account using Workload Identity.

    ```
    gcloud container clusters update CLUSTER_NAME \
    --region=COMPUTE_REGION \
    --workload-pool=PROJECT_ID.svc.id.goog
    ```

    ```
    gcloud container node-pools update WORKLOAD_POOL \
    --cluster=YOUR_CLUSTER \
    --workload-metadata=GKE_METADATA
    ```

1. Create a Kubernetes Service Account

    ```
    kubectl create sa YOUR_KUBERNETES_SERVICE_ACCOUNT_NAME
    ```

1. Enable IAM binding

    * Run the gcloud iam service-accounts add-iam-policy-binding command as follows to enable IAM binding of the Google Cloud Service Account and the Kubernetes Service Account. Make the following replacements:

        ```
        gcloud iam service-accounts add-iam-policy-binding \
        --role="roles/iam.workloadIdentityUser" \
        --member="serviceAccount:YOUR_PROJECT_ID.svc.id.goog[YOUR_K8S_NAMESPACE/YOUR_KUBERNETES_SERVICE_ACCOUNT_NAME]" \
        YOUR_KEYCLOAK_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com
        ```

1. Annotate the Kubernetes Service Account

    * Run the kubectl annotate command as follows to annotate the Kubernetes Service Account with IAM binding. Make the following replacements:

        ```
        kubectl annotate serviceaccount \
        YOUR_KUBERNETES_SERVICE_ACCOUNT_NAME  \
        iam.gke.io/gcp-service-account=YOUR_KEYCLOAK_GOOGLE_SERVICE_ACCOUNT@YOUR_PROJECT_ID.iam.gserviceaccount.com
        ```

1. Use your new account for the your deployment

    ```yaml
    spec:
      serviceAccountName: YOUR_KUBERNETES_SERVICE_ACCOUNT
    ```



1. Configure secrets

    ```
    kubectl create secret generic YOUR_KEYCLOAK_SECRET_NAME \
    --from-literal=database=YOUR_KEYCLOAK_DB_NAME \
    --from-literal=username=YOUR_KEYCLOAK_USER_NAME \
    --from-literal=password=YOUR_KEYCLOAK_DB_PASS \
    --from-literal=postgre_url=jdbc:postgresql://127.0.0.1:5432/YOUR_KEYCLOAK_DB_NAME
    ```

1. Set the environments to Dirigible deployment.

    ```yaml
            env:
            - name: PORT
              value: "8080"
            - name: INSTANCE_HOST
              value: "127.0.0.1"
            - name: DB_PORT
              value: "5432"
            - name: DB_USER
              valueFrom:
                secretKeyRef:
                  name: <YOUR_KEYCLOAK_SECRET_NAME>
                  key: username
            - name: DB_PASS
              valueFrom:
                secretKeyRef:
                  name: <YOUR_KEYCLOAK_SECRET_NAME>
                  key: password
            - name: DB_NAME
              valueFrom:
                secretKeyRef:
                  name: <YOUR_KEYCLOAK_SECRET_NAME>
                  key: database
          - name: cloud-sql-proxy
            # This uses the latest version of the Cloud SQL proxy
            # It is recommended to use a specific version for production environments.
            # See: https://github.com/GoogleCloudPlatform/cloudsql-proxy
            image: gcr.io/cloudsql-docker/gce-proxy:latest
            command:
              - "/cloud_sql_proxy"

              # If connecting from a VPC-native GKE cluster, you can use the
              # following flag to have the proxy connect over private IP
              - "-ip_address_types=PRIVATE"

              # tcp should be set to the port the proxy should listen on
              # and should match the DB_PORT value set above.
              # Defaults: MySQL: 3306, Postgres: 5432, SQLServer: 1433
              - "-instances=<PROJECT_ID:REGION:KEYCLOAK_SQL_INSTANCE>=tcp:5432"
            securityContext:
              # The default Cloud SQL proxy image runs as the
              # "nonroot" user and group (uid: 65532) by default.
              runAsNonRoot: true
    ```
