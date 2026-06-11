# Producer

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.kafka`
- source: [kafka/Producer.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/kafka/Producer.java)
:::

Publishes a single record to a Kafka topic. `configurationJson` is the Kafka producer configuration as a JSON document - `bootstrap.servers`, `acks`, `key.serializer`, and so on. `null` uses the platform default configuration; pass an explicit JSON when you need to override broker, partitioner, or compression on a per-call basis.

For high-throughput producers, prefer keeping a single configuration alive across calls so the underlying Kafka `Producer` can pool connections; configuration changes between calls cause the platform to rebuild the producer.

### Key Features:
- **Single-record Publish**: One method, one record - key and value are passed as `String` and serialized by the configured Kafka serializers.
- **Pluggable Configuration**: Each call accepts a Kafka producer configuration JSON, or `null` for the platform default. Configuration is the same shape the upstream Kafka client accepts.
- **Connection Pooling**: Reusing the same `configurationJson` across calls lets the platform pool the underlying Kafka `Producer`; switching configuration rebuilds it.
- **Convenience Overload**: A two-argument `send(destination, key, value)` falls back to the platform default configuration.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.kafka.Producer;

// Use the platform default configuration.
Producer.send("orders", "order-42", "{\"id\":42,\"status\":\"created\"}");

// Override broker and acknowledgement mode for this call.
String config = """
    {
      "bootstrap.servers": "kafka-1:9092,kafka-2:9092",
      "acks": "all",
      "key.serializer": "org.apache.kafka.common.serialization.StringSerializer",
      "value.serializer": "org.apache.kafka.common.serialization.StringSerializer"
    }
    """;
Producer.send("orders", "order-42", "{\"id\":42}", config);
```

## Methods

### send()

Publishes a single record to the named topic. Two overloads are provided - one taking an explicit Kafka producer configuration JSON, one falling back to the platform default.

> ```java
> public static void send(String destination, String key, String value, String configurationJson);
> public static void send(String destination, String key, String value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `destination` | `String` | Name of the Kafka topic. |
> | `key` | `String` | Record key - used for partitioning. |
> | `value` | `String` | Record value - the message payload. |
> | `configurationJson` | `String` | Kafka producer configuration as a JSON document. `null` uses the platform default. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: Returns once the underlying Kafka `Producer` has accepted the record for sending. Final acknowledgement from the broker is governed by the configured `acks` setting.
> :::
