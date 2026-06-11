---
title: Listeners Editor
description: Editor for `.listener` message-listener artefacts.
---

# Listeners Editor

Editor for `*.listener` artefacts. A listener binds a queue or topic name to a handler module. `engine-listeners` (ActiveMQ-style message bus) invokes the handler on every incoming message.

Component: `editor-listeners`. Synchronizer: `ListenerSynchronizer`.

## Artefact shape

```json
{
    "name": "sales/orders-created",
    "kind": "Q",
    "handler": "sales/listeners/order-created.ts",
    "description": "Persist new order events"
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Destination name. Interpreted as a queue name when `kind` is `Q`, or a topic name when `kind` is `T`. |
| `kind` | yes | `Q` for **QUEUE** (point-to-point), `T` for **TOPIC** (publish / subscribe). |
| `handler` | yes | Repository path to the handler module. TS / JS via `engine-javascript`, Java via `engine-java`. |
| `description` | no | Human-readable description. |

## Editor fields

- **Name** - the destination name.
- **Kind** - dropdown: **QUEUE** / **TOPIC**.
- **Handler** - file picker.
- **Description**.

## Runtime

On synchronization, the listener is registered with the configured message broker. Active listeners are visible in the [Listeners view](/help/ide/views/listeners). The handler receives the raw message payload via the platform's listener context.

## See also

- [Listener artefact](/help/artefacts/process/listener)
- [`@aerokit/sdk/messaging`](/sdk/messaging/)
