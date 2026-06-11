# template/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.template`
- source: [template/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/template)
:::

This module renders templates against a JSON parameter document. Three engines are bundled - Mustache, Velocity, and JavaScript (GraalJS expression evaluation) - selectable per call.

The main components of this module are:
- **TemplateEngines**: Static facade with `generate*` variants for each engine.

## Classes
