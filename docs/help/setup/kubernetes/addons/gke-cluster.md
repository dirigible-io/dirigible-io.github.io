---
title: GKE cluster
description: Provision a baseline GKE cluster for Dirigible.
---

# GKE cluster

Reference shape for a Dirigible GKE cluster.

## Autopilot

For a managed-node-pool experience, GKE Autopilot is the simplest fit:

```bash
gcloud container clusters create-auto dirigible \
    --region europe-west3 \
    --release-channel regular
```

## Standard cluster

If you need explicit node-pool control:

```bash
gcloud container clusters create dirigible \
    --region europe-west3 \
    --release-channel regular \
    --machine-type e2-standard-4 \
    --num-nodes 3 \
    --workload-pool=$PROJECT.svc.id.goog \
    --enable-ip-alias \
    --enable-shielded-nodes
```

## Workload Identity

Enable Workload Identity (above) so the platform pod (or any addon like `external-dns`, cert-manager) can call GCP APIs without static service-account keys.

## See also

- [GKE install](/help/setup/kubernetes/gke)
- [GCP DNS Zone](/help/setup/kubernetes/addons/google-dns-zone)
- [Let's Encrypt addon](/help/setup/kubernetes/addons/letsencrypt)
