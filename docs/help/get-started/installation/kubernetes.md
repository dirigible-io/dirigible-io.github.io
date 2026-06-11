---
title: Kubernetes
description: Deploy Dirigible on a Kubernetes cluster.
---

# Kubernetes

Dirigible runs on any Kubernetes cluster as a single workload, optionally fronted by an Ingress or service mesh.

## Helm

The maintained Helm chart is the fastest path:

```bash
helm repo add dirigible https://eclipse.github.io/dirigible
helm repo update
helm install dirigible dirigible/dirigible
```

Find the chart on Artifact Hub: [artifacthub.io/packages/search?org=dirigiblelabs](https://artifacthub.io/packages/search?org=dirigiblelabs).

## Cloud-specific guides

Detailed end-to-end walkthroughs live under [/help/setup/kubernetes/](/help/setup/kubernetes/):

- [Helm chart reference](/help/setup/kubernetes/helm)
- [Google Kubernetes Engine](/help/setup/kubernetes/gke)
- [Azure Kubernetes Service](/help/setup/kubernetes/aks)
- [Red Hat OpenShift](/help/setup/kubernetes/openshift)
- [SAP BTP Kyma](/help/setup/kubernetes/kyma)

Add-ons (Keycloak, PostgreSQL, DNS zone configuration, etc.) are documented under the same tree.

## Next

- [Your first application](/help/get-started/first-application)
- [Tour the IDE](/help/get-started/ide-tour)
