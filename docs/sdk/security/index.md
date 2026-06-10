# security/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.security`
- source: [security/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/security)
:::

This module exposes identity and role information for the user behind the current request, along with the `@Roles` annotation used to gate controllers and methods.

The main components of this module are:
- **User**: Static facade for the authenticated user — name, roles, language, timeout, auth type.
- **@Roles**: Class- or method-level annotation that restricts dispatch to authenticated users in any of the listed roles.

## Classes
