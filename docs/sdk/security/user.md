# User

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.security`
- source: [security/User.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/security/User.java)
:::

Identity and role lookup for the user behind the current request. The methods return whatever the platform's authentication chain populated - Spring Security principal, OIDC subject, basic-auth username, etc.

`isInRole(role)` is the authoritative check used by `@Roles` dispatch in controllers; `getRoles()` returns the full set if you need to make a finer-grained decision inside a method body.

In an unauthenticated context (anonymous request, scheduled job) the user name resolves to the platform's anonymous user; role checks then defer to the platform's anonymous-mode configuration.

### Key Features:
- **Auth-chain agnostic** - same surface across Spring Security, OIDC, basic auth.
- **Authoritative role check** - `isInRole` matches what `@Roles` dispatch uses.
- **Anonymous fallback** - clean defaults in non-request contexts (jobs, listeners).

### Example Usage:
```java
import org.eclipse.dirigible.sdk.security.User;

String who = User.getName();
boolean isAdmin = User.isInRole("admin");
String lang = User.getLanguage();
```

## Methods

### getName()

Returns the authenticated user name (or the anonymous user name when unauthenticated).

> ```java
> public static String getName();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: User name from the platform's authentication context.
> :::

### isInRole()

Checks whether the current user holds the given role.

> ```java
> public static boolean isInRole(String role);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `role` | `String` | Role name to check. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the user has the role; `false` otherwise.
> :::

### getRoles()

Returns the full set of role names assigned to the user.

> ```java
> public static Collection<String> getRoles();
> ```
>
> ::: info Returns
> - **Type**: `Collection<String>`
> - **Description**: All roles for the user.
> :::

### getAuthType()

Returns the authentication mechanism used (e.g. `BASIC`, `OAUTH2`).

> ```java
> public static String getAuthType();
> ```

### getSecurityToken()

Returns the user's security token, if one is available on the current request.

> ```java
> public static String getSecurityToken();
> ```

### getInvocationCount()

Returns a platform-managed invocation counter for the current session.

> ```java
> public static String getInvocationCount();
> ```

### getLanguage()

Returns the user's preferred language code (e.g. `en`, `de`).

> ```java
> public static String getLanguage();
> ```

### getTimeout()

Returns the session timeout for the user, in seconds.

> ```java
> public static Integer getTimeout();
> ```
