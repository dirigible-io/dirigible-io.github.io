---
title: Listeners
description: Active message listeners.
---

# Listeners

Lists the message listeners currently registered against the embedded ActiveMQ broker.

## Columns

- **Name** - listener name.
- **Destination** - queue or topic name.
- **Kind** - `QUEUE` or `TOPIC`.
- **Handler** - JS / TS file or Java class invoked per message.
- **State** - `ACTIVE`, `STOPPED`, `ERROR`.
- **Owner** - declaring project.

The view is read-only. Authoring is done via [Listener artefacts](/help/artefacts/) (`*.listener` files reconciled by the listener synchronizer).

## See also

- [Messaging perspective](/help/ide/perspectives/) - broker-level destinations and message browser.
- [@aerokit/sdk/messaging](/sdk/) - send and receive from JS / TS code.
