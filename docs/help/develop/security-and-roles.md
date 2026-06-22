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

`@Roles` is **any-of**. The caller gains access if it holds at least one of the listed roles. The annotation can sit on a `@Controller` class (gating every method) or on an individual method, and method-level `@Roles` overrides class-level for that method only. An empty list opens the endpoint up.

### Java

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

In the entity sample the whole CRUD controller is gated to the built-in `DEVELOPER` role with a single class-level annotation:

```java
import org.eclipse.dirigible.sdk.http.Controller;
import org.eclipse.dirigible.sdk.security.Roles;

@Controller
@Roles({"DEVELOPER"})
public class CountryController {
    // every endpoint requires the DEVELOPER (or ADMINISTRATOR) role
}
```

### TypeScript / JavaScript

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

## Built-in super-roles

Two roles always exist and short-circuit any `@Roles` check:

- `DEVELOPER`
- `ADMINISTRATOR`

A caller in either role passes every `@Roles` gate.

## Anonymous mode

When `Configuration.isAnonymousModeEnabled()` or `isAnonymousUserEnabled()` returns true, `@Roles` is bypassed entirely - useful for self-hosted dev setups. Normal mode requires authentication for every secured endpoint.

This is a server-wide configuration switch, not a code-level API, so it behaves identically for Java and TypeScript/JavaScript controllers - there is nothing language-specific to call.

## Reading the current user

The Java `User` API (`org.eclipse.dirigible.sdk.security.User`) exposes the same surface as the TypeScript `user`, with all methods static. The same `UserFacade` underpins `@Roles` dispatch and the `User` SDK class on both languages, so the two never diverge:

| Method | Java `User` | TypeScript `user` |
| --- | --- | --- |
| Current user name | `User.getName()` | `user.getName()` |
| Role check | `User.isInRole(role)` | `user.isInRole(role)` |
| All roles | `User.getRoles()` | `user.getRoles()` |
| Authentication type | `User.getAuthType()` | `user.getAuthType()` |
| Security token | `User.getSecurityToken()` | `user.getSecurityToken()` |
| Invocation count | `User.getInvocationCount()` | `user.getInvocationCount()` |
| UI language | `User.getLanguage()` | `user.getLanguage()` |

### Java

```java
import org.eclipse.dirigible.sdk.security.User;

String name  = User.getName();
boolean admin = User.isInRole("admin");
String lang  = User.getLanguage();
```

### TypeScript / JavaScript

```ts
import { user } from "@aerokit/sdk/security";

const name  = user.getName();
const admin = user.isInRole("admin");
const lang  = user.getLanguage();
```

## Declarative URL rules

For URL-pattern-based access that isn't bound to a specific controller method, use `*.access` and `*.roles` artefacts.

- See [`/help/artefacts/security/access`](/help/artefacts/security/access).
- See [`/help/artefacts/security/roles`](/help/artefacts/security/roles).
- See [`/help/concepts/security-model`](/help/concepts/security-model) for the bigger picture.

## See also

- Working sample: [`dirigiblelabs/sample-java-entity-decorators`](https://github.com/dirigiblelabs/sample-java-entity-decorators) - `CountryController` annotated `@Roles({"DEVELOPER"})`.
- [SDK reference](https://www.dirigible.io/sdk/).
