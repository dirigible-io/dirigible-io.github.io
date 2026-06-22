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
package demo.listener;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.MessageHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class OrderListener implements MessageHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger("app.out");

    @Override
    public String destination() {
        return "java-order-queue";
    }

    @Override
    public void onMessage(String message) {
        LOGGER.info("OrderListener received: {}", message);
    }

    @Override
    public void onError(String error) {
        LOGGER.error("OrderListener error: {}", error);
    }
}
```

`kind()` defaults to `QUEUE`, so a queue listener overrides only `destination()` and `onMessage` (and optionally `onError`).

**Style 2 - method-level `@Listener`.** `@Listener(name = "…", kind = …)` on a public `void m(String)` method of a `@Component` (Spring `@JmsListener` style), so a single bean can hold several listeners and inject collaborators. Here the listener depends on a plain `@Component` collaborator (`Auditor`) injected through the constructor:

```java
package demo.listener;

import org.eclipse.dirigible.sdk.component.Component;
import org.eclipse.dirigible.sdk.messaging.Listener;
import org.eclipse.dirigible.sdk.messaging.ListenerKind;

@Component
public class InvoiceListener {

    private final Auditor auditor;

    public InvoiceListener(Auditor auditor) {
        this.auditor = auditor;
    }

    @Listener(name = "java-invoice-queue", kind = ListenerKind.QUEUE)
    public void onInvoice(String message) {
        auditor.record("invoice received: " + message);
    }
}
```

Both styles give compile-time signature checking and a direct dispatch path. There is no reflective by-name fallback. See [`/sdk/messaging/decorators`](/sdk/messaging/decorators) for details.

**Sample project:** [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator) - `OrderListener` (interface style on `java-order-queue`) and `InvoiceListener` (method-level `@Listener` with an injected `Auditor`). SDK reference: [`/sdk/`](https://www.dirigible.io/sdk/).

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
