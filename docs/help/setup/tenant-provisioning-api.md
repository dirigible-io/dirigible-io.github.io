---
title: Tenant provisioning API
description: Provision tenants into a running application from an external service.
---

# Tenant provisioning API

Off by default. An opt-in REST API through which an **external** provisioner registers a tenant,
hands the platform a database user and schema it created itself, activates the tenant and polls its
initialization. It also keeps the application's copy of the tenant's users, which the
[Settings -> Users](/help/setup/tenant-users) section shows.

The built-in flow provisions a tenant the other way round: you register it, and the platform creates
its database user and schema for you (see [`/help/operate/tenants`](/help/operate/tenants)). That
suits a deployment that owns its own tenants. It does not suit a landscape where one provisioning
service owns tenants across several applications, decides their ids, and creates their database
objects with its own credentials. This API is for the second case, and the two never touch the same
tenant.

```bash
DIRIGIBLE_TENANT_PROVISIONING_API_ENABLED=true
```

## The state a tenant sits in

`PENDING_ACTIVATION` is the window between a tenant being registered and being activated. The
platform leaves such a tenant alone: it neither provisions it, since it only provisions `INITIAL`
tenants, nor serves it, since synchronizers, jobs and listeners only run for `PROVISIONED` ones.

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

Every endpoint below requires one of the roles `TENANT_PROVISIONER`, `ADMINISTRATOR` or `OPERATOR`.

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

**Credentials only.** The URL, the driver and the connection properties come from the application's
own default data source, so the tenant lives in the same database as the application. Its data source
is registered as `<tenantId>_DefaultDB`.

| Status | Meaning |
| ------ | ------- |
| `201` / `200` | registered / updated |
| `400` | a required field is missing |
| `404` | there is no such tenant |
| `502` | the credentials do not work; the body carries the database's own message, and nothing is stored |

Re-registering replaces the previous registration and rebuilds the tenant's connections, so a
rotated password takes effect at once rather than at the next restart. The credentials are tried
before they are stored, so a wrong password is refused and nothing is registered.

### Activate and poll

```
POST /services/tenant-provisioning/tenants/{tenantId}/activation
GET  /services/tenant-provisioning/tenants/{tenantId}/activation
```

`POST` activates the tenant and answers **`202`** with a `Location` header pointing at the `GET`.
It answers before the work is done, because creating a tenant's tables, jobs and listeners takes tens
of seconds to minutes - too long for one request. Poll the `GET` until it settles.

| Status | Meaning |
| ------ | ------- |
| `202` | accepted; the tenant is active and its initialization has started |
| `400` | the tenant's data source is not registered yet |
| `404` | there is no such tenant |

Re-posting is safe: on an already-active tenant it re-runs that tenant's initialization, which is how
a failed one is retried.

`GET` answers `{ "status": ..., "error": ... }`:

| Status | Returned when |
| ------ | ------------- |
| `NOT_STARTED` | the tenant was registered, perhaps with a data source, but never activated |
| `IN_PROGRESS` | the tenant is active and its artefacts are still being created |
| `COMPLETED` | everything was created |
| `FAILED` | something could not be created; `error` says what |

The status is worked out from what the platform has actually recorded, so every instance of a
cluster gives the same answer and a restart does not lose it. An initialization that a restart
interrupted is resumed once the application is up again.

Each tenant is initialized on its own. Activating a tenant creates that tenant's artefacts and imports
its seed data, and leaves every other tenant as it is: their tables, their data and their status.
Tenants activated at about the same time are initialized one after the other, each reads
`IN_PROGRESS` until its own initialization ends, and a failure is reported only for the tenant it
happened in. The exception is a tenant-specific artefact file the platform cannot parse at all: it
belongs to no single tenant, so every active tenant reads `FAILED`, naming the file, until it is
fixed. A deployment with no tenant-specific artefacts has nothing to create, so its tenants read
`COMPLETED` almost at once.

### Push the users

```
PUT /services/tenant-provisioning/tenants/{tenantId}/users
{ "complete": false, "revision": 1042, "users": [ ... ] }
```

The provisioner owns the tenant's membership, and this is how it hands the application the current
state of some users or all of them: a **full snapshot** of each one, which the
[Settings -> Users](/help/setup/tenant-users) section shows. Nothing else writes these users; the
application only records each person's last sign-in.

```json
{
  "email": "ann@example.com",
  "revision": 1042,
  "status": "ASSIGNED",
  "roles": [
    { "role": "Owner", "state": "ADDING" },
    { "role": "User",  "state": "GRANTED", "grantedBy": "bob@example.com", "grantedAt": "2026-09-20T08:00:31Z" }
  ],
  "invitedBy": "bob@example.com", "invitedAt": "2026-09-20T08:00:00Z",
  "lastChangedBy": "bob@example.com", "lastChangedAt": "2026-09-30T10:15:03Z",
  "lastError": null
}
```

| Field | Means |
| ----- | ----- |
| `complete` | `true` when `users` is the tenant's whole list - a resync |
| `revision` | the provisioner's revision counter for the tenant, as it read it |
| `users[].revision` | the counter's value at the person's last change, at least `1` |
| `users[].status` | `PENDING`, `INVITED`, `ASSIGNED`, `FAILED` or `REMOVED` |
| `users[].roles` | the roles held or being added; a role absent here is not held. `state` is `GRANTED`, `ADDING` (requested, not applied yet; no `grantedBy` / `grantedAt`) or `REMOVING` (held, removal requested) |
| `users[].lastError` | `{ "code", "message" }` when the person's latest change was not applied, or `null` |

An absent field means `null`. Emails are lower-cased.

| Status | Meaning |
| ------ | ------- |
| `200` | `{ "applied": n, "ignored": n, "removed": n, "storedRevision": 1042 }` |
| `400` | the body is not valid; one message names every offending field |
| `404` | there is no such tenant |

How a snapshot is applied:

- **Only a higher revision wins.** A user whose `revision` is not higher than the stored one is counted
  as `ignored`, and the call still answers `200`. A late or repeated push therefore never undoes a
  newer one, and the provisioner never has to retry it.
- **An applied user is replaced completely**: status, roles and their states, who and when, and
  `lastError`. Only the last sign-in is kept.
- **`REMOVED` leaves a hidden tombstone.** The roles go and the row stays with its revision, so an
  older snapshot arriving late cannot bring the person back. A newer live snapshot does, and clears the
  last sign-in, so a sign-in from the old membership does not make the new one look active.
- **`complete: true` is a resync.** Every live user it does not name, whose revision is at or below the
  body's `revision`, becomes a tombstone stamped with that revision. A user with a higher revision was
  written after the provisioner read its list, and is kept. A resync that changes nothing writes
  nothing.
- **Each user is applied on its own**, so one that fails leaves the others applied.

`storedRevision` is the highest revision the application now holds for the tenant, and is left out
when it holds no user of the tenant at all. A provisioner can compare it with its own counter, for
example after restoring its database.

The `400` names every problem at once, joined with `; `:

```json
{ "status": 400, "error": "Bad Request",
  "message": "users[0].status: must be one of PENDING, INVITED, ASSIGNED, FAILED, REMOVED; users[1].roles[0]: a role being added has no grantedBy or grantedAt yet" }
```

The same path answers `GET`, with the users as stored and their last sign-in, for diagnostics. Add
`?includeRemoved=true` to see the tombstones.

```
GET /services/tenant-provisioning/tenants/{tenantId}/users[?includeRemoved=true]
```

The endpoint is there whenever the API is enabled, whether or not the
[Settings -> Users](/help/setup/tenant-users) section is.

## Errors

A refusal answers with the reason in the body, which is what a calling process branches on:

```json
{ "status": 502, "error": "Bad Gateway",
  "message": "Could not connect to the database of data source [acme_DefaultDB] with the supplied credentials: FATAL: password authentication failed for user \"u_acme\"" }
```

## Authorizing the caller

The caller is a machine, so it presents an OAuth client-credentials token. The token's scope becomes
the role that opens this API.

A scope value has to be qualified with a `/`, and the part after the last one is the name that
counts. A resource server `codbex-apps` with a scope `TENANT_PROVISIONER` gives the token value
`codbex-apps/TENANT_PROVISIONER`, which grants the role `TENANT_PROVISIONER`:

```
scope codbex-apps/TENANT_PROVISIONER  ->  role TENANT_PROVISIONER
```

A scope value with no `/` grants nothing, so a bare `TENANT_PROVISIONER` will not work.

## See also

- [Tenant management](/help/operate/tenants)
- [Tenant users](/help/setup/tenant-users)
- [Multi-tenancy (setup)](/help/setup/multi-tenancy)
- [Multi-tenancy (concepts)](/help/concepts/multi-tenancy)
- [Environment variables](/help/setup/environment-variables#multi-tenancy)
