---
title: Red Hat OpenShift
description: Run Dirigible on Red Hat OpenShift.
---

# Red Hat OpenShift

OpenShift's tighter security context constraints (SCC) and built-in Route resource shape the install.

## SCC

The Dirigible container does not need privileged mode. Run under the `restricted-v2` SCC. The chart's pod template should declare:

```yaml
securityContext:
  runAsNonRoot: true
  seccompProfile: { type: RuntimeDefault }
```

If your custom values override `securityContext`, keep these set.

## Route instead of Ingress

OpenShift's `Route` is the native ingress. The Helm chart can emit a `Route` instead of a Kubernetes `Ingress`:

```yaml
route:
  enabled: true
  host: dirigible.apps.example.openshift.com
  tls:
    termination: edge
```

For wildcard routing use a single `Route` with a wildcardPolicy of `Subdomain`.

## TLS

The OpenShift router can terminate TLS using a cluster-managed certificate or a user-provided cert in the `Route`. For Let's Encrypt with the OpenShift router use cert-manager and a route-edge termination.

## PostgreSQL

Use the bundled subchart or an external PostgreSQL operator (CrunchyData, Cloud Native PostgreSQL).

## Install

```bash
helm install dirigible dirigible/dirigible \
    --namespace dirigible --create-namespace \
    -f values.openshift.yaml
```

## See also

- [Helm install](/help/setup/kubernetes/helm)
- [Multi-tenancy setup](/help/setup/multi-tenancy)
