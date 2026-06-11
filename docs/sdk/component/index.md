# component/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.component`
- source: [component/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/component)
:::

This module provides the Dirigible-native dependency-injection annotations. The runtime resolves `@Inject` fields through the engine's `DependencyResolver` SPI - singleton repositories declared with `@Repository` are the primary providers.

Client classes are **not** Spring-scanned, so Spring's `@Autowired` would silently no-op here. Use these annotations instead.

The main components of this module are:
- **@Inject**: Field annotation requesting injection by declared type.
- **@Repository**: Type annotation registering a singleton component as a candidate for injection.

## Classes
