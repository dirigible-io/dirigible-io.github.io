---
title: Keycloak
description: OIDC-based SSO via Keycloak.
---

# Keycloak

Sign-in via Keycloak using OIDC. Backed by `security-keycloak`. Pairs with the Helm [Keycloak addon](/help/setup/kubernetes/addons/keycloak) for in-cluster deployments.

## Configure a realm and client

In Keycloak:

1. Create a realm (e.g. `dirigible`).
2. Add a client (e.g. `dirigible-app`).
3. Set Access Type to `confidential`. Note the generated Client Secret.
4. Valid Redirect URIs: `https://dirigible.example.com/login/oauth2/code/keycloak`.
5. Web Origins: `https://dirigible.example.com`.
6. Add the platform's roles (`DEVELOPER`, `ADMINISTRATOR`, plus any application roles you declared in `*.roles` artefacts).

## Enable the profile

```bash
SPRING_PROFILES_ACTIVE=keycloak
DIRIGIBLE_KEYCLOAK_SERVER_URL=https://auth.example.com
DIRIGIBLE_KEYCLOAK_REALM=dirigible
DIRIGIBLE_KEYCLOAK_CLIENT_ID=dirigible-app
DIRIGIBLE_KEYCLOAK_CLIENT_SECRET=<secret>
```

## Role mapping

Keycloak realm roles map directly onto platform roles - `UserFacade.isInRole("admin")` returns true if the Keycloak token includes `admin` in `realm_access.roles`. Configure role inheritance and group->role mappings in the Keycloak realm.

## Multi-realm / multi-tenant

For multi-tenant deployments either declare one realm per tenant in Keycloak, or use the same realm with tenant-scoped client IDs. Bind the tenant id to the OIDC subject claim if possible.

## See also

- [Keycloak addon](/help/setup/kubernetes/addons/keycloak)
- [Authentication overview](/help/setup/authentication/)
- [Security model](/help/concepts/security-model)
