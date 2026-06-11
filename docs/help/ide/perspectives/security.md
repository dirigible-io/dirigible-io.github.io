---
title: Security
description: Roles, access rules, and OAuth client registrations.
---

# Security

`perspective-security` is where role-based access control and identity-provider integration are managed. Backed by the `engine-security` synchronizers.

## Roles

Declarative roles are defined in `.roles` artefacts and reconciled into the security store. The Roles view lists every active role; new roles are added by editing or creating a `.roles` artefact.

```json
[
  { "name": "Trainer", "description": "Can manage courses" },
  { "name": "Trainee", "description": "Can enrol in courses" }
]
```

Assign roles to users either through the upstream identity provider (recommended for production) or, in development, via the built-in user-role assignments.

## Access rules

`.access` artefacts secure URL patterns. Each rule binds a path / HTTP-method pair to one or more roles; requests that do not satisfy any matching rule are rejected with `401` or `403`.

```json
[
  { "path": "/services/ts/myapp/.*",
    "method": "GET",
    "roles": ["Trainer", "Trainee"] }
]
```

## Client registrations

OAuth2 / OIDC client registrations are listed and edited from this perspective. They configure the upstream identity provider used by the IDE and by user-facing applications. The in-repo GitHub flow uses the Spring `github` profile and `DIRIGIBLE_GITHUB_CLIENT_ID` / `_CLIENT_SECRET` / `_SCOPE`.

## Related

- [`.roles` artefact](/help/artefacts/security/roles)
- [`.access` artefact](/help/artefacts/security/access)
- [Security editor](/help/ide/editors/access-and-roles)
- [Operate: security](/help/concepts/security-model)
