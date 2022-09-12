---
title: Connecting Eclipse Dirigible with SendGrid SMTP Relay
description: In this article we are going to setup Twillio SendGrid's SMTP Relay with Eclipse Dirigible.
author: Ivo Yakov
author_gh_user: https://github.com/Fluctuationqt/
author_avatar: https://avatars.githubusercontent.com/u/19828259?v=4
read_time: 5 min
publish_date: September 12, 2022
---

# Connecting Eclipse Dirigible with SendGrid SMTP Relay

Recent changes in Gmail's policies allows Dirigible users to send emails only via Workspace enabled accounts in G Suite and require workspace administration privileges. By connecting Eclipse Dirigible with Twilio SendGrid's SMTP Relay feature you can send Emails with your personal gmail account. </br>

<b>Notice:</b> <i>SendGrid is a 3rd party service and charges/limits apply (See their Email API Plans [here](https://sendgrid.com/pricing/?sg_product=mc)). </i>

## Setup SendGrid Account

- Create a SendGrid account at https://app.sendgrid.com/
- Login at https://app.sendgrid.com/
- Verify a single sender email
  - Click `Settings` > `Sender Authentication` > `Verify a Single Sender`
  - Enter the details of the email address that Dirigible mails will be sent from.
- Setup SMTP Relay
  - Click `Email API` > `Integration Guide` > `SMTP Relay`
  - Enter an API Key Name and click `Create Key` to get an API Key for your SendGrid SMTP Relay.
  - Notice the `Configure your application` section. The details from it will be your `dirigible.properties` configuration
  
## Setup Eclipse Dirigible

- Setup Dirigible Properties
  - Add the following entries to your dirigible.properties:
    ```
    DIRIGIBLE_MAIL_USERNAME=apikey
    DIRIGIBLE_MAIL_PASSWORD=<YOUR_API_KEY_HERE/>
    DIRIGIBLE_MAIL_TRANSPORT_PROTOCOL=smtps
    DIRIGIBLE_MAIL_SMTPS_HOST=smtp.sendgrid.net
    DIRIGIBLE_MAIL_SMTPS_PORT=465
    ```
- Send an email by running this script
    ```
    import { client as mail } from "@dirigible/mail";
    
    const from = "<YOUR_VERIFIED_SENDER_EMAIL_HERE/>";
    const to = "<YOUR_RECIPIENT_EMAIL_HERE/>";
    const subject = "Subject";
    const content = "Hello World!";
    const subType = "html";
    
    mail.send(from, to, subject, content, subType);
    ```
    