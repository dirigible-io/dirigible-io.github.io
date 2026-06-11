---
title: Access and Roles Editors
description: Declarative URL access rules and role declarations.
---

# Access and Roles Editors

Two editors that together drive declarative authorization. `*.access` files map URL patterns and HTTP methods to roles; `*.roles` files declare the roles themselves. Both are enforced by `engine-security` at request time.

Components: `editor-security` (covers both editors).

## Access editor (`*.access`)

A `*.access` file is a JSON document with a `constraints` array. Each constraint binds a URL pattern under a scope to one or more roles.

```json
{
    "constraints": [
        {
            "scope": "HTTP",
            "path": "/services/js/sales/**",
            "method": "GET",
            "roles": ["sales-reader", "sales-admin"]
        }
    ]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `scope` | yes | `HTTP` or `CMIS`. Determines which dispatcher applies the rule. |
| `path` | yes | Ant-style URL pattern. `**` matches any depth. |
| `method` | yes | HTTP method (`GET`, `POST`, ...) or CMIS method. |
| `roles` | yes | Array of role names. Special role `public` exposes the resource on the `/public/...` URL prefix without authentication. |

The editor renders the constraints as a table; **Add** / **Edit** / **Delete** maintain rows.

### Public endpoints

A constraint whose `roles` contains `public` makes the resource reachable under `/public/...` instead of `/services/...`. Use this for resources that must be available without authentication.

## Roles editor (`*.roles`)

A `*.roles` file declares one or more roles.

```json
[
    {
        "name": "sales-reader",
        "description": "Read-only access to sales endpoints."
    },
    {
        "name": "sales-admin",
        "description": "Full access to sales endpoints."
    }
]
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Role identifier. Referenced by `*.access` constraints and by the runtime when checking authority. |
| `description` | no | Human-readable description. |

## Enforcement

`engine-security` registers the role declarations and constraint rules at synchronization time. On each request, the configured Spring Security chain matches the URL plus method against the constraint table and checks that the authenticated principal carries every required role.

Synchronizers: `AccessSynchronizer`, `RolesSynchronizer`.

## See also

- [Access artefact](/help/artefacts/security/access)
- [Roles artefact](/help/artefacts/security/roles)
- [Security model](/help/concepts/security-model)
