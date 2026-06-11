# rabbitmq/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.rabbitmq`
- source: [rabbitmq/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/rabbitmq)
:::

This module is the RabbitMQ integration surface of the Eclipse Dirigible Java SDK. It exposes a thin facade over the platform's RabbitMQ client - configured via the platform's `.rabbitmq` artefacts - so Java code can publish to a queue and start / stop long-lived consumers without managing the underlying connection, channel, or exchange directly.

For point-to-point queue publishing the platform default channel configuration is used. For richer routing (topic / fanout / direct exchanges, binding keys, custom queue arguments), declare the exchange and queue through a `.rabbitmq` artefact (see the `engine-rabbitmq` documentation) and publish to the resulting queue here. For full per-message ack control or for header / property inspection, drop down to the bare RabbitMQ client through a `@Component` bean.

The main components of this module are:

- [`Producer`](./producer.md) - publishes a single message to a RabbitMQ queue using the platform's default channel configuration.
- [`Consumer`](./consumer.md) - subscribes a registry handler script to a RabbitMQ queue, and stops the subscription when done.

## Classes
