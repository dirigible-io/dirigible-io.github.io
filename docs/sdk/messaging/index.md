# messaging/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.messaging`
- source: [messaging/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/messaging)
:::

This module is the platform messaging surface of the Eclipse Dirigible Java SDK. It exposes the embedded ActiveMQ broker that ships with every Dirigible runtime, letting Java code publish to and consume from JMS-style queues (point-to-point) and topics (publish/subscribe) without any client-side broker plumbing.

Two consumption styles are supported. For long-running, always-on listeners the platform manages the consumer thread, reconnects, and dispatch &mdash; a class is marked with `@Listener`, exposes a public `onMessage(String)` method, and the runtime wires it up at startup and on hot-reload. For script-style or pull-based code that processes a single message and exits, the `Consumer` facade offers a blocking `receiveFromQueue` / `receiveFromTopic` with a millisecond timeout. Every component running on the platform &mdash; in any language &mdash; targets the same broker, so producers and listeners interoperate transparently regardless of where the message originates.

The main components of this module are:

- [`Producer`](./producer.md) &mdash; sends a message to a queue or topic on the embedded ActiveMQ broker.
- [`Consumer`](./consumer.md) &mdash; synchronously pulls a single message from a queue or topic with a millisecond timeout.
- [Decorators](./decorators.md) &mdash; annotation set used to declare always-on listeners:
  - `@Listener` &mdash; marks a class as an ActiveMQ message listener
  - `ListenerKind` &mdash; enum selecting `QUEUE` or `TOPIC` semantics for the annotated listener

## Classes
