---
title: Security model
description: Pluggable authentication backends, declarative .access and .roles artefacts, built-in DEVELOPER / ADMINISTRATOR super-roles, and anonymous-mode toggles.
---

# Security model

Dirigible's security model is built on Spring Security with a thin layer of declarative artefacts on top.

## Authentication backends

Each backend ships as a separate module under `components/security/`. Activate them via Spring profiles or environment variables:

| Backend                       | Module                          | Notes                                                                 |
| ----------------------------- | ------------------------------- | --------------------------------------------------------------------- |
| Basic / form login            | `security-basic`                | Default. Credentials `admin` / `admin` from `DIRIGIBLE_BASIC_USERNAME` / `_PASSWORD`. |
| Generic OAuth2                | `security-oauth2`               | Standard Spring `oauth2-client` configuration.                       |
| Keycloak                      | `security-keycloak`             | Realm-based or multi-realm.                                          |
| AWS Cognito                   | `security-cognito`              | Hosted UI + JWT.                                                     |
| Snowflake                     | `security-snowflake`            | Snowflake-issued tokens.                                             |
| GitHub OAuth                  | (via `github` Spring profile)   | `DIRIGIBLE_GITHUB_CLIENT_ID` / `_CLIENT_SECRET` / `_SCOPE`. Configured by `application-github.properties`. |
| Runtime client registration   | `security-client-registration`  | UI for registering OAuth clients at runtime.                         |

Only one authentication backend is typically active in a given deployment.

## Declarative authorization

Two artefact types control URL-level access:

- **`*.access`** - declares an access rule: a URL pattern, an HTTP method, and the role(s) required to invoke it. Reconciled by `AccessSynchronizer`.
- **`*.roles`** - declares roles in the security domain. Reconciled by `RolesSynchronizer`.

Both are enforced by `engine-security`, which plugs into the Spring Security filter chain at request time.

```json
// example.access
{
  "constraints": [
    { "path": "/services/js/example/admin/.*", "method": "*", "roles": ["administrator"] }
  ]
}
```

## Built-in super-roles

Two roles short-circuit the access check:

- **`DEVELOPER`** - bypasses application-level role checks for developer tooling.
- **`ADMINISTRATOR`** - full platform administration.

User code should not check for these by name. The framework handles the short-circuit in `ControllerInvoker.checkRoles` and equivalent JS / TS paths.

## Anonymous mode

Two configuration flags control anonymous access:

- `Configuration.isAnonymousModeEnabled()` - the platform itself runs without authentication.
- `Configuration.isAnonymousUserEnabled()` - certain endpoints accept the anonymous principal.

When either is on, role checks short-circuit to allow. Useful for trial / public-demo deployments.

The unauthenticated counterparts of secured routes live under `/public/...`:

- `/services/js/...` - authenticated JS module dispatch.
- `/public/js/...` - anonymous JS module dispatch (same routing, no auth filter).
- Same pattern applies to `/services/java/...` / `/public/java/...`.

## `@Roles` semantics

The `@Roles` annotation on a Java `@Controller` (class- or method-level) enforces an **any-of** role check:

```java
@Controller
@Roles("developer")
class AdminController {

    @Get("/users")
    @Roles({"developer", "administrator"})
    public List<User> list() { ... }
}
```

`ControllerInvoker.checkRoles`:

1. Short-circuit if `Configuration.isAnonymousModeEnabled()` or `isAnonymousUserEnabled()`.
2. Short-circuit if the request is in `DEVELOPER` or `ADMINISTRATOR`.
3. Iterate declared roles; allow on the first `HttpServletRequest.isUserInRole(role)` that returns true.
4. Method-level `@Roles` overrides class-level for that method only.

The TS counterpart on `*Controller.ts` mirrors the same semantics through `engine-javascript`.

## Current user

- JS / TS: `import { UserFacade } from "@aerokit/sdk/security";` - `UserFacade.getName()`, `UserFacade.isInRole(...)`.
- Java: `UserFacade.getName()` from `api-security`, **or** `HttpServletRequest.isUserInRole(...)` directly inside a `@Controller` method (which is what `@Roles` uses under the hood).

## Reference

- `engine-security`, `core-tenants` - role enforcement
- `UserFacade` - `components/api/api-security/.../UserFacade.java`
- `BasicSecurityConfig`, `CustomSecurityConfigurator` - Spring Security wiring
- [/help/artefacts/security/](/help/artefacts/security/) - authoring `.access` and `.roles`
