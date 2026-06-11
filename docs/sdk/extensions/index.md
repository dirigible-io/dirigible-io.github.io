# extensions/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions)
:::

This module exposes Dirigible's extension-point mechanism to Java code. Extension points are named contribution slots ("ide-menu", "report-renderer", "auth-provider", ...) that the platform - and any project - can declare. Anything contributed to a point becomes discoverable at runtime through a single lookup.

Contributions come from two sources: declarative `.extensionpoint` / `.extension` artefacts shipped in user projects (handled by the synchronizer), or Java classes annotated with `@Extension`. Either way, calling `Extensions.getExtensions("...")` returns the union of everything currently registered against the point.

The main components of this module are:

- [`Extensions`](./extensions.md) - runtime discovery facade for extension contributions registered against a named point.
- [Decorators](./decorators.md) - annotation used to register Java classes as extensions:
  - `@Extension` - registers a class as a contribution to a named extension point.

## Classes
