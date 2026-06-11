---
title: Keycloak addon
description: Deploy Keycloak as the platform's OIDC provider.
---

# Keycloak addon

Deploys Keycloak alongside Dirigible for OIDC-based SSO.

## Install

The Helm chart bundles Keycloak as an optional subchart. Enable in your values file:

```yaml
keycloak:
  enabled: true
  auth:
    adminUser: admin
    adminPassword:
      valueFrom:
        secretKeyRef: { name: keycloak-admin, key: password }
  ingress:
    enabled: true
    host: auth.dirigible.example.com
    tls: { enabled: true, secretName: keycloak-tls }
```

## Wire Dirigible to Keycloak

Enable the `keycloak` Spring profile on the Dirigible pod:

```yaml
env:
  SPRING_PROFILES_ACTIVE: keycloak
  DIRIGIBLE_KEYCLOAK_SERVER_URL: https://auth.dirigible.example.com
  DIRIGIBLE_KEYCLOAK_REALM: dirigible
  DIRIGIBLE_KEYCLOAK_CLIENT_ID: dirigible-app
  DIRIGIBLE_KEYCLOAK_CLIENT_SECRET:
    valueFrom: { secretKeyRef: { name: dirigible-oidc, key: client-secret } }
```

See [`/help/setup/authentication/keycloak`](/help/setup/authentication/keycloak) for the realm and client configuration.

## See also

- [Authentication: Keycloak](/help/setup/authentication/keycloak)
- [Helm install](/help/setup/kubernetes/helm)
