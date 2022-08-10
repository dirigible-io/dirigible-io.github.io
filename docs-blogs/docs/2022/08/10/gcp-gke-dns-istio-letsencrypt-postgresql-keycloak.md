---
title: Custom Domain in Google Kubernetes Engine with GCP Cloud DNS, Cloud SQL, Istio, Let's encrypt, PostgreSQL and Keycloak
description: In this article we are going to setup custom domain for Dirigible application in Google Kubernetes Engine cluster with GCP Cloud DNS, GCP Cloud SQL Postgre, Istio, Let's encrypt and Keycloak.
author: Krasimir Dermendzhiev
author_gh_user: krasimirdermendzhiev
author_avatar: https://avatars.githubusercontent.com/u/82384876?v=4
read_time: 15 min
publish_date: August 10, 2022
---


## Overview

In this article we are going to setup custom domain for **Dirigible** application in **GKE** cluster with **GCP Cloud DNS**, **GCP Cloud SQL Postgre**, **Istio**, **Let's encrypt**, **Keycloak**.

Components:
![gcp-gke-dns-istio-letsencrypt-postgresql-keycloak](/img/posts/20220810/gcp-gke-dns-istio-letsencrypt-postgresql-keycloak.png)


=== "Kubernetes"

    !!! tip "Overview"

        Kubernetes is an open source system for automating deployment, scaling, and management of containerized applications in a cluster environment. You can read more about Kubernetes [here](https://kubernetes.io/).

=== "GCP Cloud DNS"

    !!! tip "Overview"

        Reliable, resilient, low-latency DNS serving from Google's worldwide network with everything you need to register, manage, and serve your domains. [here](https://cloud.google.com/dns).


=== "GCP Cloud SQL Postgre"

    !!! tip "Overview"

        Fully managed relational database service for MySQL, PostgreSQL, and SQL Server with rich extension collections, configuration flags, and developer ecosystems. [here](https://cloud.google.com/sql.


=== "Istio"

    !!! tip "Overview"

        Istio is an open source service mesh that layers transparently onto existing distributed applications. Istio’s powerful features provide a uniform and more efficient way to secure, connect, and monitor services. [here](https://istio.io/).

=== ""Let's encrypt"

    !!! tip "Overview"

        Istio is an open source service mesh that layers transparently onto existing distributed applications. Istio’s powerful features provide a uniform and more efficient way to secure, connect, and monitor services. [here](https://letsencrypt.org/).

=== "Cert-manager"

    !!! tip "Overview"

        cert-manager is a powerful and extensible X.509 certificate controller for Kubernetes and OpenShift workloads. It will obtain certificates from a variety of Issuers, both popular public Issuers as well as private Issuers, and ensure the certificates are valid and up-to-date, and will attempt to renew certificates at a configured time before expiry. [here](https://cert-manager.io/).

=== "Keycloak"

    !!! tip "Overview"

        Open Source Identity and Access Management. [here](https://www.keycloak.org/).


## Prerequisites

In this article we assume that you have already [GCP account](https://cloud.google.com/) and added billing account.


## GKE cluster configuration

!!! info "Prerequisites"
    - Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install)
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/) and [configure cluster access](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#default_cluster_kubectl)
    - Install [Helm](https://helm.sh/docs/intro/install/)

1.  Create project

    Go to [create your project](https://console.cloud.google.com/projectcreate).

    * Set name, organization and billing account.
    ![create-project](/img/posts/20220810/create-project.png)

1. Enable Engine Api 

    * To be able to create cluster we need to enable Kubernetes Api.

    Go to [enable Kubernetes API](https://console.cloud.google.com/kubernetes)
    ![gcp-gke-dns-istio-letsencrypt-postgresql-keycloak](/img/posts/20220810/gke-api.png)

1. Create GKE cluster

  You can create standard and autopilot cluster in ths article we will create standard cluster.
  At this time you have two options to create cluster `manually` or by `Use a setup guide`. 

  * Manually.
  ![create-manually-cluster](/img/posts/20220810/create-manually-cluster.png) 

  * Use a setup guide.
    In this article we will `use a setup guide ` and `cost-optimized cluster`. 
    ![create-setup-guide](/img/posts/20220810/create-setup-guide.png) 
  
  * Pick up the suitable location and name for you.
  ![cost-optimized-cluster](/img/posts/20220810/pick-name-location.png)

  * Set release channel.
    We are going to set `Regular channel` is two months after new release.
  ![set-release-channel](/img/posts/20220810/set-release-channel.png)

  * Choose cluster size.
    In this article we are going to keep the default size.
  ![set-cluster-size](/img/posts/20220810/set-cluster-size.png)

  * Verify machine type.

  ![verify-machine-type](/img/posts/20220810/verify-machine-type.png)

  * Advanced settings.
    - In this article we will use `Optimize utilization`.
      Prioritize optimizing utilization over keeping spare resources in the cluster. When selected, the cluster autoscaler scales down the cluster more aggressively: it can remove more nodes, and remove nodes faster.
    - For cluster autoscaler you can configure how many maximum nodes to scale. It's depend on your requirements. For this article we are going to keep this configuration maximum nodes `3`. 
    - Vertical Pod Autoscalling will be enable to sure the pods will deploy on the right node.
  ![advanced-settings](/img/posts/20220810/advanced-settings.png)

  * Configure usage metering.
    - In this article we are not using metering.
      ![configure-usage-metering](/img/posts/20220810/configure-usage-metering.png)

### Enable Workload Identity
We need workload identity to allow our Dirigible pod to access PostgreSQL
* Cluster Workload Identity
  ![cluster-workload-identity](/img/posts/20220810/cluster-workload-identity.png)
* Node Workload Identity
  ![node-workload-identity](/img/posts/20220810/node-workload.png)

## Istio configuration

!!! info "Note"        
    - In this article we will configure istioctl to use the configmaps from 1-14-3 revision. We can run multiple versions of Istio concurrently and can specify exactly which revision gets applied in the tooling.

  * Enable the specific GKE cluster as the default cluster to be used for the remaining commands

    ```
    gcloud container clusters get-credentials dirigible \
      --region europe-north1-a
    ```

  * Create istio-system namespace and add label istio-injection

    ```
    kubectl create namespace istio-system
    ```

    ```
    kubectl label namespace istio-system istio-injection=enabled --overwrite
    ```

  * Create Istio control plane service istiod

```yaml
kubectl apply -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  labels:
    app: istiod
    istio: pilot
    release: istio
  name: istiod
  namespace: istio-system
spec:
  type: ClusterIP  
  ports:
  - name: grpc-xds
    port: 15010
  - name: https-dns
    port: 15012
  - name: https-webhook
    port: 443
    targetPort: 15017
  - name: http-monitoring
    port: 15014
  selector:
    app: istiod
EOF
```

  * Install minimal control plane

```yaml
istioctl install -y -n istio-system --revision 1-14-3 -f - <<EOF
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: control-plane
spec:
  profile: minimal
  values:
    gateways:
      istio-ingressgateway:
        autoscaleEnabled: true
  components:
    pilot:
      k8s:
        env:                                                                            
        - name: PILOT_FILTER_GATEWAY_CLUSTER_CONFIG                                                  
          value: "true"
  meshConfig:              
    defaultConfig:       
      proxyMetadata:      
        ISTIO_META_DNS_CAPTURE: "true"
    enablePrometheusMerge: true  
EOF
```

  * Enable istio-ingressgateway component

    - Install the istio-ingress gateway in a namespace that is different than istiod and add tag istio-injection

      ```
      kubectl create namespace istio-ingress
      ```

    - Install it with a revision that matches the control plane in the istio-system namespace.

```yaml
istioctl install -y -n istio-ingress --revision 1-14-3 -f - <<EOF
apiVersion: install.istio.io/v1alpha1
kind: IstioOperator
metadata:
  name: istio-ingress-gw-install
spec:
  profile: empty
  values:
    gateways:
      istio-ingressgateway:
        autoscaleEnabled: true
  components:
    ingressGateways:
    - name: istio-ingressgateway
      namespace: istio-ingress
      enabled: true
      k8s:
        overlays:
        - apiVersion: apps/v1
          kind: Deployment
          name: istio-ingressgateway
          patches:
          - path: spec.template.spec.containers[name:istio-proxy].lifecycle
            value:
              preStop:
                exec:
                  command: ["sh", "-c", "sleep 5"]      
EOF
```

  * Apply Strict mTLS 
  
    - Encrypt traffic between services in the mesh with mutual TLS.

```yaml
kubectl apply --namespace istio-system -f - <<EOF
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
spec:
  mtls:
    mode: STRICT
EOF
```

## GCP Cloud DNS configuration

  * Enable Cloud DNS Api
    Go to [page](https://console.cloud.google.com/marketplace/product/google/dns.googleapis.com) and enable api.

    ![enable-cloud-dns](/img/posts/20220810/clouddns-api.png)

  * Create Cloud DNS Zone
    Go to [page](https://console.cloud.google.com/net-services/dns/zones/new/create)
    ![create-dns-zone](/img/posts/20220810/create-dns-zone.png)

  * Copy dns name servers and add to your domain for subdomain example ( demo.apps.dirigible.io )
      Which look like this:
      ```
      ns-cloud-e1.googledomains.com.
      ns-cloud-e2.googledomains.com.
      ns-cloud-e3.googledomains.com.
      ns-cloud-e4.googledomains.com.
      ```
      ![copy-dns-name-servers](/img/posts/20220810/dns-nameservers.png)

  * Create A record
      - Which will be using for Dirigible certificate and deployment.
      ![copy-dns-name-servers](/img/posts/20220810/dns-nameservers.png)

      - We need Istio Gateway IP 
        ```
        kubectl get svc -n istio-ingress istio-ingressgateway -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
        ```

      - Promote ephemeral IP address to reserver
          You need to create the IP address in your region.
        ```
        gcloud compute addresses create demo --addresses=<YOUR-GATEWAY-IP> \
        --region=europe-north1
        ```

      - Set the ip
        ![create-a-record](/img/posts/20220810/create-a-record.png)

## Let's encrypt configuration

  * Install Cert-manager
    - Check for [last version](https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions)

  * Add cert-manager helm repo
    
    ```
    helm repo add jetstack https://charts.jetstack.io
    helm repo update
    ```

  * Install cert-manager

    ```
    helm install \
    cert-manager jetstack/cert-manager \
    --namespace cert-manager \
    --create-namespace \
    --version v1.9.1 \
    --set installCRDs=true
    ```

  * Create ClusterIssuer

```yaml
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
  namespace: cert-manager
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <YOUR-EMAIL-ADDRESS>
    privateKeySecretRef:
      name: letsencrypt
    solvers:
    - selector: {}
      http01:
        ingress:
          class: istio
EOF
```

## GCP Cloud SQL Postgre configuration

  * Enable Cloud SQL Api and create instance
    Go to [page](https://console.cloud.google.com/sql/instances)

  * Enable Cloud SQL Admin API
    Go to [page](https://console.cloud.google.com/flows/enableapi?apiid=sqladmin)

  * Choose PostgreSQL database engine
    ![choose-postgresql-database-engine](/img/posts/20220810/choose-postgresql-database-engine.png)

!!! note "Note"
    For this article we will create separate instances for Dirigible and Keycloak. You can follow this steps for Dirigible and just rename the instance to be `keycloak`.

  * Create instance
    - Set instance info, production
    ![sql-configuration-1](/img/posts/20220810/sql-configuration-1.png)
    
    - Set region, machine type, storage
    ![set-region-machine-storage](/img/posts/20220810/sql-region-machine-storage.png)

    - Set connections
      We need to [Enable Service Networking API](https://console.cloud.google.com/apis/library/servicenetworking.googleapis.com)
      ![set-connections](/img/posts/20220810/set-connections.png)

    - Set data protection and maintance
      ![set-data-protection-maintance](/img/posts/20220810/set-data-protection-maintenance.png)

    - After you create the instance update the configuration for connections
      ![set-only-ssl-connections](/img/posts/20220810/allow-ssl-connections.png)

### Setup Dirigible database

!!! note "Note"
    Create the same way database and user for Keycloak

  * Create database
    Go to [your PostgreSQL instance](https://console.cloud.google.com/sql/instances/) and create database.
    ![create-database](/img/posts/20220810/create-database.png)

  * Create user
    Go to [your PostgreSQL instance](https://console.cloud.google.com/sql/instances/) and create user.
    ![create-user](/img/posts/20220810/create-user.png)

  * Create service account
    ![create-sa](/img/posts/20220810/dirigible-service-account.png)

  * Add IAM policy binding
    ![create-binding](/img/posts/20220810/add-iam-binding.png)
    
    or with `gcloud`
    ```
    gcloud projects add-iam-policy-binding dirigible-gke-demo \
    --member="serviceAccount:keycloak-gcp-sa@dirigible-gke-demo.iam.gserviceaccount.com" \
    --role="roles/cloudsql.client"
    ```

### Create a Dirigible and Keycloak Kubernetes Service Account

  * Create namespace `dirigible-demo` 

    ```
    kubectl create namespace dirigible-demo
    ```
  
  * Add Istio injection

    ```
    kubectl label namespace dirigible-demo istio-injection=enabled --overwrite
    ```

  * Configure kubernetes service account binding to the Google Cloud service account using Workload Identity.

    ```
    k create sa dirigible-sa -n dirigible-demo
    ```

    ```
    k create sa keycloak-sa -n dirigible-demo
    ```

  * Add new binding.

    ![iam-binding](/img/posts/20220810/iam-binding.png)


    - Dirigible

      ```
      gcloud iam service-accounts add-iam-policy-binding \
      --role="roles/iam.workloadIdentityUser" \
      --member="serviceAccount:dirigible-gke-demo.svc.id.goog[dirigible-demo/dirigible-sa]" \
      dirigible-gcp-sa@dirigible-gke-demo.iam.gserviceaccount.com
      ```

    - Keycloak

      ```
      gcloud iam service-accounts add-iam-policy-binding \
      --role="roles/iam.workloadIdentityUser" \
      --member="serviceAccount:dirigible-gke-demo.svc.id.goog[dirigible-demo/keycloak-sa]" \
      keycloak-gcp-sa@dirigible-gke-demo.iam.gserviceaccount.com
      ```

  * Annotate the Kubernetes Service Account with the new binding
    
    - Dirigible
    
      ```
      kubectl annotate serviceaccount -n dirigible-demo \
      dirigible-sa  \
      iam.gke.io/gcp-service-account=dirigible-gcp-sa@dirigible-gke-demo.iam.gserviceaccount.com
      ```

    - Keycloak

      ```
      kubectl annotate serviceaccount -n dirigible-demo \
      keycloak-sa  \
      iam.gke.io/gcp-service-account=keycloak-gcp-sa@dirigible-gke-demo.iam.gserviceaccount.com
      ```

  * Create secrets for kubernetes service accounts

    - Dirigible

      ```
      kubectl create secret generic dirigible-db -n dirigible-demo \
      --from-literal=username=dirigible_user \
      --from-literal=password=":I8['/,(p:a|c3s]" \
      --from-literal=database=dirigible \
      --from-literal=postgre_url=jdbc:postgresql://127.0.0.1:5432/dirigible
      ```

    - Keycloak

      ```
      kubectl create secret generic keycloak-db -n dirigible-demo \
      --from-literal=username=keycloak_user \
      --from-literal=password='q7So\/Q>;5kzUZ6:' \
      --from-literal=database=keycloak \
      --from-literal=postgre_url=jdbc:postgresql://127.0.0.1:5432/keycloak
      ```

## Dirigible deploy

  * When you run this Dirigible helm chart with this sets. This will create `volume`, enable `https`, install `keycloak`, create `Istio gateway and virtualservice`, enable usages for `GCP Cloud SQL`. We don't need to create service account for Dirigible annd Keycloak, because is created in previous steps. We need to provide `gke.projectId`, `gke.region`, `ingress.host`.

```
helm upgrade --install dirigible dirigible -n dirigible-demo \
--set volume.enabled=true \
--set serviceAccount.create=false \
--set keycloak.serviceAccountCreate=false \
--set ingress.tls=true \
--set keycloak.enabled=true \
--set keycloak.install=true \
--set istio.enabled=true \
--set istio.enableHttps=true \
--set gke.cloudSQL=true \
--set gke.projectId=dirigible-gke-demo \
--set gke.region=europe-north1 \
--set ingress.host=demo.apps.dirigible.io
```

## Check the logs on the cert-manager pod

```
kubectl logs -n cert-manager -lapp=cert-manager |  grep -i "READY"
```

You shoud see something similar, that's mean the certificate is ready and we can redirect http traffic to https.

```
I0809 13:58:22.750528       1 conditions.go:190] Found status change for Certificate "keycloak" condition "Ready": "False" -> "True"; setting lastTransitionTime to 2022-08-09 13:58:22.750516762 +0000 UTC m=+18939.377721330
I0809 13:58:22.781247       1 conditions.go:190] Found status change for Certificate "keycloak" condition "Ready": "False" -> "True"; setting lastTransitionTime to 2022-08-09 13:58:22.781230149 +0000 UTC m=+18939.408434691
I0809 13:58:23.193897       1 conditions.go:250] Found status change for CertificateRequest "dirigible-spnjm" condition "Ready": "False" -> "True"; setting lastTransitionTime to 2022-08-09 13:58:23.193882791 +0000 UTC m=+18939.821087330
I0809 13:58:23.347574       1 conditions.go:190] Found status change for Certificate "dirigible" condition "Ready": "False" -> "True"; setting lastTransitionTime to 2022-08-09 13:58:23.347561322 +0000 UTC m=+18939.974765874
```
We can add to our helm deploy the `httpsRedirect: false` and run again to update.

```
helm upgrade --install dirigible dirigible -n dirigible-demo \
--set volume.enabled=true \
--set serviceAccount.create=false \
--set keycloak.serviceAccountCreate=false \
--set ingress.tls=true \
--set keycloak.enabled=true \
--set keycloak.install=true \
--set istio.enabled=true \
--set istio.enableHttps=true \
--set gke.cloudSQL=true \
--set gke.projectId=dirigible-gke-demo \
--set gke.region=europe-north1 \
--set ingress.host=demo.apps.dirigible.io \
--set httpsRedirect=true
```

## Keycloak configuration

!!! note "Note"
    You need change `demo.apps.dirigible.io` with your domain.

At the first run when we will try to open `https://dirigible.demo.apps.dirigible.io` will see 
![keycloak-configure-client](/img/posts/20220810/keycloak-configure-client.png)

1. We need to creat clientId `dirigible` go to `https://keycloak.demo.apps.dirigible.io/auth/admin/master/console/#/realms/master/clients`
![create-clientid](/img/posts/20220810/keycloak-create-cliendid.png)


1. Add Role – Open new client and add new roles Developer, Operator, Everyone.  
![create-default-roles](/img/posts/20220810/create-default-roles.png)

1. Add Default Roles – `Roles->Default Roles` add all roles from previous step
![keycloak-add-default-roles](/img/posts/20220810/keycloak-default-roles.png) 

1. Add user – add one of the role or Everyone from Role Mappings and Client Roles
Go to [page](https://keycloak.demo.apps.dirigible.io/auth/admin/master/console/#/create/user/master)
![add-user](/img/posts/20220810/keycloak-add-user.png)

1. Add password
![keycloak-add-password](/img/posts/20220810/keycloak-add-password.png)

1. Valid Redirect url 
![valid-recirect](/img/posts/20220810/valid-redirect.png)
