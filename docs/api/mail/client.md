# MailClient

## Overview

::: tip Module
- package: `@aerokit/sdk/mail`
- source: [mail/client.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/mail/client.ts)
- last updated: 
:::

The MailClient provides a client for sending emails, supporting both simple text/HTML messages and complex multipart messages with attachments or inline content. It abstracts the underlying Java MailFacade, allowing developers to send emails using a straightforward API while handling recipient processing and content formatting internally.

### Key Features:
- **Simple Email Sending**: The `send` method allows sending basic emails with a single text or HTML body.
- **Multipart Email Support**: The `sendMultipart` method enables sending complex emails composed of multiple parts, including attachments and inline content.
- **Recipient Handling**: Supports flexible recipient specifications, allowing for 'to', 'cc', and 'bcc' fields to be provided as either strings or arrays.
- **Configuration Options**: The constructor accepts an optional configuration object for customizing the mail client (e.g., SMTP settings).

### Use Cases:
- **Notification Emails**: Use the MailClient to send notifications, alerts, or updates to users via email.
- **Transactional Emails**: Send transactional emails such as order confirmations, password resets, or account activations.
- **Rich Content Emails**: Leverage multipart email capabilities to include attachments, inline images, or mixed content in emails.

### Example Usage:
```ts
import { MailClient } from "@aerokit/sdk/mail";

// Send a simple HTML email
MailClient.send("user@example.com", "Subject", "<p>Hello, World!</p>", "html");
```

## Classes

### MailClient

#### sendMultipart()

A static convenience method to send a multipart email without instantiating a client.
This is suitable for emails that require attachments, inline images, or mixed content.

> ```ts
> static sendMultipart(from: string, recipients: any, subject: string, parts: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `from` | `string` | The sender's email address. |
> | `recipients` | `any` | The recipient(s) structure (string for 'to', or MailRecipients object). |
> | `subject` | `string` | The subject line of the email. |
> | `parts` | `any` | An array of MailMultipart objects defining the email content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### send()

A static convenience method to send a simple email with only a single text or HTML body.

> ```ts
> static send(from: string, recipients: any, subject: string, text: string, contentType: MailContentType): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `from` | `string` | The sender's email address. |
> | `recipients` | `any` | The recipient(s) structure (string for 'to', or MailRecipients object). |
> | `subject` | `string` | The subject line of the email. |
> | `text` | `string` | The body content of the email. |
> | `contentType` | `MailContentType` | Specifies the body format: 'html' or 'plain'. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### send()

Sends a simple email with a single body part (text or HTML).

> ```ts
> send(from: string, _recipients: any, subject: string, text: string, contentType: MailContentType): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `from` | `string` | The sender's email address. |
> | `_recipients` | `any` | The recipient(s) structure (string for 'to', or MailRecipients object). |
> | `subject` | `string` | The subject line of the email. |
> | `text` | `string` | The body content of the email. |
> | `contentType` | `MailContentType` | Specifies the body format: 'html' or 'plain'. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

#### sendMultipart()

Sends a complex email composed of multiple parts (text bodies, HTML, attachments, inline content).

> ```ts
> sendMultipart(from: string, _recipients: any, subject: string, parts: any): void;
> ```
>
> | Parameter | Type | Description |
> | ------ | ------ | ------ |
> | `from` | `string` | The sender's email address. |
> | `_recipients` | `any` | The recipient(s) structure (string for 'to', or MailRecipients object). |
> | `subject` | `string` | The subject line of the email. |
> | `parts` | `any` | An array of MailMultipart objects defining the email content. |
>
> ::: info Returns
> - **Type**: `void`
> - **Description**: 
> :::

