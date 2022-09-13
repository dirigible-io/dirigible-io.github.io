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

1. Install cert-manager:

    - Add Jetstack Helm repository: 

        ```
        helm repo add jetstack https://charts.jetstack.io
        ```

    - Update your local Helm chart repository cache: 

        ```
        helm repo update
        ```

    - Intall **cert-manager** and **CustomResourceDefinitions**:
        
        ```
        helm install \
        cert-manager jetstack/cert-manager \
        --namespace cert-manager \
        --create-namespace \
        --version v1.9.1 \
        --set installCRDs=true
        ```

        !!! note

            Check the current version of the [Installation with Helm](https://cert-manager.io/docs/installation/helm/#3-install-customresourcedefinitions).


1. Create Cluster Issuer:
    
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
    !!! note
    
        Replace the `<your-email>` placeholder with valid email address.


    !!! note "Update ClusterIssuer"

        If your ingress is **Istio** change the **ClusterIssuer** and add:

        ```
        solvers:
        - selector: {}
          http01:
            ingress:
              class: istio
        ```

1. Create certificate:

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

    !!! note

        Replace the `<your-domain>` placeholder with your domain from previous step.

    !!! note "Add Namespace"

        If your **Istio Ingress** is installed to namespace **istio-ingress** add `namespace: istio-ingress`.

1. Create Ingress:

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

        !!! note "Note"

            - You can install `istio` with default profile `istioctl install` this will install `istio-ingressgateway` and `istiod` and you can install [manually](istio.md):

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

            - Replace the `<your-domain>` placeholder with your domain from previous step.

            - Create Virtual Service for Istio:
      
            ```yaml
            apiVersion: networking.istio.io/v1beta1
            kind: VirtualService
            metadata:
              name: dirigible
            spec:
              hosts:
              - "dirigible.<your-domain>"
              gateways:
              - dirigible-gateway
              - mesh
              http:
              - match:
                - uri:
                    prefix: /
                route:
                - destination:
                      host: dirigible.default.svc.cluster.local
                      port:
                        number: 8080
            ```

            - Replace the `<your-domain>` placeholder with your domain from previous step.

1. Check certificate status in cert-manager:

    ```
    kubectl logs -n cert-manager -lapp=cert-manager
    ```
