---
title: Letsencrypt
---


Letsencrypt Setup
===

Deploy Cert Manager in Kubernetes environment.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    - Install [Helm](https://helm.sh/docs/intro/install/)
    - Access to Kubernetes cluster.

## Steps


1. Create certificate for your domain or subdomain

    - Install cert-manager

    - Add Jetstack Helm repository: 
        ```
        helm repo add jetstack https://charts.jetstack.io
        ```

    - Update your local Helm chart repository cache: 
        ```
        helm repo update
        ```

    - Intall Ccert-manager and CustomResourceDefinitions:
        
        * Check the current version - `https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions`

        ```
        helm install \
        cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.9.1 \
        --set installCRDs=true
        ```

1. Create Cluster Issuer
    
    ```yaml
    apiVersion: cert-manager.io/v1alpha2
    kind: ClusterIssuer
    metadata:
      name: dirigible
    spec:
      acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: <your-email>
        privateKeySecretRef:
          name: dirigible
        http01: {}
    ```

1. Create certificate

    ```yaml
    apiVersion: cert-manager.io/v1
    kind: Certificate
    metadata:
      name: dirigible
    spec:
      secretName: dirigible
      issuerRef: 
        name: dirigible
        kind: ClusterIssuer
      commonName: "<your-domain>"
      dnsNames: 
      - "<your-domain>"
    ```

1. Create Ingress

    === "Kubernetes Ingress"

        ```yaml
        apiVersion: networking.k8s.io/v1
        kind: Ingress
        metadata:
        name: dirigible
        spec:
        rules:
            - host: dirigible
            http:
                paths:
                - path: /
                    pathType: Prefix
                    backend:
                    service:
                        name: dirigible
                        port:
                        number: 8080
        ```

    === "Istio Ingress"

        ```yaml
        apiVersion: networking.istio.io/v1alpha3
        kind: Gateway
        metadata:
          name: dirigible-gateway
        spec:
          selector:
            istio: ingressgateway
          servers:
          - port:
              number: 80
              name: http
              protocol: HTTP
            hosts:
            - dirigible.<your-domain>
            # Initially it should be commented, then uncomment to enforce https!
            # tls:
            #   httpsRedirect: true
          - port:
              number: 443
              name: https-443
              protocol: HTTPS
            hosts:
            - dirigible.<your-domain>
            tls:
              mode: SIMPLE 
              credentialName: dirigible
        ```

        !!! note "Install Istio"
           - Install [istioctl](https://istio.io/latest/docs/setup/install/istioctl/)
           - Install [istio](https://istio.io/latest/docs/setup/install/)
           - You can install with default profile ```istioctl install``` this will install `istio-ingressgateway` and `istiod`

    !!! note "Replace Placeholders"
           - `<your-domain>` with your domain from previous step
