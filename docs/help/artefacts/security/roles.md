---
title: Roles artefact
description: Declare named roles enforceable by @Roles and .access rules. Synchronizer RolesSynchronizer.
---

# Roles - `*.roles`

Declares one or more roles known to the platform. Synchronizer: `RolesSynchronizer`. Once declared, a role can be:

- Referenced by `*.access` rules.
- Used in `@Roles({ "..." })` on controllers (TS) or `@Roles({ "..." })` on Java classes / methods.
- Assigned to users by the platform's user-management surface.

## File format

```json
{
    "roles": [
        { "name": "admin",    "description": "Full administrative access" },
        { "name": "ops",      "description": "Operations and observability" },
        { "name": "viewer",   "description": "Read-only access" }
    ]
}
```

## Built-in super-roles

`DEVELOPER` and `ADMINISTRATOR` always exist and bypass `@Roles` checks. Do not redeclare them.

## Cascade behaviour

When a `*.roles` artefact is deleted, the underlying role row is removed from the platform tables. The FK from `UserRoleAssignment.role` to the role row carries `@OnDelete(CASCADE)` at the schema level - assignments are cleaned up automatically. The cascade is emitted **at table-creation time**; pre-existing deployments may need a schema migration.

## Editor

The [Access editor](/help/ide/editors/access-and-roles) handles both `*.access` and `*.roles`.

## See also

- [Access artefact](/help/artefacts/security/access)
- [Security and roles (develop)](/help/develop/security-and-roles)
- [Security model](/help/concepts/security-model)
