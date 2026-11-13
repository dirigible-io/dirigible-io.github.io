---
title: Sharing a document through a link
description: The intent share construct - a random, revocable link that hands the issued copy of a document to a reader without an account, opt-in per entity.
---

# Sharing a document through a link

`share:` on an entity declares that the **issued copy** of its records may be opened by somebody without an account - a customer, a supplier - through a link a user creates on the record and sends by e-mail or a messenger. Whoever holds the link opens the document's stored PDF without signing in.

It is off unless declared, per entity. No setting makes an undeclared entity shareable, so the set of documents an anonymous reader can ever receive is exactly the set of `share:` blocks in the intent.

## Declaring it

```yaml
entities:
  - name: SalesInvoice
    function: Document
    share:
      when: "status == ISSUED"      # required - only a record in this state can get a link
      copy: SalesInvoiceCopy        # required - the function: Snapshot child whose stored file is served
      roles: [SalesInvoiceShare]    # required - who may create and revoke links; [] admits nobody
      expiresAfterDays: 0           # optional - 0 (default) = permanent; a tenant can only shorten it
    relations:
      - { name: status, kind: manyToOne, to: InvoiceStatus, function: EntityStatus }
  - name: SalesInvoiceItem
    function: DocumentItem
    relations:
      - { name: SalesInvoice, kind: manyToOne, to: SalesInvoice, composition: true, required: true }
  - name: SalesInvoiceCopy
    function: Snapshot
    relations:
      - { name: SalesInvoice, kind: manyToOne, to: SalesInvoice, composition: true, required: true }

permissions:
  - { role: SalesInvoiceShare }
```

| Key | Required | Meaning |
|---|---|---|
| `when` | yes | A record condition in the grammar of `visibleWhen:` (`<property> ==\|!= <literal>`, a status by name). Only a record in this state can have a link. |
| `copy` | yes | A `function: Snapshot` composition child of this entity. A link serves the stored file of the record's newest copy - see [The issued copy and its language](/help/intent/printing#the-issued-copy-and-its-language). |
| `roles` | yes | Roles declared under `permissions` that may list, create and revoke links. `roles: []` is legal and admits nobody, the administrator included. |
| `expiresAfterDays` | no | The life of a new link in whole days, `0` to `3650`. `0` (the default) is permanent. |

Rejected at Generate, each naming the entity:

- no `when:` - a draft would be as shareable as an issued document;
- a `when:` that guards something that is not a field or to-one relation of the entity;
- no `copy:`, a `copy:` that is not an entity of the model, not a `function: Snapshot` entity, or not a composition child of this entity;
- a `copy:` on an entity that is not a printable document (it has no `function: DocumentItem` child), because such a copy is never minted;
- no `roles:` key, or a role `permissions` does not declare;
- an `expiresAfterDays` that is not a whole number of days from 0 to 3650;
- an unknown key under `share:`;
- `share:` on a personal entity (see the warning below).

::: warning Never share personal documents
A link is a bearer credential: whoever holds it reads the document. `share:` on an entity whose records belong to the signed-in person - a `personal: true` relation on it or on a composition ancestor (payslips, leave requests, employment contracts) - is refused at Generate. Those documents stay behind sign-in; a notification about them carries `{recordUrl}`, which needs a sign-in.
:::

A process step must mint the copy before a link can be created: bind the generated snapshot handler (`delegate: gen.events.<Entity>SnapshotGenerator`) at the step that issues the document. Issuing does not create a link - a link exists only because a user created one.

## On the record page

The record page of a `share:` entity gets a **Share links** section, shown to a user who holds one of the declared roles:

- **Create link** is offered while the record satisfies `when:`. It needs the record in that state and a stored copy.
- The new link's URL is shown **once**, with a **Copy** button and the note that anyone who has it can open the document without signing in. It cannot be read again; if it is lost, create another link.
- Every link of the record is listed with its status (**Active**, **Expired** or **Revoked**), the file it serves, its expiry (a date, or "Never expires"), how many times it was opened and when it was last opened.
- **Revoke** on an active link asks for confirmation and stops the link at once. A revoke cannot be undone.

The section is on the back-office record page only. The personal (My) and partner surfaces have no share endpoints.

## What a link serves

`GET /public/share/<token>` streams the stored file of the record's newest `copy:` entry, and nothing else: never the live record, a new render, another file of the record or a listing. What the reader sees is what was issued.

- The token is 256 random bits, unrelated to the record's `uuid` (which is printed on the document and is no secret). Only its SHA-256 is stored.
- The route reads no session and creates none.
- The response carries `Cache-Control: private, no-store`, `X-Robots-Tag: noindex` and `Referrer-Policy: no-referrer`.
- An unknown, expired or revoked token, a token of another tenant, and a link whose file is gone all answer the **same empty 404**. Nothing tells a caller which tokens ever existed.
- A throttled caller is answered **429** (see [Settings](#settings)).
- Nothing is cached: a link's liveness is read from the database on every open, so a revoke is immediate on every node.

**A record that leaves the `when:` state loses its links for good.** The check is made when a link is opened (and when the record's links are listed), so a void by a user, a workflow step, a job or a delete all stop the link the same way. The link is revoked by the system, and moving the record back into the state does not revive it - a new link is somebody's decision.

**Tenant binding.** A token is looked up in the tenant the request's host resolves to, so a token presented on another tenant's host is a 404. Under the `TOKEN_GROUPS` tenant resolution strategy, where one host serves every tenant, the token itself names its tenant (`<tenantId>.<secret>`).

Every open is recorded with its time, the link, the remote address and the user agent.

## Generated endpoints

On the entity's generated controller, gated by the declared `roles:` alone:

| Method | Path | Does |
|---|---|---|
| `GET` | `/{id}/share-links` | The record's links, newest first. Never their tokens. |
| `POST` | `/{id}/share-links` | Creates a link and answers `201` with its URL - the only time the URL is disclosed. |
| `DELETE` | `/{id}/share-links/{linkId}` | Revokes one link. |

A caller without one of the roles gets `403`. `POST` answers `409` when the record is not in the `when:` state, when it has no stored copy yet, or when sharing is switched off for the tenant.

## Settings

Per tenant, as [tenant configuration](/help/operate/tenant-configuration) overrides. Both only restrict: neither can make an undeclared entity shareable or lengthen a declared expiry.

| Variable | Default | Purpose |
|---|---|---|
| `DIRIGIBLE_DOCUMENTS_SHARE_ENABLED` | `true` | `false` switches sharing off for the tenant: no link is created and every existing link answers 404. |
| `DIRIGIBLE_DOCUMENTS_SHARE_MAX_EXPIRY_DAYS` | `0` | The longest life, in days, a new link may get. A permanent or longer-lived declaration is capped to it. `0` leaves the declared `expiresAfterDays` as it is. |

Per instance:

| Variable | Default | Purpose |
|---|---|---|
| `DIRIGIBLE_DOCUMENTS_SHARE_RATE_LIMIT_PER_MINUTE` | `60` | Requests per minute the public route answers per remote address, and per link. The rest get 429 until the minute ends. |
| `DIRIGIBLE_DOCUMENTS_SHARE_MISS_LIMIT` | `10` | How many links that do not answer one remote address may ask for within ten minutes before it is answered 429. |

The throttle counters are kept in memory, per node.

## Not in this version

- A `{shareUrl}` placeholder in a `notify` body. A link is not minted before the copy exists, and the send often runs first.
- Payment or acceptance on the public page.
- A second factor (a PIN or one-time code) on a link.
- Sharing reports or arbitrary files.

Tracked in [eclipse-dirigible/dirigible#8613](https://github.com/eclipse-dirigible/dirigible/issues/8613).

## See also

- [Printing and documents](/help/intent/printing)
- [DSL reference](/help/intent/dsl-reference)
- [Tenant-aware configuration](/help/operate/tenant-configuration)
