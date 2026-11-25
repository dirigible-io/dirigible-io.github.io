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
      expiry:                       # optional - the first entry the record meets sets the link's life
        - { when: "Customer.Kind == 2", days: 30 }
    relations:
      - { name: status, kind: manyToOne, to: InvoiceStatus, function: EntityStatus }
      - { name: Customer, kind: manyToOne, to: Customer }
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
| `copy` | yes | A `function: Snapshot` composition child of this entity. A link serves the stored file of the copy that is the record's newest when the link is created - see [The issued copy and its language](/help/intent/printing#the-issued-copy-and-its-language). |
| `roles` | yes | Roles declared under `permissions` that may list, create and revoke links. `roles: []` is legal and admits nobody, the administrator included. |
| `expiresAfterDays` | no | The life of a new link in whole days, `0` to `3650`. `0` (the default) is permanent. |
| `expiry` | no | The life of a new link read from the record: a list of `{ when, days }`, the first entry whose `when` the record meets wins, `expiresAfterDays` otherwise. See [Expiry by record](#expiry-by-record). |

Rejected at Generate, each naming the entity:

- no `when:` - a draft would be as shareable as an issued document;
- a `when:` that guards something that is not a field or to-one relation of the entity;
- no `copy:`, a `copy:` that is not an entity of the model, not a `function: Snapshot` entity, or not a composition child of this entity;
- a `copy:` on an entity that is not a printable document (it has no `function: DocumentItem` child), because such a copy is never minted;
- no `roles:` key, or a role `permissions` does not declare;
- an `expiresAfterDays` that is not a whole number of days from 0 to 3650;
- an empty `expiry:` list, an entry without `when` or `days`, an entry's `days` that is not a whole number from 0 to 3650, or an entry's `when` that names an unknown relation or field, walks more than one hop or compares a value of the wrong type;
- an unknown key under `share:`;
- `share:` on a personal entity (see the warning below).

::: warning Never share personal documents
A link is a bearer credential: whoever holds it reads the document. `share:` on an entity whose records belong to the signed-in person - a `personal: true` relation on it or on a composition ancestor (payslips, leave requests, employment contracts) - is refused at Generate. Those documents stay behind sign-in; a notification about them carries `{recordUrl}`, which needs a sign-in.
:::

A process step must mint the copy before a link can be created: bind the generated snapshot handler (`delegate: gen.events.<Entity>SnapshotGenerator`) at the step that issues the document. Issuing does not create a link - a link exists only because a user created one, or because a declared message carries one ([Mailing a link](#mailing-a-link-shareurl)).

## Expiry by record

One life for every link of an entity is often wrong. An invoice to a business may keep its link; an invoice to a private individual carries a name and a home address, and its link should expire. `expiry:` reads the life from the record the link is created on:

```yaml
    share:
      when: ["status != DRAFT", "status != CANCELLED"]
      copy: SalesInvoiceCopy
      roles: [DocumentShare]
      expiresAfterDays: 0                            # a business's invoice: permanent
      expiry:
        - { when: "Customer.Kind == 2", days: 30 }   # a private individual's invoice: 30 days
```

- Each entry is `{ when, days }`. When a link is created, the **first** entry whose `when` the record meets gives the link its life; when none does, `expiresAfterDays` does. `days: 0` is a permanent link.
- `when` is a condition like a [`forbidWhen`](/help/intent/dsl-reference#checks-declarative-validations)'s: one `<property> ==|!= <literal>` term or a list of them (all must hold), over the record's own field or to-one, or **one hop away** - `Customer.Kind`, the kind of the customer the invoice points at. The hop may cross into another model; a nomenclature seeded there is named by its numeric id (`Customer.Kind == 2`), a status of this model by its name.
- The life is decided when the link is created, from the stored record - never from the request - and the link keeps it. Changing the customer later does not change the links already handed out.
- It is the same for both ways a link is created: **Create link** on the record page and a mailed [`{shareUrl}`](#mailing-a-link-shareurl).
- The tenant's `DIRIGIBLE_DOCUMENTS_SHARE_MAX_EXPIRY_DAYS` still shortens it, as it shortens `expiresAfterDays` (see [Settings](#settings)).

## On the record page

The record page of a `share:` entity gets a **Share links** section, shown to a user who holds one of the declared roles:

- **Create link** is offered while the record satisfies `when:`. It needs the record in that state and a stored copy.
- The new link's URL is shown **once**, with a **Copy** button and the note that anyone who has it can open the document without signing in. It cannot be read again; if it is lost, create another link.
- Every link of the record is listed with its status (**Active**, **Expired** or **Revoked**), the file it serves, its expiry (a date, or "Never expires"), how many times it was opened and when it was last opened.
- **Revoke** on an active link asks for confirmation and stops the link at once. A revoke cannot be undone.

The section is on the back-office record page only. The personal (My) and partner surfaces have no share endpoints.

## What a link serves

`GET /public/share/<token>` streams one stored file, fixed when the link was created: the `copy:` entry that was the record's newest at that moment. Nothing else is served: never the live record, a new render, another file of the record or a listing. The route never looks for a newer copy, so a copy minted later (after an amendment) needs a new link.

A PDF is displayed inline in the browser. A stored file of any other type is sent as a download.

- The token is 256 random bits, unrelated to the record's `uuid` (which is printed on the document and is no secret). Only its SHA-256 is stored.
- The route reads no session and creates none.
- The response carries `Cache-Control: private, no-store`, `X-Robots-Tag: noindex` and `Referrer-Policy: no-referrer`.
- An unknown, expired or revoked token, a token of another tenant, and a link whose file is gone all answer the **same empty 404**. Nothing tells a caller which tokens ever existed.
- A throttled caller is answered **429** (see [Settings](#settings)).
- Nothing is cached: a link's liveness is read from the database on every open, so a revoke is immediate on every node.

**A record that leaves the `when:` state loses its links for good.** The check is made when a link is opened (and when the record's links are listed), so a void by a user, a workflow step, a job or a delete all stop the link the same way. The link is revoked by the system, and moving the record back into the state does not revive it - a new link is somebody's decision.

**Tenant binding.** A token is looked up in the tenant the request's host resolves to, so a token presented on another tenant's host is a 404. Under the `TOKEN_GROUPS` tenant resolution strategy, where one host serves every tenant, the token itself names its tenant (`<tenantId>.<secret>`).

**What is recorded.** A link records who created it and when, who revoked it and when, its open count and when it was last opened. Every open is recorded with its time, the link, the remote address and the user agent.

## Mailing a link: `{shareUrl}`

A `notify` block about a `share:` entity may carry `{shareUrl}` in its `body:` or `html:` - "mail the invoice" with a link instead of, or next to, the attachment:

```yaml
      - { name: mint, kind: serviceTask, args: { delegate: gen.events.SalesInvoiceSnapshotGenerator, next: mail } }
      - name: mail
        kind: serviceTask
        args:
          notify:
            to: Customer.email
            subject: "Invoice {number}"
            body: "Read it online: {shareUrl}"
            outcome: mailOutcome
          next: end
```

- The send creates a **new link** for every message, exactly as **Create link** does: the record must satisfy `when:`, its copy must be stored, sharing must be on for the tenant, and the link gets the declared `expiresAfterDays` (capped by `DIRIGIBLE_DOCUMENTS_SHARE_MAX_EXPIRY_DAYS`). It is created after the recipient is known - a record with nobody to mail gets none.
- The link is listed in the record's **Share links** with the system as its creator and the send named - `system (notify InvoiceMail.mail)` for a process step, `system (notify <name>)` for a transition, a schedule or a `notifications[]` entry - and can be revoked like any other.
- The URL is absolute, built on `DIRIGIBLE_APP_BASE_URL` (else `DIRIGIBLE_HOST`) - the same origin as `{recordUrl}`, never a request header. It is not written to the log.
- **Bind the notify to a step after the snapshot delegate**, or to a transition that follows it. A send that runs before the copy exists - or on a record outside `when:`, or with sharing switched off - is **not sent**: it fails like an unreachable mailbox, so `outcome:` is stamped `failed: <why>`, `onNotifyFailed` fires, and a process step's `retry:` / `onError:` apply. A mail never goes out with a blank where the link should be.
- Rejected at Generate: `{shareUrl}` on an entity without `share:`, in a `subject:` (a link is a bearer credential, and a subject shows in every list and preview), inside a `forEach` fan-out, and on a cross-model schedule source.

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
| `DIRIGIBLE_DOCUMENTS_SHARE_MAX_EXPIRY_DAYS` | `0` | The longest life, in days, a new link may get. A permanent or longer-lived declaration - `expiresAfterDays` or the `expiry:` entry the record meets - is capped to it. `0` leaves the declared life as it is. |

Per instance:

| Variable | Default | Purpose |
|---|---|---|
| `DIRIGIBLE_DOCUMENTS_SHARE_RATE_LIMIT_PER_MINUTE` | `60` | Requests per minute the public route answers per remote address, and per link. The rest get 429 until the minute ends. |
| `DIRIGIBLE_DOCUMENTS_SHARE_MISS_LIMIT` | `10` | How many links that do not answer one remote address may ask for within ten minutes before it is answered 429. |

The throttle counters are kept in memory, per node.

## Not in this version

- Payment or acceptance on the public page.
- A second factor (a PIN or one-time code) on a link.
- Sharing reports or arbitrary files.

Tracked in [eclipse-dirigible/dirigible#8613](https://github.com/eclipse-dirigible/dirigible/issues/8613).

## See also

- [Printing and documents](/help/intent/printing)
- [DSL reference](/help/intent/dsl-reference)
- [Tenant-aware configuration](/help/operate/tenant-configuration)
