---
title: Messaging
description: Devops surface for the embedded ActiveMQ broker - destinations, counters, message browser.
---

# Messaging

`perspective-messaging` (id `messaging`) is the devops and debug surface for the embedded ActiveMQ broker. Inspect destinations, browse pending messages without consuming them, purge queues, remove destinations.

## Layout

- **Destinations** (left) - filterable list of every queue and topic with live counters (enqueued, dequeued, inflight, pending).
- **Message browser** (center) - master / detail of the messages currently pending on the selected queue. Body preview is decoded from `TextMessage` directly; `BytesMessage` payloads are inspected up to 64 KB and rendered as UTF-8 when textual, otherwise base64.

## Actions

| Action                | Effect                                                                                 |
|-----------------------|----------------------------------------------------------------------------------------|
| Purge queue           | Removes every pending message from the queue. Non-destructive to the destination.     |
| Remove single message | Removes one message by its JMS message id.                                            |
| Remove destination    | Deletes the queue / topic itself. Returns `409` if consumers are still attached.       |

## Endpoints

All endpoints live under `/services/ide/messaging-monitoring/` and require one of `ADMINISTRATOR`, `DEVELOPER`, `OPERATOR`:

| Method   | Path                                              | Purpose                                |
|----------|---------------------------------------------------|----------------------------------------|
| `GET`    | `/summary`                                        | Broker meta + every destination + counters. |
| `GET`    | `/queues/{name}/messages?limit=N`                 | Non-destructive browse (cap 200).      |
| `DELETE` | `/queues/{name}/messages`                         | Purge the queue.                       |
| `DELETE` | `/queues/{name}/messages/{messageId}`             | Remove a single message.               |
| `DELETE` | `/queues/{name}`                                  | Remove the destination.                |
| `DELETE` | `/topics/{name}`                                  | Remove the destination.                |

## Topics

JMS topics do not retain non-persistent messages. The destinations view still shows live counters for topics, but the message browser shows an empty list - there is nothing pending to inspect. Use a durable subscriber to retain messages.

## Related

- [Listeners artefact](/help/artefacts/process/listener)
- [`@aerokit/sdk/messaging`](/api/messaging/)
