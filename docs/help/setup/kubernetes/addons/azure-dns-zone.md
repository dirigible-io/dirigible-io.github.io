---
title: Azure DNS Zone
description: Manage DNS records for the platform via Azure DNS.
---

# Azure DNS Zone

Manage Dirigible's wildcard DNS through Azure DNS. Best paired with `external-dns`.

## Prerequisites

- A DNS zone in Azure DNS (e.g. `dirigible.example.com`).
- A service principal or managed identity with `DNS Zone Contributor` on the zone.
- `external-dns` installed in the cluster, bound via Azure Workload Identity.

## Wildcard record

```yaml
ingress:
  enabled: true
  host: "*.dirigible.example.com"
  annotations:
    external-dns.alpha.kubernetes.io/hostname: "*.dirigible.example.com"
```

## See also

- [Multi-tenancy setup](/help/setup/multi-tenancy)
- [Let's Encrypt addon](/help/setup/kubernetes/addons/letsencrypt)
- [AKS install](/help/setup/kubernetes/aks)
