---
title: Azure Kubernetes Service
description: Run Dirigible on AKS.
---

# Azure Kubernetes Service

Helm install with Azure-specific addons.

## Cluster

Provision an AKS cluster through `az aks create` or the portal. Two node pools (system + user) work well for the platform pod plus a Postgres subchart.

## DNS and TLS

- DNS - [Azure DNS Zone addon](/help/setup/kubernetes/addons/azure-dns-zone) for the wildcard record.
- TLS - [Let's Encrypt addon](/help/setup/kubernetes/addons/letsencrypt) via cert-manager.

## PostgreSQL

Use Azure Database for PostgreSQL Flexible Server, or the in-cluster [PostgreSQL addon](/help/setup/kubernetes/addons/postgres).

## Install

```bash
helm install dirigible dirigible/dirigible \
    --namespace dirigible --create-namespace \
    -f values.aks.yaml
```

A typical `values.aks.yaml`:

```yaml
ingress:
  enabled: true
  className: webapprouting.kubernetes.azure.com   # or your nginx-ingress class
  host: "*.dirigible.example.com"
  tls:
    enabled: true
    secretName: dirigible-tls
```

## Observability

Azure Monitor and Log Analytics pick up `kubectl logs`. For traces enable [OpenTelemetry](/help/operate/opentelemetry) with an OTLP collector that ships to Azure Monitor.

## SSO

Azure AD via [Microsoft Entra ID](/help/setup/authentication/) (Keycloak or Cognito-style providers can target AAD as an external IdP).

## See also

- [Helm install](/help/setup/kubernetes/helm)
- [Azure DNS Zone addon](/help/setup/kubernetes/addons/azure-dns-zone)
