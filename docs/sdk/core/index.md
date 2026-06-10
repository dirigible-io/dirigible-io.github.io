# core/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.core`
- source: [core/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/core)
:::

This module provides core functionalities for the Eclipse Dirigible Java SDK. It includes facade classes for reading platform configuration, accessing per-request context, inspecting process environment variables, and managing application-wide global state. These are the building blocks that the rest of the SDK and most application code rely on.

All classes in this module are stateless facades exposing `public static` methods that delegate to the underlying Dirigible platform — there is nothing to instantiate.

The main components of this module are:
- **Configurations**: Reads platform configuration values (env vars, `application*.properties`, runtime overrides) through the same precedence the rest of Dirigible uses.
- **Context**: Per-request scratch storage bound to the calling thread, for passing values from a filter or interceptor down to a controller without threading them through method signatures.
- **Env**: Read-only view of process environment variables — a single value via `get`, or the full map as JSON via `list`.
- **Globals**: Application-wide globals that survive across requests for the lifetime of the JVM. Strings only; use the cache or a database table for richer types.

## Classes

- [Configurations](./configurations.md)
- [Context](./context.md)
- [Env](./env.md)
- [Globals](./globals.md)
