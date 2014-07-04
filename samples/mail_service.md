---
layout: samples
title: Mail Service
icon: fa-envelope
group: simple
---

Mail Service
===

Create new project or use existing once.

Create new *Scripting Service*

![Mail Service 1](images/mail_service/mail_service_1.png)

Choose *Blank Server-Side JavaScript Service* from the list of available templates

![Mail Service 2](images/mail_service/mail_service_2.png)

Give it some meaningful name (e.g *mail_sender.js*)

![Mail Service 3](images/mail_service/mail_service_3.png)

Now the project structure should look like this

![Mail Service 4](images/mail_service/mail_service_4.png)

Replace the generated code in *mail_sender.js* with the following:

<pre><code>var from = 'employee@your.company.com';
var to = 'boss@your.company.com';
var title = 'Test Email Service';
var body = 'Hello Boss! The mail service is up and running!';
mail.sendMail(from, to, title, body);
response.getWriter().println('Email was sent successfully');
</code></pre>

Select *Preview* tab.
Click on *mail_sender.js* from the *Workspace Explorer*.
Accessing the scripting service will send the email.

![Mail Service 5](images/mail_service/mail_service_5.png)
