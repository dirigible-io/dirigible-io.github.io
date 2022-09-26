---
title: Google Kubernetes Engine
---

Setup in Google Kubernetes Engine
===

Deploy Eclipse Dirigible in Google Kubernetes Engine (GKE) environment.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    - Access to [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/).

!!! info "Note"
    - Create [GKE cluster](addons/gke-cluster.md).
    - How to [create Google DNS Zone](addons/google-dns-zone.md) 
    - How to [setup Istio](addons/istio.md).
    - How to [create certificate for your domain](addons/letsencrypt.md).
    - How to [create GCP Cloud SQL instances](addons/postgresql.md)

## Steps
---

1. Access the Google Kubernetes Engine (GKE) environment via the Google Cloud Console:

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
                  image: dirigiblelabs/dirigible-all:latest
                  imagePullPolicy: Always
                  resources:
                    requests:
                      memory: "1Gi"
                      cpu: "0.5"
                    limits:
                      memory: "4Gi"
                      cpu: "2"
                  ports:
                    - name: http
                      containerPort: 8080
                  env:
                    - name: DIRIGIBLE_THEME_DEFAULT
                      value: "fiori"
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
                  image: dirigiblelabs/dirigible-all:latest
                  imagePullPolicy: Always
                  resources:
                    requests:
                      memory: "1Gi"
                      cpu: "0.5"
                    limits:
                      memory: "4Gi"
                      cpu: "2"
                  ports:
                    - name: http
                      containerPort: 8080
                  env:
                    - name: DIRIGIBLE_THEME_DEFAULT
                      value: "fiori"
                  volumeMounts:
                    - name: dirigible-data
                      mountPath: /usr/local/tomcat/target/dirigible/repository
              volumes:
                - name: dirigible-data
                  persistentVolumeClaim:
                    claimName: "dirigible-data"
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: dirigible-data
        spec:
          accessModes:
            - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
        ```

    === "Deployment with Keycloak"

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
                  image: dirigiblelabs/dirigible-keycloak:latest
                  imagePullPolicy: Always
                  resources:
                    requests:
                      memory: "1Gi"
                      cpu: "0.5"
                    limits:
                      memory: "4Gi"
                      cpu: "2"
                  ports:
                    - name: http
                      containerPort: 8080
                  env:
                    - name: DIRIGIBLE_THEME_DEFAULT
                      value: "fiori"
                    - name: DIRIGIBLE_KEYCLOAK_ENABLED
                      value: "true"
                    - name: DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL
                      value: <your-keycloak-auth-server>
                    - name: DIRIGIBLE_KEYCLOAK_REALM
                      value: <your-keycloak-realm>
                    - name: DIRIGIBLE_KEYCLOAK_SSL_REQUIRED
                      value: external
                    - name: DIRIGIBLE_KEYCLOAK_CLIENT_ID
                      value: <your-keycloak-client-id>
                    - name: DIRIGIBLE_KEYCLOAK_CONFIDENTIAL_PORT
                      value: "443"
                  volumeMounts:
                    - name: dirigible-data
                      mountPath: /usr/local/tomcat/target/dirigible/repository
              volumes:
                - name: dirigible-data
                  persistentVolumeClaim:
                    claimName: "dirigible-data"
        ---
        apiVersion: v1
        kind: PersistentVolumeClaim
        metadata:
          name: dirigible-data
        spec:
          accessModes:
            - ReadWriteOnce
          resources:
            requests:
              storage: 1Gi
        ```
        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-keycloak-auth-server>` with your Keycloak Auth server _(e.g. `https://keycloak-server/auth/`)_.
            - `<your-keycloak-realm>` with your Keycloak Realm _(e.g. `my-realm`)_.
            - `<your-keycloak-client-id>` with your Keycloak Client Id _(e.g. `my-client`)_.

    !!! tip "Eclipse Dirigible versions"
        Instead of using the `latest` tag (version), for production and development use cases it is recomended to use a stable release version:
        
        - All released versions can be found [here](https://github.com/eclipse/dirigible/releases/).
        - All Eclipse Dirigible Docker images and tags (versions) can be found [here](https://hub.docker.com/u/dirigiblelabs).

1. Create service configuration file: `service.yaml`

    === "Service"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: dirigible
          labels:
            app: dirigible
        spec:
          ports:
            - name: http
              port: 8080
          type: ClusterIP
          selector:
            app: dirigible
        ```
    === "Ingress"

        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: dirigible
          labels:
            app: dirigible
        spec:
          ports:
            - name: http
              port: 8080
          type: NodePort
          selector:
            app: dirigible
        ---
        apiVersion: networking.k8s.io/v1
        kind: Ingress
        metadata:
          name: dirigible
        spec:
          rules:
            - host: <set-your-domain-or-ip>
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

    === "Custom Domain"
        !!! info "Note"
            - You can find more information on this page: [GCP DNS Zone Setup](https://www.dirigible.io/help/setup/kubernetes/addons/google-dns-zone).

        !!! info "Prerequisites"
            - Install [Istio](https://istio.io/), if not already installed.
            - Install [cert-manager](https://cert-manager.io/), if not already installed.
            - Register your zone in `Google Cloud Platform` &#8594; `Cloud DNS`, if not already registered.            

        !!! note "Register DNS Record Set"
            - Get the Istio Ingress Gateway IP:

            ```
            kubectl get service -n istio-ingress istio-ingressgateway -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
            ```

            - Register DNS Record Set:

            ```
            gcloud dns record-sets transaction start --zone=<your-cloud-dns-zone-name>

            gcloud dns record-sets transaction add <istio-ingress-gateway-ip> \
            --name=dirigible.<your-custom-domain> \
            --ttl=300 \
            --type=A \
            --zone=<your-cloud-dns-zone-name>

            gcloud dns record-sets transaction execute --zone=<your-cloud-dns-zone-name>
            ```

        ```yaml
        apiVersion: cert-manager.io/v1
        kind: Certificate
        metadata:
          name: dirigible
        spec:
          secretName: dirigible
          issuerRef:
            name: letsencrypt
            kind: ClusterIssuer
          commonName: "dirigible.<your-custom-domain>"
          dnsNames:
          - "dirigible.<your-custom-domain>"
        ---
        apiVersion: networking.istio.io/v1beta1
        kind: Gateway
        metadata:
          name: dirigible-gateway
        spec:
          selector:
            istio: ingressgateway
          servers:
          - hosts:
            - dirigible.<your-custom-domain>
            port:
              name: http
              number: 80
              protocol: HTTP
            # Initially it should be commented, then uncomment to enforce https!
            # tls:
            #   httpsRedirect: true
            tls:
              httpsRedirect: false
          - hosts:
            - dirigible.<your-custom-domain>
            port:
              name: https-443
              number: 443
              protocol: HTTPS
            tls:
              credentialName: dirigible
              mode: SIMPLE
        ---
        apiVersion: networking.istio.io/v1alpha3
        kind: VirtualService
        metadata:
          name: dirigible
        spec:
          hosts:
          - dirigible.default.svc.cluster.local
          - dirigible.<your-custom-domain>
          gateways:
          - dirigible-gateway
          - mesh
          http:
          - match:
            - uri:
                prefix: /
            route:
            - destination:
                port:
                  number: 8080
                host: dirigible.default.svc.cluster.local
        ```

        !!! note "Replace Placeholders"
            Before deploying, replace the following placeholders:

            - `<your-cloud-dns-zone-name>` with your Cloud DNS Zone name _(e.g. `my-zone`)_.
            - `<istio-ingress-gateway-ip>` with your Istio Ingress Gateway IP _(e.g. `32.118.56.186`)_.
            - `<your-custom-domain>` with your custom domain _(e.g. `my-company.com`)_.

            To enforce HTTPS, after the initial deployment, update the following fragment:
            ```yaml
            # Initially it should be commented, then uncomment to enforce https!
            # tls:
            #   httpsRedirect: true
            ```

1. Deploy to the Google Kubernetes Engine Cluster with:

    ```
    kubectl apply -f deployment.yml

    kubectl apply -f service.yml
    ```

1. Open a web browser and go to: **`https://dirigible.<your-google-kubernetes-engine-domain>`**
