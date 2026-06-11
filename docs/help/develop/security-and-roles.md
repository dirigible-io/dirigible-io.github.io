---
title: Security and roles
description: Restrict access to controllers and methods with @Roles; read the current user with UserFacade.
---

# Security and roles

Dirigible enforces request-level authorization through two mechanisms:

- **Declarative URL rules** - `*.access` and `*.roles` artefacts processed by `engine-security`.
- **Inline annotations** - `@Roles({...})` on controller classes and methods, evaluated by `ControllerInvoker.checkRoles`.

Both ultimately call `UserFacade.isInRole(role)` against whatever the platform's authentication chain placed on the request - Spring Security principal, OIDC subject, basic-auth username.

## @Roles

`@Roles` is **any-of**. The caller gains access if it holds at least one of the listed roles.

```ts
import { Controller, Get } from "@aerokit/sdk/http";
import { Roles } from "@aerokit/sdk/security";

@Roles(["admin", "ops"])
@Controller
class AdminController {

    @Get("/users")
    public listUsers() { /* ... */ }

    @Roles([])
    @Get("/health")
    public health() { return "OK"; }
}
```

```java
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.http.Get;
import org.eclipse.dirigible.sdk.security.Roles;

@Controller("/admin")
@Roles({ "admin", "ops" })
public class AdminController {

    @Get("/users")
    public List<String> listUsers() { return List.of(); }

    @Get("/health")
    @Roles({})
    public String health() { return "OK"; }
}
```

Method-level `@Roles` overrides class-level for that method only. An empty list opens the endpoint up.

## Built-in super-roles

Two roles always exist and short-circuit any `@Roles` check:

- `DEVELOPER`
- `ADMINISTRATOR`

A caller in either role passes every `@Roles` gate.

## Anonymous mode

When `Configuration.isAnonymousModeEnabled()` or `isAnonymousUserEnabled()` returns true, `@Roles` is bypassed entirely - useful for self-hosted dev setups. Normal mode requires authentication for every secured endpoint.

## Reading the current user

```ts
import { user } from "@aerokit/sdk/security";

const name  = user.getName();
const admin = user.isInRole("admin");
const lang  = user.getLanguage();
```

```java
import org.eclipse.dirigible.sdk.security.User;

String name  = User.getName();
boolean admin = User.isInRole("admin");
String lang  = User.getLanguage();
```

The same `UserFacade` underpins `@Roles` dispatch and the `User` SDK class, so the two never diverge.

## Declarative URL rules

For URL-pattern-based access that isn't bound to a specific controller method, use `*.access` and `*.roles` artefacts.

- See [`/help/artefacts/security/access`](/help/artefacts/security/access).
- See [`/help/artefacts/security/roles`](/help/artefacts/security/roles).
- See [`/help/concepts/security-model`](/help/concepts/security-model) for the bigger picture.
