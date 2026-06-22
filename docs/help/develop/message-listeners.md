---
title: Message listeners
description: JMS-style listeners over the embedded ActiveMQ broker.
---

# Message listeners

`engine-listeners` runs message-bus listeners against the embedded ActiveMQ broker. Two declaration styles are supported.

## `@Component` listener

A listener is a `@Component` bean. There are exactly **two** styles. A class uses **one or the other, never both** - the engine rejects a class that mixes them.

**Java**

**Style 1 - self-describing interface.** A `@Component` that implements `MessageHandler`. The interface carries the binding itself: `destination()` names the queue or topic, `kind()` (a `default`, `QUEUE`) selects the semantics, and `onMessage(String)` handles the message (plus a `default onError(String)`), so **no class-level `@Listener`** is used. This mirrors `jakarta.jms.MessageListener`.

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;

@Component
public class OrderListener implements MessageHandler {

    @Override
    public String destination() {
        return "queue.orders";
    }

    @Override
    public ListenerKind kind() {
        return ListenerKind.QUEUE;
    }

    @Override
    public void onMessage(String body) {
        // handle message
    }
}
```

**Style 2 - method-level `@Listener`.** `@Listener(name = "…", kind = …)` on a public `void m(String)` method of a `@Component` (Spring `@JmsListener` style), so a single bean can hold several listeners and inject collaborators:

```java
package com.acme.demo;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;

@Component
public class OrderListeners {

    @Listener(name = "queue.orders", kind = ListenerKind.QUEUE)
    public void onOrder(String body) {
        // handle message
    }
}
```

Both styles give compile-time signature checking and a direct dispatch path. There is no reflective by-name fallback. See [`/sdk/messaging/decorators`](/sdk/messaging/decorators) for details.

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

- Working sample: [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator).
- [TypeScript API - messaging](/api/).
- [Java SDK - messaging](/sdk/).
- [SDK reference](https://www.dirigible.io/sdk/).
- Messaging perspective.
