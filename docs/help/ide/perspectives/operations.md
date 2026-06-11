---
title: Operations
description: Runtime introspection - registry, repository, problems, logs, extensions.
---

# Operations

`perspective-operations` is the live introspection surface for the running system. Each view inspects one runtime registry; together they answer "what is deployed, what is happening, what is broken".

## Views

| View                                                         | Shows                                                            |
|--------------------------------------------------------------|------------------------------------------------------------------|
| [Registry](/help/ide/views/registry)                         | The published `/registry/public/...` tree (what the synchronizers see). |
| [Repository](/help/ide/views/repository)                     | The full Dirigible repository, including `/users/<user>/workspace/...`. |
| [Problems](/help/ide/views/problems)                         | Compilation and validation errors per artefact.                  |
| [Logs](/help/ide/views/logs)                                 | Tail of the live server log.                                     |
| [Loggers](/help/ide/views/logs)                           | Active log levels; raise or lower at runtime.                    |
| [Extensions](/help/ide/views/extensions)                     | Extension points and bound extensions.                           |
| [Transport](/help/ide/views/transfer)                       | Project import / export.                                         |
| [Websockets](/help/ide/views/websockets)                     | Registered WebSocket endpoints.                                  |
| [Configurations](/help/ide/perspectives/operations)             | Effective `DIRIGIBLE_*` configuration values.                    |
| [Search](/help/ide/views/search)                             | Full-text search across the registry / repository.               |

## Roles

Operations views are restricted to the `DEVELOPER`, `ADMINISTRATOR`, and `OPERATOR` roles. Granting access goes through the [Security perspective](/help/ide/perspectives/security).

## Related

- [Security perspective](/help/ide/perspectives/security)
- [Messaging perspective](/help/ide/perspectives/messaging)
- [Tracing perspective](/help/ide/perspectives/tracing)
