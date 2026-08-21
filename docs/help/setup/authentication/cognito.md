---
title: Amazon Cognito
description: Sign-in via Amazon Cognito user pools.
---

# Amazon Cognito

Sign-in via Amazon Cognito (user pools). Backed by `security-cognito`. Useful for AWS-resident deployments where Cognito is already the org's identity store.

## Create the user pool client

In AWS Cognito:

1. Create a user pool (or reuse an existing one).
2. Add an app client. Enable the Authorization Code grant type.
3. Set the Allowed callback URL to `https://dirigible.example.com/login/oauth2/code/cognito`.
4. Configure a domain (Cognito hosted UI) or your own custom domain.

## Enable the profile

```bash
SPRING_PROFILES_ACTIVE=cognito
DIRIGIBLE_COGNITO_REGION_ID=eu-west-1
DIRIGIBLE_COGNITO_USER_POOL_ID=<pool-id>
DIRIGIBLE_COGNITO_CLIENT_ID=<client-id>
DIRIGIBLE_COGNITO_CLIENT_SECRET=<client-secret>
DIRIGIBLE_COGNITO_DOMAIN=https://<your-domain>.auth.eu-west-1.amazoncognito.com
DIRIGIBLE_HOST=https://dirigible.example.com
```

`DIRIGIBLE_COGNITO_REGION_ID` and `DIRIGIBLE_COGNITO_USER_POOL_ID` compose the issuer the ID token is validated against; `DIRIGIBLE_COGNITO_DOMAIN` is the hosted UI the browser is sent to. `DIRIGIBLE_HOST` is where Cognito sends the user back, so the callback URL is `<host>/login/oauth2/code/cognito`.

## Role mapping

Cognito groups map onto platform roles by name. Add the user to the `DEVELOPER` group for IDE access, `ADMINISTRATOR` for full admin. For finer-grained roles add Cognito groups matching the names in your `*.roles` artefacts.

## Multi-tenant deployments

One user pool per tenant works well for strict tenant isolation. To serve every tenant from one pool and one host instead, name the groups `<tenantId>.<appId>.<role>` and let the signed-in user pick which of their tenants to work in. Cognito already puts groups in `cognito:groups`, which is the default value of `DIRIGIBLE_TENANT_GROUPS_CLAIM`, so no extra claim configuration is needed. A group with no dots in it, such as `ADMINISTRATOR`, stays a platform-wide role. See [Tenant resolution](/help/setup/multi-tenancy#tenant-resolution).

## First-party sign-in

Since 14.30 the application can host its own credential form instead of the Cognito hosted UI - see [First-Party Sign-In](/help/setup/authentication/first-party-sign-in) for the endpoint contract, the IdP deep links and the login page property. Cognito specifics:

- The platform authenticates over `USER_SRP_AUTH` - the password is used only to compute a zero-knowledge proof and never crosses the wire from the platform to AWS. The app client must allow the flow (`ALLOW_USER_SRP_AUTH`, enabled by default on new app clients).
- Everything is derived from the client registration (client id/secret, pool coordinates from the issuer URI) - no additional configuration.
- Pools with threat protection keep their risk scoring when the login page forwards the client-side collector blob as `userContextData`.
- The native flow needs no registered callback URLs; only the federated deep link and logout still do (they complete through the hosted endpoints).

## See also

- [First-Party Sign-In](/help/setup/authentication/first-party-sign-in)
- [Multi-tenancy setup](/help/setup/multi-tenancy)
- [Authentication overview](/help/setup/authentication/)
- [Security model](/help/concepts/security-model)
