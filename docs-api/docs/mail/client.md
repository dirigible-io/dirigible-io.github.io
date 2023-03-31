---
title: Mail
---

Mail
===

Mail object is used to send e-mails through the mail service.

=== "Overview"
- Module: `mail/client`
- Definition: [https://github.com/eclipse/dirigible/issues/108](https://github.com/eclipse/dirigible/issues/108)
- Source: [/mail/client.js](https://github.com/eclipse/dirigible/blob/master/components/api-mail/src/main/resources/META-INF/dirigible/mail/client.js)
- Status: `stable`

### Basic Usage

=== "ECMA6"

    ```javascript
    import { client } from "@dirigible/mail";
    import { response } from "@dirigible/http";

    let sender = "dirigible@eclipse.org";
    let to = "example@gmail.com";
    let subject = "Subject";
    let content = "<h1>Content<h1>";
    let subType = "html";

    client.send(sender, to, subject, content, subType);

    response.println("Mail sent");
    ```

=== "CommonJS"

    ```javascript
    var response = require("http/response");
    var mail = require("mail/client");

    var sender = "dirigible@eclipse.org";
    var to = "example@gmail.com";
    var subject = "Subject";
    var content = "<h1>Content<h1>";
    var subType = "html";

    mail.send(sender, to, subject, content, subType);

    response.println("Mail sent");
    ```

#### Advance Usage

=== "ECMA6"

    ```javascript
    import { client } from "@dirigible/mail";
    import { response } from "@dirigible/http";

    let mailConfig = {
        "mail.user": "<your-user>",
        "mail.password": "<your-password>",
        "mail.transport.protocol": "smtps",
        "mail.smtps.host": "smtp.gmail.com",
        "mail.smtps.port": "465",
        "mail.smtps.auth": "true"
    };

    let mailClient = client.getClient(mailConfig);

    let sender = "dirigible@gmail.com";
    let recipients = {
        to: "example@gmail.com",
        cc: ["example1@gmail.com", "example2@sap.com"],
        bcc: "example3@sap.com"
    };
    let subject = "Subject";
    let content = "<h1>Content</h1>";
    let subType = "html";

    mailClient.send(sender, recipients, subject, content, subType);

    response.println("Mail sent");
    ```

=== "CommonJS"

    ```javascript
    var response = require("http/response");
    var mail = require("mail/client");

    var mailConfig = {
        "mail.user": "<your-user>",
        "mail.password": "<your-password>",
        "mail.transport.protocol": "smtps",
        "mail.smtps.host": "smtp.gmail.com",
        "mail.smtps.port": "465",
        "mail.smtps.auth": "true"
    };

    var mailClient = mail.getClient(mailConfig);

    var sender = "dirigible@gmail.com";
    var recipients = {
        to: "example@gmail.com",
        cc: ["example1@gmail.com", "example2@sap.com"],
        bcc: "example3@sap.com"
    };
    var subject = "Subject";
    var content = "<h1>Content</h1>";
    var subType = "html";

    mailClient.send(sender, recipients, subject, content, subType);

    response.println("Mail sent");
    ```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getClient(options)**   | Get mail client with the provided *MailClientOptions*, if no options are provided, the default mail client configuration will be used | *MailClient*
**send(from, recipients, subject, text, subType)**   | Send mail using the default mail client configuration to *MailRecipients*| *-*

### Objects

---

#### MailClient

Property     | Description | Type
------------ | ----------- | --------
**send(from, recipients, subject, text, subType)**   | Send mail to *MailRecipients* | *MailClient function*

#### MailClientOptions

Property     | Description | Type
------------ | ----------- | --------
**mail.user**   | The mailbox user | *string*
**mail.password**   | The mailbox password | *string*
**mail.transport.protocol**   | (optional) The mail transport protocol, default is *smtps* | *string*
**mail.smtps.host**   | The mail SMPTPS host | *string*
**mail.smtps.port**   | The mail SMPTPS port | *number as string*
**mail.smtps.auth**   | Enable/Disable mail SMPTPS authentication | *boolean as string*
**mail.smtp.host**   | The mail SMPTP host | *string*
**mail.smtp.port**   | The mail SMPTP port | *number as string*
**mail.smtp.auth**   | Enable/Disable mail SMPTP authentication | *boolean as string*

Addition mail client options can be found here:
- [SMTP/SMTPS](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html)
- [IMAP](https://javaee.github.io/javamail/docs/api/com/sun/mail/imap/package-summary.html)
- [POP3](https://javaee.github.io/javamail/docs/api/com/sun/mail/pop3/package-summary.html)

#### MailRecipients

Property     | Description | Type
------------ | ----------- | --------
**to**   | The *to* recipient(s) | *string* or *Array of strings*
**cc**   | The *cc* recipient(s) | *string* or *Array of strings*
**bcc**   | The *bcc* recipient(s) | *string* or *Array of strings*
