---
title: Istio addon
description: Run Dirigible inside an Istio service mesh.
---

# Istio addon

For clusters that already run Istio, the Dirigible pod fits in unmodified - the platform exposes plain HTTP to the sidecar.

## Sidecar injection

Label the namespace to enable automatic sidecar injection:

```bash
kubectl label namespace dirigible istio-injection=enabled
```

Then redeploy the chart so each pod picks up the sidecar.

## Gateway + VirtualService

Replace the chart's Ingress with an Istio `Gateway` + `VirtualService`:

```yaml
apiVersion: networking.istio.io/v1
kind: Gateway
metadata:
  name: dirigible
spec:
  selector: { istio: ingressgateway }
  servers:
  - port: { number: 443, name: https, protocol: HTTPS }
    tls: { mode: SIMPLE, credentialName: dirigible-tls }
    hosts: [ "*.dirigible.example.com" ]
---
apiVersion: networking.istio.io/v1
kind: VirtualService
metadata:
  name: dirigible
spec:
  hosts: [ "*.dirigible.example.com" ]
  gateways: [ dirigible ]
  http:
  - route:
    - destination:
        host: dirigible.dirigible.svc.cluster.local
        port: { number: 8080 }
```

In the Dirigible Helm values, disable the chart's own ingress.

## mTLS

Use a `PeerAuthentication` resource in `STRICT` mode for the namespace. The platform pod requires no changes.

## See also

- [Helm install](/help/setup/kubernetes/helm)
- [Multi-tenancy setup](/help/setup/multi-tenancy)
