
h1. Mail Service

Create new project or use existing once.

Create new *Scripting Service*

!images/mail_service/mail_service_1.png!

Choose *Blank Server-Side JavaScript Service* from the list of available templates

!images/mail_service/mail_service_2.png!

Give it some meaningful name (e.g *mail_sender.js*)

!images/mail_service/mail_service_3.png!

Now the project structure should look like this

!images/mail_service/mail_service_4.png!

Replace the generated code in *mail_sender.js* with the following
{code}
var from = 'employee@your.company.com';
var to = 'boss@your.company.com';
var title = 'Test Email Service';
var body = 'Hello Boss! The mail service is up and running!';
mail.sendMail(from, to, title, body);
response.getWriter().println('Email was sent successfully');
{code}

Select *Web Viewer* tab.
Click on *mail_sender.js* from the *Workspace Explorer*.
Accessing the scripting service will send the email.

!images/mail_service/mail_service_5.png!

h3. Congratulations, you've sent an email for less than five minutes :)