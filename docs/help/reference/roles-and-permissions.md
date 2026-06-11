---
title: Roles and permissions
description: Built-in super-roles, anonymous mode, and the @Roles semantics.
---

# Roles and permissions

The platform enforces authorization through two paths - URL-pattern rules (`*.access`) and inline `@Roles` annotations - both backed by `UserFacade.isInRole(role)`.

## Built-in super-roles

| Role | Effect |
| ---- | ------ |
| `DEVELOPER`     | Full development access. Short-circuits `@Roles` and `*.access` checks. |
| `ADMINISTRATOR` | Full administrative access. Short-circuits `@Roles` and `*.access` checks. |

A user in either role passes any `@Roles({ "..." })` check regardless of the listed roles.

## Application roles

Declare additional roles via a `*.roles` artefact - see [`/help/artefacts/security/roles`](/help/artefacts/security/roles). Reference them by name in `*.access` rules and `@Roles` annotations.

## `@Roles` semantics

- **Any-of** - the caller passes if they hold *any one* of the listed roles.
- Class-level annotation applies to every method.
- Method-level annotation overrides the class-level annotation **for that method only**.
- An empty list (`@Roles({})`) means "no restriction" - useful at the method level to open up a single endpoint on an otherwise restricted controller.

## Anonymous mode

```bash
DIRIGIBLE_ANONYMOUS_MODE_ENABLED=true
DIRIGIBLE_ANONYMOUS_USER_NAME_PROP_NAME=anonymous-user
```

When enabled, `@Roles` checks are bypassed and `UserFacade.getName()` returns the configured anonymous user name. Useful for local development and public-facing read-only deployments.

## `*.access` rules

URL-pattern based, evaluated at request dispatch. First match wins. See [`/help/artefacts/security/access`](/help/artefacts/security/access).

## Programmatic role check

```ts
import { user } from "@aerokit/sdk/security";

if (user.isInRole("admin")) { /* ... */ }
```

```java
import org.eclipse.dirigible.sdk.security.User;

if (User.isInRole("admin")) { /* ... */ }
```

## See also

- [Security model](/help/concepts/security-model)
- [Security and roles (develop)](/help/develop/security-and-roles)
- [Authentication setup](/help/setup/authentication/)
