---
title: Kubernetes
---

Setup in the Kubernetes environment
===


You can deploy Docker based images, for example [dirigiblelabs/dirigible-tomcat](https://hub.docker.com/r/dirigiblelabs/dirigible-tomcat/) on the Kubernetes Cluster.

Prerequisites
---

- [Kubernetes Command Line Interface](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Kubernetes Cluster](https://kubernetes.io/docs/setup/pick-right-solution/) on IaaS provider of your choice

Steps
---

1. Create an YAML deployment configuration *dirigible.yml*

  ```yaml
  apiVersion: v1
  kind: Namespace
  metadata:
    name: dirigible
  ---
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: dirigible
    namespace: dirigible
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
              - containerPort: 8080
                name: dirigible
            volumeMounts:
              - name: dirigible-data
                mountPath: /usr/local/tomcat/dirigible
            env:
              - name: DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER
                value: /usr/local/tomcat/dirigible/repository
              - name: DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER_IS_ABSOLUTE
                value: "true"
              - name: DIRIGIBLE_DATABASE_H2_ROOT_FOLDER_DEFAULT
                value: /usr/local/tomcat/dirigible/h2
              - name: DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER
                value: /usr/local/tomcat/dirigible/cmis
              - name: DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE
                value: "true"
              - name: DIRIGIBLE_LOG_FOLDER
                value: /usr/local/tomcat/logs
              - name: DIRIGIBLE_THEME_DEFAULT
                value: "fiori"
        volumes:
          - name: dirigible-data
            persistentVolumeClaim:
              claimName: "dirigible-data"
  ---
  apiVersion: v1
  kind: Service
  metadata:
    name: dirigible
    namespace: dirigible
    labels:
      app: dirigible
  spec:
    ports:
    - port: 8080
      name: dirigible
    clusterIP: None
    selector:
      app: dirigible
  ---
  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    name: dirigible
    namespace: dirigible
  spec:
    rules:
      - host: dirigible.<kubernetes-ingress-host>
        http:
          paths:
            - path: /
              backend:
                serviceName: dirigible
                servicePort: 8080
  ---
  apiVersion: v1
  kind: PersistentVolumeClaim
  metadata:
    name: dirigible-data
    namespace: dirigible
  spec:
    accessModes:
      - ReadWriteOnce
    volumeMode: Filesystem
    resources:
      requests:
        storage: 1Gi
  ```
2. Replace <kubernetes-ingress-host> in dirigible.yml with your Ingress Host

3. Deploy on the Kubernetes Cluster with:

  > kubectl apply -f dirigible.yml

4. Open a web browser and go to:

  > [http://dirigible.<kubernetes-ingress-host<kubernetes-ingress-host>>](http://dirigible.<kubernetes-ingress-host<kubernetes-ingress-host>>)

5. Login with user *dirigible* and password *dirigible*, which are set by default in the Docker image used above.
