---
title: Tenant users
description: Let a tenant's owners invite people, change their roles and remove them, while an external provisioning system decides.
---

# Tenant users

Off by default. The **Settings -> Users** section of the application shell lets a tenant's owners
manage who may use the tenant: invite a person with one or more roles, change a member's roles, or
remove a member. Generated application shells mount the same section.

```bash
DIRIGIBLE_TENANT_USERS_ENABLED=true
DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE=global:acme.user-changes
```

## Who decides

The application does not decide membership. Under `TOKEN_GROUPS` a person's roles in a tenant are their
identity provider groups (`<tenantId>.<appId>.<role>`, see
[Multi-tenancy](/help/setup/multi-tenancy#one-host-for-all-tenants-token-groups)), and an **external
provisioning system** owns those groups. The section does two things:

- **It publishes** each owner action as one change request on a message queue, for the external system
  to carry out or refuse.
- **It shows** the tenant's users as the external system last reported them. That list is a copy, and
  only the external system writes it, through the
  [tenant provisioning API](/help/setup/tenant-provisioning-api#push-the-users). The one thing the
  application records itself is each person's last sign-in.

So the screen never applies a change. A change is applied when the external system has changed the
groups and pushed the person's new state back.

## Who may use it

- In a tenant, a holder of the tenant's `Owner` role, a `DEVELOPER` or an `ADMINISTRATOR` may invite,
  change roles and remove. An `OPERATOR` sees the list only.
- It always works on the **selected** tenant. The default tenant has no users to manage, so staff who
  hold only platform-wide roles have to enter a tenant, through a group of it, first.
- The roles on offer are fixed: `Owner` and `User`.

## The actions

| Action | What is sent |
| ------ | ------------ |
| **Invite** | an email address and one or more roles |
| **Edit roles** | the member's new set of roles, adding and removing in one save |
| **Remove** | the removal of every role; the person leaves the tenant, and their account stays |

A failed invitation offers **Invite again** and **Dismiss**, which removes the failed entry.

Each action is **one** change request, answered at once. The screen confirms the send and shows the
change as in progress until the external system reports back. It refuses up front what it can already
see is wrong:

- inviting someone who is already a member;
- changing a person whose previous change is still in progress;
- changing the roles of someone who is not a member;
- changing a person who changed since the list was loaded;
- a set of roles the member already holds;
- removing the tenant's only owner, or taking the `Owner` role away from them.

These checks only save a round trip. The external system decides again, and can still refuse.

## What the screen shows

| Status | Means |
| ------ | ----- |
| `Pending` | an invitation accepted and not carried out yet |
| `Invited` | the person had no account; one was created and an invitation sent |
| `Assigned` | the person already had an account, and the roles were granted |
| `Active` | an invited or assigned person who has signed in to the tenant |
| `Failed` | the invitation could not be carried out; the reason is shown |

While a change is in progress, its roles show as `+ Role` (being added) and `- Role` (being removed),
and the row reads **Change in progress**. Between the send and the list reflecting it, the row reads
**Sending...**. A change the external system refused shows **Not applied:** and its reason; one that
failed shows **Failed:** and the message. The screen refreshes itself only while a change is in
flight and the section is visible.

## A removal takes effect at the next token refresh

The external system takes the group away at the identity provider, but a session that is already
open keeps its tenant until its access token is refreshed. The window is the token lifespan
configured at the identity provider; nothing forces an earlier refresh.

## The change request

Each action is published as a persistent JMS text message to the queue
`DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE` names. The queue must be a `global:` destination, so its
physical name carries no tenant prefix and a consumer outside this deployment can bind to it. The
business tenant travels in the payload, and the message's `tenant_id` property is the default tenant.

```json
{ "requestId": "5b0b3f0e-...", "type": "tenant.user.change.requested", "version": 1,
  "action": "UPDATE_ROLES", "tenantId": "acme", "appId": "library",
  "email": "ann@example.com", "roles": ["Owner", "User"], "expectedRevision": 7,
  "requestedBy": "bob@example.com", "requestedAt": "2026-10-01T10:15:03Z" }
```

| Field | Means |
| ----- | ----- |
| `requestId` | minted once per action; the consumer's idempotency key |
| `type`, `version` | `tenant.user.change.requested`, `1` |
| `action` | `INVITE`, `UPDATE_ROLES` or `REMOVE` |
| `tenantId` | the tenant the owner is in, never a field of the owner's request |
| `appId` | this application, `DIRIGIBLE_APP_ID` |
| `email` | the person, lower-cased |
| `roles` | the desired set of roles, sorted; absent for `REMOVE` |
| `expectedRevision` | the person's revision as the screen showed it, so that a stale edit can be refused; absent for `INVITE` |
| `requestedBy` | who asked: the signed-in person's email. Audit data, never an authorization input |
| `requestedAt` | when, ISO-8601 UTC |

Sending writes nothing in the application. If the broker refuses the message, the owner is told the
change could not be sent and tries again.

## What the external system sends back

It pushes the person's new state with
[`PUT .../tenants/{tenantId}/users`](/help/setup/tenant-provisioning-api#push-the-users). The screen
shows a change as in progress for as long as that state says so: a `Pending` person, or a role in
state `ADDING` or `REMOVING`. When the external system refuses or fails a change, it sets the
person's `lastError`, whose `code` the screen translates:

| `code` | Shown as |
| ------ | -------- |
| `REVISION_CONFLICT` | The user changed in the meantime. Reload and try again. |
| `ALREADY_MEMBER` | The person is already a member of this tenant. |
| `NOT_A_MEMBER` | The person is not a member of this tenant. |
| `LAST_OWNER` | The tenant would be left without an owner. |
| `INVALID_ROLE` | One of the roles is not a role of this application. |
| `NO_ROLES` | No role was chosen. |
| `TENANT_NOT_ACTIVE` | The tenant is not active. |
| `WORKSPACE_NOT_PROVISIONED` | The application is not provisioned for this tenant yet. |
| `ACCOUNT_MISSING` | The person has no account. |
| `FAILED` | the `message`, after **Failed:** |

Any other code is shown with its `message` as sent.

## Configuration

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_TENANT_USERS_ENABLED` | `false` | Shows the section and opens its endpoints. |
| `DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE` | | The `global:` queue the change requests are published to. It replaced `DIRIGIBLE_TENANT_USERS_REQUEST_QUEUE`. |

With the section on, the application **refuses to start** unless:

- the tenant resolution strategy is `TOKEN_GROUPS`, the only one with tenant roles such as `Owner`;
- `DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE` is set. A configuration that sets only the key it replaced,
  the old `DIRIGIBLE_TENANT_USERS_REQUEST_QUEUE` (replaced because the requests changed shape), is
  refused with a pointer to the new key;
- the queue is a `global:` destination;
- `DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED=true`, since the list is written through that API.

It starts with a warning when no external broker is configured (`DIRIGIBLE_MESSAGING_BROKER_URL`): the
requests then go to the embedded broker, where no external system can receive them. Trial mode
(`DIRIGIBLE_TRIAL_ENABLED`) grants no tenant role, so nobody can manage users while it is on.

## See also

- [Multi-tenancy](/help/setup/multi-tenancy#users)
- [Tenant provisioning API](/help/setup/tenant-provisioning-api#push-the-users)
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
- [Tenant management](/help/operate/tenants)
