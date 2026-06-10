# Assert

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.junit`
- source: [junit/Assert.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/junit/Assert.java)
:::

xUnit-style assertion helpers that throw `AssertionError` on failure, so they integrate with every JVM test runner without further wiring (JUnit 5, TestNG, Spock, plain `@Test` methods invoked from a controller). Suitable for smoke tests and ad-hoc verification scripts written as plain Java client code inside Dirigible.

::: warning Lightweight helper — not a JUnit replacement
For full-blown test suites — fixtures, parameterised tests, lifecycle hooks, parallel execution — pull JUnit Jupiter into the project and use `org.junit.jupiter.api.Assertions` directly. This class deliberately covers only the small overlap appropriate for in-platform smoke tests.
:::

### Key Features

- **No runner required**: Each helper throws plain `AssertionError`, so it works inside a controller, a scheduled job, a script, or any test runner.
- **Optional message**: Every helper has a one-arg form and a `String message` overload for richer failure output.
- **Symmetric API**: `assertTrue` / `assertFalse`, `assertEquals` / `assertNotEquals`, `assertNull` / `assertNotNull`, `fail`.

### Example Usage

```java
import static org.eclipse.dirigible.sdk.junit.Assert.*;

public class Smoke {

    public static void run() {
        assertEquals("answer is 42", 42, compute());

        String token = login("admin", "pwd");
        assertNotNull(token);

        Result result = fetch(token);
        assertTrue("result should be ok", result.isOk());
    }
}
```

## Methods

### assertTrue()

Throws `AssertionError` if the condition is `false`.

> ```java
> public static void assertTrue(boolean condition);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `boolean` | The condition that must be `true`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertTrue() with message

Throws `AssertionError` with the supplied message if the condition is `false`.

> ```java
> public static void assertTrue(String message, boolean condition);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | The failure message. |
> | `condition` | `boolean` | The condition that must be `true`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertFalse()

Throws `AssertionError` if the condition is `true`.

> ```java
> public static void assertFalse(boolean condition);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `condition` | `boolean` | The condition that must be `false`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertFalse() with message

Throws `AssertionError` with the supplied message if the condition is `true`.

> ```java
> public static void assertFalse(String message, boolean condition);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | The failure message. |
> | `condition` | `boolean` | The condition that must be `false`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertEquals()

Throws `AssertionError` if `expected` and `actual` are not equal (uses `Objects.equals`, so two `null`s compare equal).

> ```java
> public static void assertEquals(Object expected, Object actual);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `expected` | `Object` | The expected value. |
> | `actual` | `Object` | The actual value. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertEquals() with message

Throws `AssertionError` with the supplied message if `expected` and `actual` are not equal.

> ```java
> public static void assertEquals(String message, Object expected, Object actual);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | The failure message prefix. |
> | `expected` | `Object` | The expected value. |
> | `actual` | `Object` | The actual value. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertNotEquals()

Throws `AssertionError` if `unexpected` and `actual` are equal (uses `Objects.equals`).

> ```java
> public static void assertNotEquals(Object unexpected, Object actual);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `unexpected` | `Object` | The value that `actual` must *not* equal. |
> | `actual` | `Object` | The actual value. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertNotEquals() with message

Throws `AssertionError` with the supplied message if `unexpected` and `actual` are equal.

> ```java
> public static void assertNotEquals(String message, Object unexpected, Object actual);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | The failure message prefix. |
> | `unexpected` | `Object` | The value that `actual` must *not* equal. |
> | `actual` | `Object` | The actual value. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertNull()

Throws `AssertionError` if `value` is non-null.

> ```java
> public static void assertNull(Object value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `Object` | The value that must be `null`. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### assertNotNull()

Throws `AssertionError` if `value` is `null`.

> ```java
> public static void assertNotNull(Object value);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `value` | `Object` | The value that must be non-null. |
>
> ::: info Returns
> - **Type**: `void`
> :::

### fail()

Unconditionally throws `AssertionError`. Use to mark an unreachable branch or a pending test.

> ```java
> public static void fail();
> ```
>
> ::: info Returns
> - **Type**: `void`
> :::

### fail() with message

Unconditionally throws `AssertionError` with the supplied message.

> ```java
> public static void fail(String message);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `message` | `String` | The failure message. |
>
> ::: info Returns
> - **Type**: `void`
> :::
