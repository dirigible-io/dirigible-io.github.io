---
title: Basic authentication
description: Default form / basic-auth login.
---

# Basic authentication

The out-of-the-box authentication backend. Form-based login for the IDE, HTTP basic for REST clients.

## Default credentials

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_BASIC_USERNAME` | `admin` | Initial admin user. |
| `DIRIGIBLE_BASIC_PASSWORD` | `admin` | Initial admin password. |

The default credentials are intentionally well-known so first-run install just works. **Change them on day one** for any deployment that has a network beyond `localhost`.

## Roles

The basic-auth user holds both super-roles (`DEVELOPER` and `ADMINISTRATOR`), so `@Roles` checks pass for any endpoint. For multi-user setups extend with one of the OAuth / OIDC backends - see siblings under [`/help/setup/authentication/`](/help/setup/authentication/).

## Disabling basic auth

When another auth backend is active (`SPRING_PROFILES_ACTIVE=keycloak`, `github`, `cognito`, `snowflake`), basic auth is automatically off for the UI flow. The REST endpoints still accept the basic credentials unless explicitly disabled.

## See also

- [GitHub OAuth](/help/setup/authentication/github-oauth)
- [Keycloak](/help/setup/authentication/keycloak)
- [Security model](/help/concepts/security-model)
