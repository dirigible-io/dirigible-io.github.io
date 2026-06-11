# Mail

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.mail`
- source: [mail/Mail.java](https://github.com/eclipse/dirigible/blob/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/mail/Mail.java)
:::

SMTP delivery entry point. `getInstance()` returns the platform-configured `MailClient` (host, port, credentials picked up from `DIRIGIBLE_MAIL_*` config); the `Properties`-accepting overload lets you override settings per call for one-off messages or multi-tenant fan-out.

Each `send` accepts a list of `Map` parts - one per MIME body - that the underlying client packs into a `multipart/mixed` or `multipart/alternative` structure. Use a `text/plain` and `text/html` pair for typical transactional mail.

### Key Features:
- **Platform-default client** - picks up `DIRIGIBLE_MAIL_*` configuration automatically.
- **Per-call overrides** - `getInstance(properties)` supports multi-tenant fan-out.
- **MIME parts via `Map`** - consistent JSON-shaped parts across the platform.

### Example Usage:
```java
import org.eclipse.dirigible.sdk.mail.Mail;
import java.util.List;
import java.util.Map;

Map result = Mail.send(
    "noreply@acme.com",
    new String[] { "alice@acme.com" },
    null,
    null,
    "Your invoice",
    List.of(
        Map.of("type", "text", "subType", "plain", "content", "Invoice attached."),
        Map.of("type", "text", "subType", "html",  "content", "<p>Invoice attached.</p>")
    )
);
```

## Methods

### getInstance()

Returns the platform-configured mail client.

> ```java
> public static MailClient getInstance();
> ```
>
> ::: info Returns
> - **Type**: `MailClient`
> - **Description**: The default mail client wired from `DIRIGIBLE_MAIL_*` config.
> :::

### getInstance() - properties override

Returns a mail client built from the supplied `Properties`, allowing per-call overrides of host, port, credentials, and other JavaMail settings.

> ```java
> public static MailClient getInstance(Properties properties);
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `properties` | `Properties` | JavaMail properties to override the defaults. |
>
> ::: info Returns
> - **Type**: `MailClient`
> - **Description**: A mail client backed by the supplied properties.
> :::

### send()

Sends a multipart message via the default mail client.

> ```java
> public static Map send(String from, String[] to, String[] cc, String[] bcc, String subject, List<Map> parts)
>     throws MessagingException;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `from` | `String` | Sender address. |
> | `to` | `String[]` | Primary recipients. |
> | `cc` | `String[]` | Carbon-copy recipients (may be `null`). |
> | `bcc` | `String[]` | Blind-carbon-copy recipients (may be `null`). |
> | `subject` | `String` | Mail subject. |
> | `parts` | `List<Map>` | One `Map` per MIME part - keys typically `type`, `subType`, `content`. |
>
> ::: info Returns
> - **Type**: `Map`
> - **Description**: Result map from the underlying client (e.g. message id). |
> :::
