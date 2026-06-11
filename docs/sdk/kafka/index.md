# kafka/index

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.kafka`
- source: [kafka/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/kafka)
:::

This module is the Apache Kafka integration surface of the Eclipse Dirigible Java SDK. It exposes a thin facade over the platform's Kafka client, so Java code can publish records to a topic and start / stop long-lived consumers without managing the Kafka `Producer` / `Consumer` lifecycle directly.

Configuration is passed as a JSON document on each call: `bootstrap.servers`, `acks`, `key.serializer`, `value.serializer`, group / partitioner settings, compression - anything the upstream Kafka client accepts. Passing `null` falls back to the platform default configuration; passing the same JSON across calls lets the platform pool the underlying `Producer` connection, while a change in JSON causes the platform to rebuild it.

The main components of this module are:

- [`Producer`](./producer.md) - publishes a single record (key + value) to a Kafka topic.
- [`Consumer`](./consumer.md) - starts / stops a long-lived Kafka consumer that dispatches each polled record to a registry handler script, and releases pooled producers.

## Classes
