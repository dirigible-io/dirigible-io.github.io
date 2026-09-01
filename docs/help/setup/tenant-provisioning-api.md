---
title: Tenant provisioning API
description: Provision tenants into a running application from an external service.
---

# Tenant provisioning API

Off by default. An opt-in REST API through which an **external** provisioner registers a tenant,
hands the platform a database user and schema it created itself, activates the tenant and polls its
initialization.

The built-in flow provisions a tenant the other way round: you register it, and the platform creates
its database user and schema for you (see [`/help/operate/tenants`](/help/operate/tenants)). That
suits a deployment that owns its own tenants. It does not suit a landscape where one provisioning
service owns tenants across several applications, decides their ids, and creates their database
objects with its own credentials. This API is for the second case, and the two never touch the same
tenant.

```bash
DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED=true
```

Without it the API is **absent**, not merely closed: no endpoint answers under
`/services/tenant-provisioning/` and none of its beans exist. It accepts database credentials over
HTTP, so a deployment has to ask for it.

::: warning
Require TLS end to end. Real database credentials transit this API.
:::

## The state a tenant sits in

`PENDING_ACTIVATION` is the window between a tenant being registered and being activated. It is
invisible to both halves of the built-in flow:

| Mechanism | Acts on | So a `PENDING_ACTIVATION` tenant |
| --------- | ------- | -------------------------------- |
| The tenant provisioner | `INITIAL` | never gets a second database user and schema created for it |
| `executeForEachTenant` | `PROVISIONED` | is never reached by a synchronizer, job or listener before its data source exists |

That is what lets an external provisioner own a tenant end to end without racing the platform.
`DELETE /services/security/tenants/{id}` accepts the state too, which is the rollback path when
provisioning is abandoned before activation. Deleting a `PROVISIONED` tenant is still refused.

## The sequence

Register the tenant, register its data source, activate, poll.

```bash
BASE=https://app.example.com/services/tenant-provisioning/tenants

# 1. register - the id is yours to choose
curl -X PUT "$BASE/acme" -H 'Content-Type: application/json' \
     -d '{"name":"Acme Ltd"}'

# 2. register the data source, from credentials you created
curl -X PUT "$BASE/acme/datasources/default" -H 'Content-Type: application/json' \
     -d '{"username":"u_acme","password":"<secret>","schema":"ACME"}'

# 3. activate, then poll
curl -X POST "$BASE/acme/activation"
curl "$BASE/acme/activation"
```

**Every call is idempotent**, because the caller is a retrying process: a step that timed out may
have completed, and re-running the whole sequence has to converge rather than collide.

## Endpoints

All of them are `@RolesAllowed({TENANT_PROVISIONER, ADMINISTRATOR, OPERATOR})`, and the prefix
`/services/tenant-provisioning/**` is gated on the same three roles.

### Register a tenant

```
PUT /services/tenant-provisioning/tenants/{tenantId}
{ "name": "Acme Ltd", "subdomain": "acme" }
```

`subdomain` is optional and defaults to the tenant id.

| Status | Meaning |
| ------ | ------- |
| `201` | created, in `PENDING_ACTIVATION` |
| `200` | already registered; the call updated `name` (and `subdomain`, when supplied) and left the status alone |
| `400` | the id or the subdomain is not a DNS label, or the body has no name |
| `409` | the subdomain belongs to a different tenant |

Both the id and the subdomain must be **DNS labels**: letters, digits and inner hyphens, at most 63
characters, **no dots**. The id is also the prefix of the tenant's data source name and, under the
`TOKEN_GROUPS` strategy, the first segment of the identity provider group
`<tenantId>.<appId>.<role>`, which a dot would make unparseable. The subdomain is matched out of a
request's host name, so anything else could never resolve.

Display names need not be unique. Two customers may both be called `Acme Ltd`.

### Read a tenant

```
GET /services/tenant-provisioning/tenants/{tenantId}
```

```json
{
  "id": "acme",
  "name": "Acme Ltd",
  "subdomain": "acme",
  "status": "PENDING_ACTIVATION",
  "initialization": { "status": "NOT_STARTED", "error": null }
}
```

`404` if there is no such tenant.

### Register the tenant's data source

```
PUT /services/tenant-provisioning/tenants/{tenantId}/datasources/default
{ "username": "u_acme", "password": "<secret>", "schema": "ACME" }
```

**Credentials only.** The URL, the driver and the connection properties always come from the
application's own default data source, so the tenant lives in the same database as the application,
exactly as it does under the built-in flow. The definition is registered as `<tenantId>_DefaultDB`
with location `TENANT_DEFAULT`.

::: warning Why there is no `url` field
A JDBC URL and driver properties are executable surface: an H2 URL carries
`INIT=RUNSCRIPT FROM '<url>'` and a PostgreSQL connection property can name a `socketFactory` class.
Accepting either from a caller would turn "may register a tenant's credentials" into "may run code on
the application server", so they are not part of the API. A caller that sends them is ignored.
:::

| Status | Meaning |
| ------ | ------- |
| `201` / `200` | registered / updated |
| `400` | a required field is missing |
| `404` | there is no such tenant |
| `502` | the credentials do not work; the body carries the database's own message, and nothing is stored |

Re-registering **replaces the definition and evicts the live connection pool**. That matters: an
initialized pool keeps the credentials it was built with whatever its definition later says, so a
rotated password would otherwise take effect only at the next restart.

The credentials are tried before they are stored, by building the pool the application will use and
asking the driver whether the connection is usable. No SQL of the platform's own is issued, so the
per-database validation query applies and a database whose dialect rejects a bare `SELECT 1` is not
refused for it.

### Activate and poll

```
POST /services/tenant-provisioning/tenants/{tenantId}/activation
GET  /services/tenant-provisioning/tenants/{tenantId}/activation
```

`POST` answers **`202`** with a `Location` header pointing at the `GET`. It is asynchronous because
initialization is a full multitenant synchronization pass, which takes tens of seconds to minutes -
beyond a sane HTTP timeout.

Synchronously, before answering, it validates the preconditions (`404` for an unknown tenant, `400`
when the data source is not registered yet), moves the tenant to `PROVISIONED` and marks the
per-tenant definitions for reprocessing. Then it hands the pass to a background executor.

Re-posting is safe. On an already-active tenant it is a deliberate re-initialization, which is how a
failed one is retried.

`GET` answers `{ "status": ..., "error": ... }`:

| Status | Returned when |
| ------ | ------------- |
| `NOT_STARTED` | the tenant is not `PROVISIONED`: registered, perhaps with a data source, but never activated |
| `IN_PROGRESS` | the tenant is active and some per-tenant definitions are still awaiting the pass |
| `COMPLETED` | the tenant is active and everything reprocessed cleanly |
| `FAILED` | something is in a persisted error state; the failures are aggregated into `error` |

The status is **derived, not tracked**. It is computed from durable rows every node of a cluster
shares - the tenant's status, the synchronizer bookkeeping in `DIRIGIBLE_DEFINITIONS`, and the
lifecycle of the artefacts themselves - so the answer is the same from any instance and survives a
restart. There is no run registry that could disagree with reality.

Two consequences are worth knowing:

- The signal is **batch-wide**. Tenants activated inside one synchronization window share it, so each
  reads `IN_PROGRESS` until the window closes, and a definition error is reported to all of them
  because definition errors are global.
- An instance with **no per-tenant artefacts** answers `COMPLETED` at once. It has nothing to
  materialize, which is the truth for such a deployment.

## Errors

A refusal answers with the reason in the body, which is what a calling process branches on:

```json
{ "status": 502, "error": "Bad Gateway",
  "message": "Could not connect to the database of data source [acme_DefaultDB] with the supplied credentials: FATAL: password authentication failed for user \"u_acme\"" }
```

## Authorizing the caller

The caller is a machine. It presents an OAuth **client-credentials** token, and its scope becomes a
Dirigible role through `ScopeRoleJwtAuthoritiesConverter`, which every resource-server configuration
shares.

The rule has one trap: **a scope value must contain a `/`**. Everything after the last `/` is taken
as the scope name; a value with no separator is ignored and grants nothing. So a resource server
named `codbex-apps` with a scope `TENANT_PROVISIONER` yields the token value
`codbex-apps/TENANT_PROVISIONER`, whose scope name is `TENANT_PROVISIONER`.

A scope name with no `.scopes` mapping becomes a role of the same name, so that alone is enough:

```
scope codbex-apps/TENANT_PROVISIONER  ->  role TENANT_PROVISIONER
```

To have one scope grant several roles, declare a `.scopes` artefact:

```json
[
  {
    "scope": "provisioning",
    "roles": ["TENANT_PROVISIONER", "OPERATOR"],
    "description": "The provisioning service"
  }
]
```

::: tip
`TENANT_PROVISIONER` is deliberately **not** one of the platform's built-in roles. Trial mode
(`DIRIGIBLE_TRIAL_ENABLED`) grants every built-in role to everyone, and a role that provisions
tenants and accepts database credentials must never be handed out that way. Under basic
authentication it therefore has to be created as a role explicitly.
:::

## See also

- [Tenant management](/help/operate/tenants)
- [Multi-tenancy (setup)](/help/setup/multi-tenancy)
- [Multi-tenancy (concepts)](/help/concepts/multi-tenancy)
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
