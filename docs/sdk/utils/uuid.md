# Uuid

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Uuid.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Uuid.java)
:::

UUID generation and validation. `random()` produces a Version 4 (random) UUID using the JDK's `java.util.UUID.randomUUID()`; `validate(String)` checks string conformance without throwing - useful for trusting or rejecting an inbound identifier before parsing it.

Use this rather than `java.util.UUID.randomUUID().toString()` when you want UUID generation to stay consistent with the rest of the platform.

### Key Features:
- **Version-4 random UUIDs** - backed by the JDK secure RNG.
- **Non-throwing validation** - `validate` returns a boolean rather than raising on malformed input.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Uuid;

String id = Uuid.random();
boolean ok = Uuid.validate("550e8400-e29b-41d4-a716-446655440000");
```

## Methods

### random()

Produces a new Version 4 UUID.

> ```java
> public static String random();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: The UUID as the canonical 36-character ASCII string.
> :::

### validate()

Returns `true` if the supplied string is a syntactically valid UUID.

> ```java
> public static boolean validate(String uuid);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `uuid` | `String` | Candidate UUID string. |
>
> ::: info Returns
> - **Type**: `boolean`
> - **Description**: `true` if the string conforms to UUID syntax; `false` otherwise.
> :::
