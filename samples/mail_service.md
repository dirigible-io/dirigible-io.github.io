---
layout: samples
title: Mail Service
icon: fa-envelope
group: simple
---

Mail Service
===

1. Create a new project or use an existing one.
2. Select the *ScriptingServices* sub-folder of the project and open the pop-up menu.
3. Choose *New* -> *Scripting Service*.
4. Choose **Server-Side JavaScript Service** from the list of available templates.
<br></br>
![Mail Service 2](images/mail_service/mail_service_2.png)
<br></br>
5. Give it a meaningful name (e.g **mail_sender.js**).
<br></br>
![Mail Service 3](images/mail_service/mail_service_3.png)
<br></br>
6. The project structure should look like this:
<br></br>
![Mail Service 4](images/mail_service/mail_service_4.png)
<br></br>
7. Now replace the generated code in **mail_sender.js** with the following:
<br></br>
<pre><code>var from = 'employee@your.company.com';
var to = 'boss@your.company.com';
var title = 'Test Email Service';
var body = 'Hello Boss! The mail service is up and running!';
mail.sendMail(from, to, title, body);
response.getWriter().println('Email was sent successfully');
</code></pre>
8. Select the *Preview* tab.
9. Click on **mail_sender.js** from the *Workspace Explorer*.
The operation for the scripting service access  will send the e-mail.
<br></br>
![Mail Service 5](images/mail_service/mail_service_5.png)
