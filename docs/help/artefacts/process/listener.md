---
title: Message listener
description: ActiveMQ queue / topic consumer. *.listener artefact.
---

# Message listener

`*.listener` binds a JS / TS handler to a queue or topic on the embedded ActiveMQ broker.

- **File format.** JSON descriptor.
- **Synchronizer.** `ListenerSynchronizer` (tenant-isolated).
- **Broker.** Embedded ActiveMQ.
- **Editor.** [Listeners editor](/help/ide/editors/listeners).
- **JS / TS API.** [`@aerokit/sdk/messaging`](/api/messaging/consumer) - producer side, plus consumer helpers.
- **See also.** [Java `@MessageListener`](/help/develop/message-listeners) - annotation-based alternative for client Java.

## File format

```json
{
    "location": "/myproject/listeners/orders.listener",
    "name": "orders-queue",
    "kind": "Q",
    "handler": "myproject/listeners/orders-handler.js",
    "description": "Process incoming orders"
}
```

| Field | Purpose |
| --- | --- |
| `location` | Registry path of the descriptor itself. |
| `name` | Queue / topic name on the broker. |
| `kind` | `Q` for queue, `T` for topic. |
| `handler` | Registry path of the JS / TS module that receives each message. |
| `description` | Free text. |

The handler module is invoked once per message. The message body and headers are available to the handler via the messaging context.

## Java alternative - `@MessageListener`

A client `.java` class annotated with `@MessageListener(name = "orders-queue", kind = QUEUE)` is registered without a `.listener` artefact. See [Message listeners](/help/develop/message-listeners) for the full annotation surface.

`.listener` is preferred when the binding should live in the registry and reload without restart. Use the annotation when you want the handler and binding to ship as one Java source.

## Tenancy

Listener subscriptions are tenant-isolated - each tenant's reconciled `.listener` files own their own subscriptions on the broker.
