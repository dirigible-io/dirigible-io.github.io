---
title: Message listeners
description: JMS-style listeners over the embedded ActiveMQ broker.
---

# Message listeners

`engine-listeners` runs message-bus listeners against the embedded ActiveMQ broker. Two declaration styles are supported.

## `@Listener` annotation

A class with an `onMessage(String)` method, annotated with the queue or topic name and the kind.

**Java:**

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;

@Listener(name = "queue.orders", kind = ListenerKind.QUEUE)
public class OrderListener implements MessageHandler {

    @Override
    public void onMessage(String body) {
        // handle message
    }
}
```

`MessageHandler` is the optional typed contract for the listener callbacks - `onMessage(String)` plus a `default onError(String) {}`. Implementing it gives compile-time signature checking and a direct dispatch path; classes that don't implement it keep working via reflective `onMessage` / `onError` lookup. See [`/sdk/messaging/decorators`](/sdk/messaging/decorators) for details.

**TypeScript:**

```ts
import { Listener, ListenerKind } from "@aerokit/sdk/messaging";

@Listener({ name: "queue.orders", kind: ListenerKind.QUEUE })
export class OrderListener {

  public onMessage(body: string) {
    // handle message
  }
}
```

`kind` is `ListenerKind.QUEUE` (point-to-point) or `ListenerKind.TOPIC` (publish-subscribe).

## `.listener` artefact

A JSON descriptor pointing at a JS/TS/Java handler module. `ListenerSynchronizer` reconciles each `.listener` file into a live consumer.

```json
{
  "name": "queue.orders",
  "type": "queue",
  "handler": "demo/listeners/order-handler.js"
}
```

## Lifecycle

Hot-reload auto-restarts the consumer when the handler or descriptor changes. Deleting the file detaches the consumer.

## Browsing the broker

The Messaging perspective in the IDE surfaces queues and topics, their pending counters, and the in-memory messages on a queue (non-destructive browse). Purge and per-message delete actions are available too.

## Producing messages

Send from code via `@aerokit/sdk/messaging/producer`:

```ts
import { producer } from "@aerokit/sdk/messaging/producer";
producer.queue("queue.orders").send(JSON.stringify({ id: 1 }));
```

## Tenancy

Listeners are **tenant-isolated** - each tenant gets its own consumer for the same `.listener` file.

## See also

- [TypeScript API - messaging](/api/).
- [Java SDK - messaging](/sdk/).
- Messaging perspective.
