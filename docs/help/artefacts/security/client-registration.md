---
title: OAuth client registration
description: Register OAuth client credentials as an artefact for runtime registration via the IDE.
---

# OAuth client registration

Some authentication backends (GitHub OAuth, Keycloak, Cognito) require an OAuth client registration. Dirigible can manage the registration declaratively as an artefact, or interactively via the **Client Registration** UI under the [Security perspective](/help/ide/perspectives/security). Backed by `components/security/security-client-registration`.

## File format

```json
{
    "registrationId": "github",
    "clientName":     "Dirigible on GitHub",
    "clientId":       "${env.DIRIGIBLE_GITHUB_CLIENT_ID}",
    "clientSecret":   "${env.DIRIGIBLE_GITHUB_CLIENT_SECRET}",
    "redirectUri":    "{baseUrl}/login/oauth2/code/{registrationId}",
    "scopes":         ["read:user", "user:email"],
    "authorizationGrantType": "authorization_code",
    "issuerUri":      "https://github.com",
    "tokenUri":       "https://github.com/login/oauth/access_token",
    "authorizationUri": "https://github.com/login/oauth/authorize",
    "userInfoUri":    "https://api.github.com/user",
    "userNameAttribute": "login"
}
```

## Fields

The shape mirrors Spring's `org.springframework.security.oauth2.client.registration.ClientRegistration` builder. `${env.*}` interpolation is supported for client-id and client-secret so they can be supplied at deploy time.

## Activation

A registered client only becomes active when its **Spring profile** is also active. The `github` profile maps to `DIRIGIBLE_GITHUB_CLIENT_ID` / `_CLIENT_SECRET` / `_SCOPE` via `application-github.properties`. See [`/help/setup/authentication/github-oauth`](/help/setup/authentication/github-oauth).

## Runtime registration

The IDE's Client Registration view writes the same artefact under the hood, so a registration done from the UI survives a redeploy. The view is gated on `ADMINISTRATOR`.

## See also

- [Authentication setup](/help/setup/authentication/)
- [Security perspective](/help/ide/perspectives/security)
- [Security model](/help/concepts/security-model)
