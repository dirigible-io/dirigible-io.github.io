---
title: Let's Encrypt addon
description: cert-manager + Let's Encrypt for TLS certificates.
---

# Let's Encrypt addon

Manage TLS certificates with cert-manager and Let's Encrypt.

## Install cert-manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager \
    --namespace cert-manager --create-namespace \
    --set installCRDs=true
```

## ClusterIssuer

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ops@example.com
    privateKeySecretRef: { name: letsencrypt-account-key }
    solvers:
    - dns01:
        cloudDNS:
          project: <gcp-project>
        # OR azureDNS / route53 / etc.
```

For wildcard certificates use `dns01` (HTTP-01 won't sign wildcards).

## Wire to the Dirigible ingress

```yaml
ingress:
  enabled: true
  host: "*.dirigible.example.com"
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
  tls:
    enabled: true
    secretName: dirigible-tls
```

cert-manager will issue, store, and renew the cert.

## See also

- [GCP DNS Zone](/help/setup/kubernetes/addons/google-dns-zone)
- [Azure DNS Zone](/help/setup/kubernetes/addons/azure-dns-zone)
- [Helm install](/help/setup/kubernetes/helm)
