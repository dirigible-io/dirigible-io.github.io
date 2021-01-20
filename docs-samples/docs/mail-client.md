---
title: Send Email
hide:
  - toc
---

Send Email
===

### Steps

1. Create a project `mail-project`.
2. Create a JavaScript service with the name `mail-service.js`.
3. Enter the following content:

```javascript

var response = require("http/v4/response");
var mail = require("mail/v4/client");

var from = "from@email.address";
var to = "to@email.address";
var subject = "Subject";
var content = "<h1>Content<h1>";
var subType = "html";

mail.send(from, to, subject, content, subType);

response.println("Mail sent");

```
> Note: This sample leverages the default mail configuration provided through the [environment variables](../../help/setup/setup-environment-variables)

---

1. Create a project `mail-custom-project`.
2. Create a JavaScript service with the name `mail-custom-service.js`.
3. Enter the following content:

```javascript

var response = require("http/v4/response");
var mail = require("mail/v4/client");

var mailConfig = {
	"mail.user": "<your-mailbox-user>",
	"mail.password": "<your-mailbox-password>",
	"mail.transport.protocol": "smtps",
	"mail.smtps.host": "smtp.gmail.com",
	"mail.smtps.port": "465",
	"mail.smtps.auth": "true"
};

var mailClient = mail.getClient(mailConfig);

var from = "<your-mailbox-user>@gmail.com";
var recipients = {
	to: "<your-mailbox-user>@gmail.com",
	cc: ["<your-mailbox-user>@gmail.com", "<your-mailbox-user-2>@sap.com"],
	bcc: "<your-mailbox-user>@sap.com"
};
var subject = "Subject";
var content = "<h1>Content</h1>";
var subType = "html";

mailClient.send(from, recipients, subject, content, subType);

response.println("Mail sent");

```
> Note: This sample leverages Gmail SMTPS, to make this sample work, access from third party applications ([Less secure apps](https://support.google.com/accounts/answer/6010255?hl=en)) should be enabled, also [Troubleshoot Problems](https://support.google.com/mail/answer/78754) could help

---

> For more information, see the *[API](../../api/)* documentation.
