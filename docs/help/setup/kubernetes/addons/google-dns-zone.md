---
title: GCP DNS Zone
description: Manage DNS records for the platform via Google Cloud DNS.
---

# GCP DNS Zone

Manage Dirigible's wildcard DNS through Google Cloud DNS. Best paired with [external-dns](https://github.com/kubernetes-sigs/external-dns) so Helm-managed ingress resources publish their records automatically.

## Prerequisites

- A managed zone in Google Cloud DNS (e.g. `dirigible.example.com.`).
- A service account with `roles/dns.admin` on the zone.
- The `external-dns` controller installed in the cluster, bound to the service account via Workload Identity.

## Wildcard record

For multi-tenant subdomain routing (`*.dirigible.example.com`), create a wildcard A record or rely on `external-dns` to maintain it for the Ingress hostname `*.dirigible.example.com`.

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
