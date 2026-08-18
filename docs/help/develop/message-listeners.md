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

Isolation is physical, not a filter: the name you write is *logical*, and the platform renames it on
the broker to `<tenantId>###<name>` for every tenant except the default one. A producer resolves that
name from the tenant current at send time, a consumer from the tenant it subscribes in, so the two
meet without either side spelling a prefix - and one tenant's messages can never reach another's
consumers, not even on a queue with competing consumers.

Every message is additionally stamped with a `tenant_id` property, which is what re-establishes the
tenant on the broker thread before your handler runs.

### Global destinations - a contract with another system

Tenant scoping is right for a destination that belongs to the application. It is wrong for one that
**is a contract with someone else** - an integration queue two products agreed on. The other side
neither knows your tenant nor should have to, and cannot subscribe to a prefixed name.

Prefix such a name with `global:` and it is never tenant-scoped:

```java
@Component
public class OrderIntake implements MessageHandler {

    @Override
    public String destination() {
        return "global:codbex.orders";     // physically: codbex.orders
    }

    @Override
    public void onMessage(String message) {
        // ...
    }
}
```

The marker is understood **everywhere a destination name is resolved** - a producer, a synchronous
receive, a `.listener` descriptor's `name`, a `MessageHandler.destination()`, a `@Listener(name =
...)`, and the `source: { queue | topic }` of an [intent `inbound`
arrival](/help/intent/glue#inbound-arrivals-from-outside). `global:codbex.orders` resolves to the
physical destination `codbex.orders` in every tenant, so a consumer in another deployment binds to
the plain name it was given.

::: tip Name it for the contract, not for your app
Convention is `global:<vendor>.<purpose>` - `global:codbex.orders`, `global:acme.invoices.posted`. A
global destination is by definition shared with something the platform cannot see, and only a
namespaced name keeps two products off each other's queues.
:::

Three consequences worth knowing before you reach for it:

- **The destination no longer says which tenant a message belongs to.** A message published to a
  global destination carries the **default** tenant's id in `tenant_id`, so a foreign consumer
  re-establishes a valid context from it. If the business tenant matters downstream, it has to travel
  in the payload.
- **Using the marker outside the default tenant is logged at WARN** - once per tenant and
  destination. It is legitimate, but it is a contract decision, so it is visible in the log rather
  than silent.
- **A global destination is subscribed once for the whole deployment**, not once per tenant. Fanning
  it out would put one consumer per tenant on the very same physical destination - competing for a
  queue's messages, or handling a topic's message once per tenant.

## See also

- Working sample: [`dirigiblelabs/sample-java-listener-decorator`](https://github.com/dirigiblelabs/sample-java-listener-decorator).
- [TypeScript API - messaging](/api/).
- [Java SDK - messaging](/sdk/).
- [SDK reference](https://www.dirigible.io/sdk/).
- Messaging perspective.
