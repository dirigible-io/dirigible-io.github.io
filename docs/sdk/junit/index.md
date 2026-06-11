# junit/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.junit`
- source: [junit/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/junit)
:::

The `junit` module provides lightweight xUnit-style assertion helpers for use in Dirigible scripts and ad-hoc verification code. The assertions throw `AssertionError` on failure, so they integrate with any JVM test runner without extra wiring.

::: warning Not a JUnit replacement
This is *not* a replacement for real JUnit 5 in test sources. For full-blown test suites - fixtures, parameterised tests, lifecycle hooks, parallel execution - pull JUnit Jupiter into the project and use `org.junit.jupiter.api.Assertions` directly. This class deliberately covers only the small overlap appropriate for in-platform smoke tests.
:::

The main components of this module are:
- **Assert**: Static assertion helpers (`assertTrue`, `assertFalse`, `assertEquals`, `assertNotEquals`, `assertNull`, `assertNotNull`, `fail`), each with an optional leading-`message` overload.

## Classes

- [Assert](./junit.md)
