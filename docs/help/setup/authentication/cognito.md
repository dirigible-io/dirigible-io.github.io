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
DIRIGIBLE_COGNITO_REGION=eu-west-1
DIRIGIBLE_COGNITO_USER_POOL_ID=<pool-id>
DIRIGIBLE_COGNITO_CLIENT_ID=<client-id>
DIRIGIBLE_COGNITO_CLIENT_SECRET=<client-secret>
DIRIGIBLE_COGNITO_DOMAIN=https://<your-domain>.auth.eu-west-1.amazoncognito.com
```

## Role mapping

Cognito groups map onto platform roles by name. Add the user to the `DEVELOPER` group for IDE access, `ADMINISTRATOR` for full admin. For finer-grained roles add Cognito groups matching the names in your `*.roles` artefacts.

## Multi-tenant deployments

One user pool per tenant works well for strict tenant isolation. For shared user pools, use a custom claim to identify the tenant and map it onto the request tenant context.

## See also

- [Authentication overview](/help/setup/authentication/)
- [Security model](/help/concepts/security-model)
