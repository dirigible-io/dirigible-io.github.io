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

## Who may use it

- A holder of the tenant's `Owner` role, a `DEVELOPER` or an `ADMINISTRATOR` may manage the users. An
  `OPERATOR` may only see them.
- It works on the selected tenant. The default tenant has no users to manage.
- The roles on offer are `Owner` and `User`.

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
