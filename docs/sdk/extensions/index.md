# extensions/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.extensions`
- source: [extensions/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/extensions)
:::

This module exposes Dirigible's extension-point mechanism to Java code. Extension points are typed contracts: an interface marked with `@ExtensionPoint` defines the methods every contribution implements, and contributions marked with `@Extension(target = Contract.class, ...)` plug in.

Contributions come from two sources: typed Java classes annotated with `@Extension` (preferred), or declarative `.extension` artefacts shipped in user projects (legacy). The typed API `Extensions.find(Class)` returns `List<T>` instances cast to the contract interface; the legacy `Extensions.getExtensions(String)` returns module paths by string name.

The main components of this module are:

- [`Extensions`](./extensions.md) - runtime discovery: `find(Class)` (typed) and `getExtensions(String)` (legacy).
- [Decorators](./decorators.md) - the annotation pair:
  - `@ExtensionPoint` - marks an interface as a typed extension point.
  - `@Extension(target = ContractInterface.class)` - registers a class as a typed contribution.

## Classes
