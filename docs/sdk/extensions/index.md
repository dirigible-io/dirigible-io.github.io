# extensions/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions)
:::

This module exposes Dirigible's extension-point mechanism to Java code. There is no extension annotation: an extension point is a plain Java interface, and a contribution is a [`@Component`](/sdk/component/decorators) that implements it (its `@Component` name is the contribution name).

Contributions are discovered like any group of beans - inject them all via `List<T>` (preferred), or look them up with `Extensions.find(Class)`. The legacy `Extensions.getExtensions(String)` returns module paths by string name and is kept for TypeScript/JavaScript `.extension` artefacts.

The main components of this module are:

- [`Extensions`](./extensions.md) - runtime discovery: `find(Class)` / `findFirst(Class)` (typed) and `getExtensions(String)` (legacy).
- [Extension model](./decorators.md) - plain-interface extension points and `@Component` contributions, and collection injection.

## Classes
