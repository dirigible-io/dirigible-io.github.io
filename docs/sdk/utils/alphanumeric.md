# Alphanumeric

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.utils`
- source: [utils/Alphanumeric.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/utils/Alphanumeric.java)
:::

Random string generators suitable for tokens, short identifiers, and one-shot secrets that fit a "human readable" requirement — no symbols, with no extra filtering of ambiguity-prone glyphs (`0`/`O`, `1`/`l`); reach for a dedicated library if you need that.

The implementation is backed by `java.security.SecureRandom`, so the outputs are cryptographically random; cost is comparable to one `nextInt` per character. Use `random(int, String)` when you need to constrain the alphabet (e.g. uppercase-only for case-insensitive shortcodes), and `randomNumeric(int)` when only digits are wanted.

### Key Features:
- **Cryptographically random**: Backed by `SecureRandom` — safe for tokens, password-reset codes, and one-time secrets.
- **Custom alphabet support**: Pass any non-empty `charset` string to `random(int, String)` for domain-specific shortcodes.
- **Default length 16**: All no-argument overloads emit a 16-character string by default.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.utils.Alphanumeric;

// Default 16-char alphanumeric token
String token = Alphanumeric.random();

// 8-char uppercase-only shortcode for case-insensitive lookups
String code = Alphanumeric.random(8, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

// 6-digit OTP
String otp = Alphanumeric.randomNumeric(6);
```

## Methods

### random()
Generates a 16-character random alphanumeric string using both letter cases and digits.

> ```java
> public static String random();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A 16-character cryptographically random alphanumeric string.
> :::

### random(int length)
Generates a random alphanumeric string of the requested length.

> ```java
> public static String random(int length);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `int` | Desired output length. Must be non-negative. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A cryptographically random alphanumeric string of the requested length.
> :::

### random(int length, String charset)
Generates a random string of the requested length drawn from the supplied character set.

> ```java
> public static String random(int length, String charset);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `int` | Desired output length. Must be non-negative. |
> | `charset` | `String` | Non-empty string whose characters form the alphabet to draw from. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A cryptographically random string of the requested length, drawn uniformly from `charset`.
> :::

### randomAlpha()
Generates a 16-character random alphabetic string (mixed-case letters only, no digits).

> ```java
> public static String randomAlpha();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A 16-character cryptographically random alphabetic string.
> :::

### randomAlpha(int length)
Generates a random alphabetic string of the requested length (mixed-case letters only, no digits).

> ```java
> public static String randomAlpha(int length);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `int` | Desired output length. Must be non-negative. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A cryptographically random alphabetic string of the requested length.
> :::

### randomNumeric()
Generates a 16-character random numeric string (digits only).

> ```java
> public static String randomNumeric();
> ```
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A 16-character cryptographically random numeric string.
> :::

### randomNumeric(int length)
Generates a random numeric string of the requested length — useful for OTPs and short numeric codes.

> ```java
> public static String randomNumeric(int length);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `length` | `int` | Desired output length. Must be non-negative. |
>
> ::: info Returns
> - **Type**: `String`
> - **Description**: A cryptographically random numeric string of the requested length.
> :::
