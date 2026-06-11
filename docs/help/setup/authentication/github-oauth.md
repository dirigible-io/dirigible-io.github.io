---
title: GitHub OAuth
description: Sign in to Dirigible with GitHub.
---

# GitHub OAuth

Sign-in with GitHub via the `github` Spring profile. Backed by Spring's standard `spring.security.oauth2.client.registration.github.*` machinery configured in `application-github.properties`.

## Register a GitHub OAuth App

1. GitHub -> Settings -> Developer settings -> OAuth Apps -> **New OAuth App**.
2. Homepage URL: `https://dirigible.example.com`.
3. Authorization callback URL: `https://dirigible.example.com/login/oauth2/code/github`.
4. Copy the Client ID and generate a Client Secret.

## Enable the profile

```bash
SPRING_PROFILES_ACTIVE=github
DIRIGIBLE_GITHUB_CLIENT_ID=<client-id>
DIRIGIBLE_GITHUB_CLIENT_SECRET=<client-secret>
DIRIGIBLE_GITHUB_SCOPE=read:user,user:email
```

Note: the canonical variables are `DIRIGIBLE_GITHUB_*`, **not** the generic `DIRIGIBLE_OAUTH_*` that older documentation referenced - those are obsolete.

## Role mapping

The default role mapping grants every authenticated GitHub user the `DEVELOPER` role. For team-based access bind a `*.roles` artefact and apply `*.access` rules - see [`/help/develop/security-and-roles`](/help/develop/security-and-roles).

## Client registration artefact

The same parameters can be stored declaratively as an [OAuth client registration artefact](/help/artefacts/security/client-registration) so a redeploy preserves the configuration.

## See also

- [Authentication overview](/help/setup/authentication/)
- [Client registration artefact](/help/artefacts/security/client-registration)
