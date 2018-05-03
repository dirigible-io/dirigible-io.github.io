---
layout: help
title: Kubernetes
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


You can deploy Docker based images, for example [dirigiblelabs/dirigible-tomcat](https://hub.docker.com/r/dirigiblelabs/dirigible-tomcat/) on the Kubernetes Cluster.

Prerequisites
---

- [Kubernetes Command Line Interface](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Kubernetes Cluster](https://kubernetes.io/docs/setup/pick-right-solution/) on IaaS provider of your choice

Steps
---

1. Create an YAML deployment configuration `dirigible.yml`

```yaml

---
apiVersion: v1
kind: Service
metadata:
  name: dirigible
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
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: dirigible
spec:
  serviceName: "dirigible"
  replicas: 1
  template:
    metadata:
      labels:
        app: dirigible
    spec:
      terminationGracePeriodSeconds: 10
      containers:
        - name: dirigible
          image: dirigiblelabs/dirigible-tomcat:latest
          ports:
            - containerPort: 8080
              name: dirigible
          volumeMounts:
            - name: root
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
      serviceAccountName: dirigible
  volumeClaimTemplates:
    - metadata:
        name: root
      spec:
        accessModes: [ "ReadWriteOnce" ]
        resources:
          requests:
            storage: 1Gi
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/tls-acme: "true"
  name: dirigible
spec:
  rules:
    - host: dirigible.apps.eu-central-1.<your-host>
      http:
        paths:
          - path: /
            backend:
              serviceName: dirigible
              servicePort: 8080
---

apiVersion: v1
kind: ServiceAccount
metadata:
  name: dirigible
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
---
apiVersion: rbac.authorization.k8s.io/v1alpha1
kind: ClusterRole
metadata:
  name: dirigible
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
rules:
  - apiGroups:
    - '*'
    attributeRestrictions: null
    resources:
    - '*'
    verbs:
    - '*'
  - attributeRestrictions: null
    nonResourceURLs:
    - '*'
    verbs:
    - '*'
---
apiVersion: rbac.authorization.k8s.io/v1alpha1
kind: ClusterRoleBinding
metadata:
  name: dirigible
  labels:
    kubernetes.io/cluster-service: "true"
    addonmanager.kubernetes.io/mode: Reconcile
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: dirigible
subjects:
  - kind: ServiceAccount
    name: dirigible

```

2. Deploy on the Kubernetes Cluster with:

		kubectl apply -f dirigible.yml

3. Open a web browser and go to:

        http://dirigible.[Kubernetes Platform Host]/

4. Login with user `dirigible` and password `dirigible`, which are set by default in the Docker image used above.
