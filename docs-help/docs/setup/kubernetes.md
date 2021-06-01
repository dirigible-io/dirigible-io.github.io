---
title: Kubernetes
---

Setup in Kubernetes
===


You can deploy [Dirigible](https://hub.docker.com/r/dirigiblelabs) Docker images, for example `dirigiblelabs/dirigible-tomcat`, in a Kubernetes cluster.

Prerequisites
---

- [Kubernetes Command Line Interface](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Kubernetes Cluster](https://kubernetes.io/docs/setup/pick-right-solution/) on IaaS provider of your choice

Steps
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
              image: dirigiblelabs/dirigible-tomcat:latest
              ports:
                - name: dirigible
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
                  image: dirigiblelabs/dirigible-tomcat:latest
                  ports:
                    - name: dirigible
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
                  image: dirigiblelabs/dirigible-tomcat:latest
                  ports:
                    - name: dirigible
                      containerPort: 8080
                  env:
                    - name: DIRIGIBLE_THEME_DEFAULT
                      value: "fiori"
                  volumeMounts:
                    - name: dirigible-data
                      mountPath: /usr/local/tomcat/dirigible
              volumes:
                - name: dirigible-data
                  persistentVolumeClaim:
                    claimName: "dirigible-data"
        --
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
            - name: dirigible
              port: 8080
          type: ClusterIP
          selector:
            app: dirigible
        apiVersion: extensions/v1beta1
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
            - name: dirigible
              port: 8080
          type: ClusterIP
          selector:
            app: dirigible
        ---
        apiVersion: extensions/v1beta1
        kind: Ingress
        metadata:
          name: dirigible
        spec:
          rules:
            - host: dirigible.<kubernetes-ingress-host>
              http:
                paths:
                  - path: /
                    backend:
                      serviceName: dirigible
                      servicePort: 8080
        ```

        Replace `<kubernetes-ingress-host>` with your Ingress host.

1. Deploy to the Kubernetes Cluster with:

    ```
    kubectl apply -f deployment.yml

    kubectl apply -f service.yml
    ```


1. Open a web browser and go to: **`http://dirigible.<kubernetes-ingress-host>`**

	!!! info "Note"
		Replace `<kubernetes-ingress-host>` with your Ingress host.

1. Login with user `dirigible` and password `dirigible`, which are set by default in the Docker image _([dirigiblelabs/dirigible-tomcat](https://hub.docker.com/r/dirigiblelabs/dirigible-tomcat/tags))_ used above.

!!! info "Helm"
    The `helm` package manager could be used to install Eclipse Dirigible via Helm [Chart](https://artifacthub.io/packages/search?page=1&org=dirigiblelabs).

    Example:

    ```
    helm repo add dirigible https://eclipse.github.io/dirigible
    helm repo update
    helm install dirigible dirigible/dirigible
    ```

    More about the setup with Helm can be found [here](../helm/).
