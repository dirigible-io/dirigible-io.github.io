# mail/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.mail`
- source: [mail/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/mail)
:::

This module provides an SMTP delivery facade. The platform-configured client is the default; per-call property overrides support multi-tenant fan-out and one-off messages.

The main components of this module are:
- **Mail**: Static facade — `getInstance()`, `getInstance(properties)`, and a convenience `send(...)`.

## Classes
