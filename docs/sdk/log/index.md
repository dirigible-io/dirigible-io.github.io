# log/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.log`
- source: [log/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/log)
:::

The `log` module provides named SLF4J/Logback-backed application loggers. Logger names are conventionally dot-separated package paths (`com.acme.orders.fulfilment`) and are nested under the platform's `app.` root, so the same `logback.xml` configuration knobs that govern other Dirigible loggers also govern these.

Two classes work together: `Logging` is the factory, `Logger` is the named instance returned by the factory. Both are documented together on the [Logging](./logging.md) page.

The main components of this module are:
- **Logging**: Factory for named loggers — call `Logging.getLogger("com.acme.orders")` to obtain one.
- **Logger**: The named logger instance — exposes `trace`/`debug`/`info`/`warn`/`error` with SLF4J-style `{}` placeholders, level-enabled predicates, `setLevel`, and `getName`.

## Classes

- [Logging](./logging.md)
