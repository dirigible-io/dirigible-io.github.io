---
layout: help
title: Messaging
icon: none
group: help-services
---

Messaging Service
===

The Messaging Service provides a passive message hub functionality.

> The endpoints are as follows:

To subscribe the current logged-in user to a topic:

> Parameter: *topic*
>
> **POST** `http //[host]:[port]/[dirigible application context]/ */message/subscribe?topic=XXX*`

To send a message by the current logged-in user to a topic:

> Parameters: *topic*, *subject*, *body*
>
> **POST** `http //[host]:[port]/[dirigible application context]/ */message/send?topic=XXX&subject=YYY*`
> body is send as the raw content of the request 

To receive the message for the current logged-in user:

> Parameter: *topic* optional, otherwise return all the messages for this user
>
> **GET** `http //[host]:[port]/[dirigible application context]/ */message/receive?topic=XXX*`

The routing of the messages is asynchronous task running automatically every minute.

