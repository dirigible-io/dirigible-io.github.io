---
title: Helm install
description: Recommended Kubernetes install path - Helm chart.
---

# Helm install

The Helm chart packages Dirigible plus optional addons (Keycloak, PostgreSQL, Let's Encrypt). Use it as the default Kubernetes install path.

## Prerequisites

- A reachable Kubernetes cluster (GKE / AKS / OpenShift / Kyma / on-prem).
- `kubectl` configured to target it.
- Helm 3.x.

## Add the repository

```bash
helm repo add dirigible https://dirigiblelabs.github.io/helm
helm repo update
```

## Install

```bash
helm install dirigible dirigible/dirigible \
    --namespace dirigible --create-namespace
```

Wait for the deployment to come up:

```bash
kubectl -n dirigible rollout status deploy/dirigible
```

## Default settings

Out of the box the chart deploys:

- A single Dirigible pod (Spring Boot fat jar).
- File-backed H2 on a `PersistentVolumeClaim`.
- A `ClusterIP` service on port 8080.
- An optional ingress (disabled by default - enable via values).

## Production values

```yaml
# values.production.yaml
image:
  repository: dirigiblelabs/dirigible
  tag: "<pin>"
replicaCount: 2

env:
  DIRIGIBLE_BASIC_USERNAME: "admin"
  DIRIGIBLE_BASIC_PASSWORD:
    valueFrom:
      secretKeyRef: { name: dirigible-secrets, key: basic-password }
  DIRIGIBLE_MULTI_TENANT_MODE: "true"
  DIRIGIBLE_TENANT_SUBDOMAIN_REGEX: '(.+)\\.dirigible\\.example\\.com'

postgres:
  enabled: true        # bundled subchart
  # OR connect to external Postgres via DIRIGIBLE_DATASOURCE_DEFAULT_*

ingress:
  enabled: true
  host: "*.dirigible.example.com"
  tls:
    enabled: true
    secretName: dirigible-tls
```

```bash
helm upgrade --install dirigible dirigible/dirigible \
    --namespace dirigible -f values.production.yaml
```

## Probes

The chart wires Kubernetes liveness / readiness probes to the platform's Actuator endpoints (`/actuator/health/liveness`, `/actuator/health/readiness`). See [`/help/operate/health-checks`](/help/operate/health-checks).

## Cluster-specific guides

- [GKE](/help/setup/kubernetes/gke)
- [AKS](/help/setup/kubernetes/aks)
- [OpenShift](/help/setup/kubernetes/openshift)
- [SAP BTP Kyma](/help/setup/kubernetes/kyma)

## Addons

- [Keycloak](/help/setup/kubernetes/addons/keycloak)
- [PostgreSQL](/help/setup/kubernetes/addons/postgres)
- [GCP DNS Zone](/help/setup/kubernetes/addons/google-dns-zone)
- [GKE cluster](/help/setup/kubernetes/addons/gke-cluster)
- [Azure DNS Zone](/help/setup/kubernetes/addons/azure-dns-zone)
- [Let's Encrypt](/help/setup/kubernetes/addons/letsencrypt)
- [Istio](/help/setup/kubernetes/addons/istio)
