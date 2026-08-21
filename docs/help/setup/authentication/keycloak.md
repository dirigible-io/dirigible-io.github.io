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
7. Assign every user who should be able to sign in the `offline_access` **realm role**.

::: warning offline_access is not optional
The platform requests the `offline_access` scope on every login. A user without the matching realm role cannot sign in at all: Keycloak refuses the code-to-token exchange, and what the browser shows is the generic `Invalid credentials`, which names nothing. Keycloak's own event log holds the real reason (`reason="Offline tokens not allowed for the user or client"`).

The platform requests nine scopes in total (`openid`, `profile`, `roles`, `microprofile-jwt`, `email`, `phone`, `web-origins`, `address`, `offline_access`) and Keycloak rejects the whole login if any one of them is not assigned to the client, so leave the client's default and optional scopes in place.
:::

## Enable the profile

```bash
SPRING_PROFILES_ACTIVE=keycloak
DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL=https://auth.example.com/realms/dirigible
DIRIGIBLE_KEYCLOAK_CLIENT_ID=dirigible-app
DIRIGIBLE_KEYCLOAK_CLIENT_SECRET=<secret>
DIRIGIBLE_HOST=https://dirigible.example.com
```

`DIRIGIBLE_KEYCLOAK_AUTH_SERVER_URL` is the full realm URL, and it is both what the browser is sent to and what the issuer of the ID token is validated against, so it has to be the URL the browser actually uses. `DIRIGIBLE_HOST` is where the identity provider sends the user back: the redirect URI is `<host>/login/oauth2/code/keycloak`, which is the value the realm must allow.

## Role mapping

The platform reads a user's roles from a **groups claim** in the token, not from `realm_access.roles`. On Keycloak the claim is conventionally `groups`, and a group named `ADMINISTRATOR` grants that platform role. Add a group membership mapper to the client (or a client scope it uses) that writes the user's groups into the claim, and make sure it emits them as a JSON array.

## Multi-tenant deployments

One realm serves every tenant. Name the groups `<tenantId>.<appId>.<role>` and point `DIRIGIBLE_TENANT_GROUPS_CLAIM` at the claim that carries them; the signed-in user then picks which of their tenants to work in. See [Tenant resolution](/help/setup/multi-tenancy#tenant-resolution).

::: warning Give the tenant groups a claim of their own
Do not put them in `groups`. The platform requests the `microprofile-jwt` scope, whose built-in mapper copies the user's **realm roles** into a claim named `groups`; read as tenant groups, those realm roles would become platform-wide roles, so a realm role called `ADMINISTRATOR` would grant platform administration to a user with no group at all. Dropping the scope is not an option, Keycloak then rejects the login. Write the groups to a claim of their own instead:

```bash
DIRIGIBLE_TENANT_GROUPS_CLAIM=dirigible_groups
```

Turn the group membership mapper's **full group path off** as well. With the path on, the claim reads `/acme.library.Owner` and the tenant id comes out as `/acme`.
:::

## First-party sign-in

Since 14.30 the `keycloak` profile supports the [First-Party Sign-In](/help/setup/authentication/first-party-sign-in) building blocks: `DIRIGIBLE_SECURITY_LOGIN_PAGE` redirects unauthenticated browsers to an application page, and the `kc_idp_hint` passthrough deep-links federated users straight to their IdP. The native credential endpoint currently ships for Cognito; the Keycloak implementation can follow through the same internal contract.

## See also

- [First-Party Sign-In](/help/setup/authentication/first-party-sign-in)
- [Keycloak addon](/help/setup/kubernetes/addons/keycloak)
- [Multi-tenancy setup](/help/setup/multi-tenancy)
- [Authentication overview](/help/setup/authentication/)
- [Security model](/help/concepts/security-model)
