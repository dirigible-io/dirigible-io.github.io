---
title: Kubernetes, Keycloak, PostgreSQL & Dirigible
author: yordan.pavlov
---

This article is dedicated to the "production-ready" setup of Eclipse Dirigible in a Kubernetes cluster.

# Kubernetes, Keycloak, PostgreSQL & Dirigible

## Overview

In this article we are going to use **Kubernes** cluster, **Keycloak** IAM and **PostgreSQL** database for setting up a productive **Eclipse Dirigible** development platform. The target Kubernetes deployment is shown bellow:
![Diagram](/img/posts/20180625/diagram.png){: .img-responsive }

### _Kubernetes_
is an open source system for automating deployment, scaling, and management of containerized applications in a cluster environment. You can read more about Kubernetes [here](https://kubernetes.io/).

### _Keycloak_
is an open source Identity and Access Management system for applications and services. You can read more about Keycloak [here](https://www.keycloak.org/).

### _PostgreSQL_
is a powerful open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance. You can read more about PostgreSQL [here](https://www.postgresql.org/).

### _Eclipse Dirigible_
is a Cloud Development Platform providing development tools and runtime environment. It supports full development life-cycle of on-demand applications by leveraging in-system programming models and rapid application development techniques. You can read more about Dirigible [here](http://www.dirigible.io/).


## Prerequisites

In this article we assume that you have already running productive _**Kubernetes Cluster**_ and configured _**kubectl**_ for it. If you don't have such, you can create one by using the [GKE](https://cloud.google.com/kubernetes-engine/) or the open-source [Gardener](https://github.com/gardener) project. Also we need a configured _**Helm**_ _(The Kubernetes Package Manager)_, if you don't have it, you can follow [this installation guide](https://docs.helm.sh/using_helm/#installing-helm).

## Kubernetes Certificate Management Controller

**cert-manager** is a native Kubernetes certificate management controller. It can help with issuing certificates from a variety of sources, such as Let’s [Encrypt](https://letsencrypt.org/), HashiCorp Vault, or a simple signing keypair. You can read more about the cert-manager [here](https://cert-manager.readthedocs.io/).

```bash
helm install --name cert-manager --namespace kube-system stable/cert-manager
```

We are going to use cert-manager for issuing certificates for our access points to the Keycloak Admin Console and Eclipse Dirigible IDE.

## Namespaces and ClusterIssuer

### auth.yaml
```yaml
kind: Namespace
metadata:
  name: auth
...
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <your-email-address>
    privateKeySecretRef:
      name: letsencrypt-production
    http01: {}
```

> **Note:** For testing purposes it's recommended to use the **staging** Let's Encrypt server.

The whole YAML is available [here](/img/resources/yaml/auth.yaml). Before creating the Kubernetes resources, you should replace the placeholders with the correct values.

```bash
kubectl create -f auth.yaml
```

## Keycloak and PostgreSQL

### keycloak.yaml
```yaml
kind: StatefulSet
metadata:
  name: postgres
...
    spec:
      containers:
        - name: postgres
          image: postgres
          env:
            - name: PGDATA
              value: "/var/lib/postgresql/data/pgdata"
            - name: POSTGRES_USER
              value: "keycloak"
            - name: POSTGRES_PASSWORD
              value: "keycloak"
...
kind: Deployment
metadata:
  name: keycloak
...
    spec:
      containers:
      - name: keycloak
        image: jboss/keycloak
        env:
        - name: PROXY_ADDRESS_FORWARDING
          value: "true"
        - name: DB_VENDOR
          value: "postgres"
        - name: DB_USER
          value: "keycloak"
        - name: DB_PASSWORD
          value: "keycloak"
        - name: DB_ADDR
          value: "postgres-jdbc.auth"
        - name: KEYCLOAK_USER
          value: "admin"
        - name: KEYCLOAK_PASSWORD
          value: "admin"
...
kind: Ingress
metadata:
  name: keycloak
  annotations:
    ingress.kubernetes.io/ssl-redirect: "true"
    kubernetes.io/tls-acme: "true"
    certmanager.k8s.io/cluster-issuer: "letsencrypt-production"
    kubernetes.io/ingress.class: "nginx"
spec:
  tls:
  - hosts:
    - keycloak.<your-domain-name>
    secretName: keycloak-production-letsencrypt
  rules:
    - host: keycloak.<your-domain-name>
...
```

> **Note:** The maximum length of the host name (e.g. _**keycloak.{your-domain-name}**_) used for issuing Let's Encrypt certificate is 63 symbols.

The whole YAML is available [here](/img/resources/yaml/keycloak.yaml). Before creating the Kubernetes resources, you should replace the placeholders with the correct values.

```bash
kubectl create -f keycloak.yaml
```

## Dirigible and PostgreSQL

### dirigible.yaml
```yaml
kind: StatefulSet
metadata:
  name: postgres
...
    spec:
      containers:
        - name: postgres
          image: postgres
          env:
            - name: PGDATA
              value: "/var/lib/postgresql/data/pgdata"
            - name: POSTGRES_USER
              value: "dirigible"
            - name: POSTGRES_PASSWORD
              value: "dirigible"
...
kind: StatefulSet
metadata:
  name: dirigible
...
    spec:
      containers:
        - name: dirigible
          image: dirigiblelabs/dirigible-keycloak
          env:
            - name: DIRIGIBLE_DATABASE_PROVIDER
              value: "custom"
            - name: DIRIGIBLE_DATABASE_CUSTOM_DATASOURCES
              value: "POSTGRES"
            - name: POSTGRES_URL
              value: "jdbc:postgresql://postgres-jdbc.dirigible:5432/dirigible"
            - name: POSTGRES_USERNAME
              value: "dirigible"
            - name: POSTGRES_PASSWORD
              value: "dirigible"
            ...
            - name: KEYCLOAK_CONFIDENTIAL_PORT
              value: "443"
            - name: KEYCLOAK_SSL_REQUIRED
              value: "none"
            - name: KEYCLOAK_CLIENT_ID
              value: "dirigible"
            - name: KEYCLOAK_REALM
              value: "master"
            - name: KEYCLOAK_AUTH_SERVER_URL
              value: "https://keycloak.<your-domain-name>/auth"
...
kind: Ingress
metadata:
  annotations:
    ingress.kubernetes.io/ssl-redirect: "true"
    kubernetes.io/tls-acme: "true"
    certmanager.k8s.io/cluster-issuer: "letsencrypt-production"
    kubernetes.io/ingress.class: "nginx"
  name: dirigible
  namespace: dirigible
spec:
  tls:
  - hosts:
    - ide.<your-domain-name>
    secretName: dirigible-certificate
  rules:
    - host: ide.<your-domain-name>
```

> **Note:** The maximum length of the host name (e.g. _**ide.{your-domain-name}**_) used for issuing Let's Encrypt certificate is 63 symbols.

> The whole list of Eclipse Dirigible environment variables can be found [here](http://www.dirigible.io/help/setup_environment_variables.html)

The whole YAML is available [here](/img/resources/yaml/dirigible.yaml). Before creating the Kubernetes resources, you should replace the placeholders with the correct values.

```bash
kubectl create -f dirigible.yaml
```

## Add Keycloak Client and Users

Open the Keycloak welcome page (_**https://keycloak.{your-domain-name}**_) and click on the **Admin Console**, login with _**admin/admin**_ credentials (see _keycloak.yaml_).

1. Create new client named **dirigible**
1. For the **Root URL** add Root URL: _**http://ide.{your-domain-name>}**_
![Create Keycloak Client](/img/posts/20180625/add-client.png){: .img-responsive }
1. Add Client Roles:
    - Everyone
    - Developer
    - Operator
1. Create new user
![Create User](/img/posts/20180625/add-user.png){: .img-responsive }
1. Assign User's roles from the **dirigible** client
1. Set password from the **Credentials** tab
1. Open the Eclipse Dirigible IDE: _**http://ide.{your-domain-name}/**_ and login with the credentials that were created previously in the Keycloak Admin Console.
![Login](/img/posts/20180625/login.png){: .img-responsive }

The Keycloak documentation can be found [here](https://www.keycloak.org/docs/2.5/getting_started/index.html). Also you can find out how to enable Keycloak **Social Login** with GitHub [here](https://www.keycloak.org/docs/2.5/server_admin/topics/identity-broker/social/github.html).

## Credits

- [How to launch nginx-ingress and cert-manager in Kubernetes](https://medium.com/containerum/how-to-launch-nginx-ingress-and-cert-manager-in-kubernetes-55b182a80c8f)
