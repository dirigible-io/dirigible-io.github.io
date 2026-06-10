# integrations/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.integrations`
- source: [integrations/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/integrations)
:::

This module is a **placeholder namespace** under `org.eclipse.dirigible.sdk.*`. Java callers writing Apache Camel `Processor` implementations already have the `Exchange` parameter available — the native Camel API (`exchange.getMessage().setHeader(...)`, `setBody(...)`, `setProperty(...)`) is the right tool, so no intermediate facade is added here.

The package exists so the namespace stays consistent across the platform; the class itself has no methods.

The main components of this module are:
- **Integrations**: An empty marker class. See the page for details.

## Classes
