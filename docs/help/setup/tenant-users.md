---
title: Tenant users
description: Let a tenant's owners manage its users, while an external provisioning system decides.
---

# Tenant users

Off by default. The **Settings -> Users** section of the application shell lets a tenant's owners
manage who may use the tenant: invite a person with one or more roles, change a member's roles, or
remove a member. Generated application shells mount the same section.

```bash
DIRIGIBLE_TENANT_USERS_ENABLED=true
DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE=global:acme.user-changes
```

## How it works

The application does not decide membership. Under `TOKEN_GROUPS` a person's roles in a tenant are their
identity provider groups (see
[Multi-tenancy](/help/setup/multi-tenancy#one-host-for-all-tenants-token-groups)), and an **external
provisioning system** owns those groups.

The section publishes each owner action as a change request on a message queue, for the external
system to carry out or refuse. It shows the tenant's users as the external system reports them back
through the [tenant provisioning API](/help/setup/tenant-provisioning-api#push-the-users).

## Seats

The external provisioning system may give a tenant a **seat limit**: the most people it may hold at once.
A person who is invited, being invited, or a member takes a seat; a removed person or a failed invitation
does not.

- The section shows the seats taken out of the limit, for example **Seats: 7 of 10**.
- An invitation while every seat is taken is refused before it is sent: *Every seat of this tenant is
  taken. Remove someone to free a seat, or ask your administrator for more seats.* Changing a member's
  roles and removing a member are never refused for seats.
- A limit lowered below the people the tenant holds removes nobody. Invitations are refused until
  enough people are removed.

Without a limit, the section shows no seats and refuses no invitation for seats.

## Who may use it

- A holder of the tenant's `Owner` role, a `DEVELOPER` or an `ADMINISTRATOR` may manage the users. An
  `OPERATOR` may only see them.
- It works on the selected tenant. The default tenant has no users to manage.

## Roles on offer

The section offers `Owner`, `User`, and every role the application marks as one a person may be
given. A `.roles` entry does that with `"assignable": true`, and may say how the role reads with a
`label` and a `description`:

```json
[
  { "name": "Accountant", "label": "Accountant", "description": "Enters and issues invoices.", "assignable": true },
  { "name": "Warehouse", "label": "Warehouse clerk", "description": "Reads the stock.", "assignable": true }
]
```

- An intent application marks every role it authors - see
  [Roles a tenant's Owner can give](/help/intent/dsl-reference#roles-a-tenant-s-owner-can-give).
- A person may hold such a role alone, without `User`, and is a member like any other: counted for
  seats, listed and removable. They reach what the role's gates admit and are refused the rest.
- A role the application does not mark is refused (`INVALID_ROLE`), and so is a role of the instance
  (`ADMINISTRATOR`, `DEVELOPER`, `OPERATOR`, ...) even when a `.roles` file marks it. A role name longer
  than 100 characters is never offered.
- An application that marks nothing offers `Owner` and `User`, as before.
- The provisioning system reads the same list from
  [`GET /services/tenant-provisioning/user-roles`](/help/setup/tenant-provisioning-api#list-the-roles-a-person-may-be-given).

A group made by hand at the identity provider for a role outside this list still grants that role in
the tenant: the identity provider stays authoritative over its groups.

## Configuration

| Variable | Default | Purpose |
| -------- | ------- | ------- |
| `DIRIGIBLE_TENANT_USERS_ENABLED` | `false` | Shows the section. |
| `DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE` | | The queue the change requests are published to. It replaced `DIRIGIBLE_TENANT_USERS_REQUEST_QUEUE`. |

With the section on, the application refuses to start unless:

- the tenant resolution strategy is `TOKEN_GROUPS`;
- `DIRIGIBLE_TENANT_USERS_CHANGE_QUEUE` is set, to a `global:` destination;
- `DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED=true`.

## See also

- [Multi-tenancy](/help/setup/multi-tenancy#users)
- [Tenant provisioning API](/help/setup/tenant-provisioning-api#push-the-users)
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
- [Tenant management](/help/operate/tenants)
