# Consumer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.kafka`
- source: [kafka/Consumer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/kafka/Consumer.java)
:::

Manages a long-lived Kafka consumer for a topic. `startListening(String, String, int, String)` begins consumption &mdash; the `handler` argument is the registry path of a registry handler (matching the platform listener convention) that will be invoked for each record. `timeout` is the poll timeout in milliseconds.

Stop the consumer with `stopListening(String, String)` when you're done, and call `closeProducer(String)` from a Java `@Component` that holds an ephemeral producer (the consumer / producer share underlying configuration; `closeProducer` releases the platform's cached producer for the given configuration).

### Key Features:
- **Long-lived Consumer**: Once started, the consumer thread is managed by the platform &mdash; it polls in a loop and dispatches each record to the handler.
- **Script-backed Handlers**: The `handler` argument points at a registry handler in the platform registry, so Kafka events can be processed by the same scripts used by other event sources.
- **Configuration-keyed**: Consumer and pooled producer are both keyed by `configurationJson` &mdash; matching configurations share underlying connections.
- **Explicit Lifecycle**: Pair every `startListening` with a `stopListening`. Use `closeProducer` to release a cached producer when its owning component shuts down.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.kafka.Consumer;

String config = """
    {
      "bootstrap.servers": "kafka-1:9092",
      "group.id": "orders-consumer",
      "key.deserializer": "org.apache.kafka.common.serialization.StringDeserializer",
      "value.deserializer": "org.apache.kafka.common.serialization.StringDeserializer"
    }
    """;

// Begin consuming from 'orders' &mdash; each record goes to the registered handler script.
Consumer.startListening("orders", "/myproject/handlers/on-order.ts", 1000, config);

// ... later, on shutdown ...
Consumer.stopListening("orders", config);
Consumer.closeProducer(config);
```

## Methods

### startListening()

Starts a long-lived Kafka consumer on the named topic. Each polled record is dispatched to the supplied registry handler.

> ```java
> public static void startListening(String destination, String handler, int timeout, String configurationJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `String` | Name of the Kafka topic to consume from. |
> | `handler` | `String` | Registry path of the registry handler invoked for each record. |
> | `timeout` | `int` | Poll timeout in milliseconds. |
> | `configurationJson` | `String` | Kafka consumer configuration as a JSON document. `null` uses the platform default. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the consumer has been registered. The underlying poll loop continues to run on a platform-managed thread until `stopListening` is called.
> :::

### stopListening()

Stops the consumer previously started for the given destination + configuration pair.

> ```java
> public static void stopListening(String destination, String configurationJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `String` | Name of the Kafka topic the consumer is bound to. |
> | `configurationJson` | `String` | The same configuration JSON used in the matching `startListening` call. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the consumer's poll loop has been signalled to stop and resources have been released.
> :::

### closeProducer()

Releases the platform-cached Kafka `Producer` associated with the given configuration. Call this when a component holding an ephemeral producer is shutting down.

> ```java
> public static void closeProducer(String configurationJson);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `configurationJson` | `String` | Configuration JSON identifying the cached producer to close. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the cached producer has been closed and removed from the platform's producer cache.
> :::
