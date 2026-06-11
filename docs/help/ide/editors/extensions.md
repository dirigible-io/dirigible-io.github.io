---
title: Extensions Editors
description: Editors for `.extensionpoint` (hook declaration) and `.extension` (implementation).
---

# Extensions Editors

Two related editors. `*.extensionpoint` declares a named pluggable hook. `*.extension` provides an implementation against an existing extension point. Both are reconciled by `core-extensions` and discovered at runtime via [`@aerokit/sdk/extensions`](/sdk/extensions/).

Component: `editor-extensions`.

## Extension point editor (`*.extensionpoint`)

A `*.extensionpoint` file declares a hook other artefacts can implement.

```json
{
    "name": "/sales/extensions/order-validators",
    "description": "Pluggable validators run before an order is persisted."
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | The fully qualified extension-point identifier. Consumers reference it by this name. |
| `description` | no | Human-readable description. |

Synchronizer: `ExtensionPointsSynchronizer`.

## Extension editor (`*.extension`)

A `*.extension` file provides an implementation registered against an extension point.

```json
{
    "extensionPoint": "/sales/extensions/order-validators",
    "module": "sales/validators/credit-limit.ts",
    "description": "Reject orders that exceed the customer's credit limit."
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `extensionPoint` | yes | The name of an existing `*.extensionpoint`. |
| `module` | yes | Repository path to the implementing module. The runtime imports it on every dispatch. |
| `description` | no | Human-readable description. |

Synchronizer: `ExtensionsSynchronizer`.

## Editor fields

Both editors are form-based with the fields above. The extension editor's **Extension Point** field is a picker populated from the currently published extension points.

## Discovery and invocation

User code looks up registered extensions through `@aerokit/sdk/extensions`:

```ts
import { extensions } from "@aerokit/sdk/extensions";

const validators = await extensions.load("/sales/extensions/order-validators");
for (const validator of validators) {
    await validator.validate(order);
}
```

Currently published extensions are listed in the [Extensions view](/help/ide/views/extensions).

## See also

- [Extension point artefact](/help/artefacts/extensibility/extensionpoint)
- [Extension artefact](/help/artefacts/extensibility/extension)
