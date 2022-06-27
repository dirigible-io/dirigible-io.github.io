---
title: Kubernetes
---

Setup in Kubernetes
===

You can deploy [Eclipse Dirigible](https://hub.docker.com/r/dirigiblelabs) Docker images, for example `dirigiblelabs/dirigible-all`, in a Kubernetes cluster.

!!! info "Prerequisites"
    - Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).
    - Access to [Kubernetes Cluster](https://kubernetes.io/docs/setup/pick-right-solution/) on IaaS provider of your choice.

## Steps
---

1. Create deployment configuration file: `deployment.yaml`

    === "Pod"

        ```yaml
        apiVersion: v1
        kind: Pod
        metadata:
          name: dirigible
        spec:
          containers:
            - name: dirigible
              image: dirigiblelabs/dirigible-all:latest
              imagePullPolicy: Always
              ports:
                - name: http
                  containerPort: 8080
        ```

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
    === "NodePort"

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
          type: ClusterIP
          selector:
            app: dirigible
        ---
        apiVersion: networking.k8s.io/v1
        kind: Ingress
        metadata:
          name: dirigible
        spec:
          rules:
            - host: dirigible.<kubernetes-ingress-host>
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

        !!! Note
            Replace `<kubernetes-ingress-host>` with your Ingress host.

1. Deploy to the Kubernetes Cluster with:

    ```
    kubectl apply -f deployment.yml

    kubectl apply -f service.yml
    ```


1. Open a web browser and go to: **`http://dirigible.<kubernetes-ingress-host>`**

    !!! Note
        - Replace `<kubernetes-ingress-host>` with your Ingress host.
        - Login with user **`dirigible`** and password **`dirigible`**, which are set by default in the Docker image _([dirigiblelabs/dirigible-all](https://hub.docker.com/r/dirigiblelabs/dirigible-all/tags))_ used above.

## Maintenance
---

### Version Update

To update the Eclipse Dirigible version either use the **kubectl** or update the **Deployment YAML** as follows:

=== "with kubectl"

    ```
    kubectl set image deployment/dirigible dirigible=dirigiblelabs/dirigible-all:<dirigible-version>
    ```

=== "with Deployment YAML"

    ```yaml hl_lines="4"
    spec:
      containers:
      - name: dirigible
        image: dirigiblelabs/dirigible-all:<dirigible-version>
        imagePullPolicy: Always
    ```

!!! tip "Eclipse Dirigible versions"

    Update the `<dirigible-version>` placeholder with a stable release version:

    - You can find all released versions [here](https://github.com/eclipse/dirigible/releases/).
    - You can find all Eclipse Dirigible Docker images and tags (versions) [here](https://hub.docker.com/u/dirigiblelabs).

### Scaling

The Eclipse Dirigible **Deployment** could be scaled horizontally by adding/removing **Pods** as follows:

=== "Scale to Zero"

    ```
    kubectl scale deployment/dirigible --replicas=0
    ```

=== "Scale Up"

    ```
    kubectl scale deployment/dirigible --replicas=<number-of-replicas>
    ```

!!! note

    To learn more about application scaling in Kubernetes, see [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/).


### Debugging

To debug the Eclipse Dirigible engine via **Remote Java Debugging** execute the following command:

```
kubectl port-forward deployment/dirigible 8000:8000
```
