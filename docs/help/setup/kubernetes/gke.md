---
title: Google Kubernetes Engine
description: Run Dirigible on GKE.
---

# Google Kubernetes Engine

Standard Helm install with a few GCP-specific addons.

## Cluster

Use the [GKE cluster addon](/help/setup/kubernetes/addons/gke-cluster) for a baseline cluster shape (autopilot or standard with sane node-pool sizing).

## DNS and TLS

- DNS - [GCP DNS Zone addon](/help/setup/kubernetes/addons/google-dns-zone) for the wildcard `*.dirigible.example.com` record.
- TLS - [Let's Encrypt addon](/help/setup/kubernetes/addons/letsencrypt) via cert-manager.

## PostgreSQL

Use Cloud SQL or the in-cluster [PostgreSQL addon](/help/setup/kubernetes/addons/postgres) for evaluation.

## Install

```bash
helm install dirigible dirigible/dirigible \
    --namespace dirigible --create-namespace \
    -f values.gke.yaml
```

A `values.gke.yaml` typically sets:

```yaml
ingress:
  enabled: true
  className: gce
  host: "*.dirigible.example.com"
  tls:
    enabled: true
    secretName: dirigible-tls
```

## Observability

Stackdriver / Cloud Logging picks up `kubectl logs` output. For richer signals enable [OpenTelemetry](/help/operate/opentelemetry) with an OTLP collector that ships to Cloud Trace / Cloud Monitoring.

## See also

- [Helm install](/help/setup/kubernetes/helm)
- [Authentication setup](/help/setup/authentication/)
