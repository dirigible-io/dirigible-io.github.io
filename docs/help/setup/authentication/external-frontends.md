---
title: External Frontends
description: Calling the platform from a frontend hosted elsewhere - a single-page application, a mobile application or a desktop shell - with identity provider tokens, over CORS and the STOMP broker.
---

# External Frontends

Since 15.0, a frontend that is not served by the platform can call it as a first-class client on the `cognito` and `keycloak` profiles: a single-page application on static hosting, a mobile application, a webview shell such as Tauri (`tauri://localhost`) or Capacitor (`capacitor://localhost`). Such a client authenticates with the tokens the identity provider issued to it and talks to `/services/java/**`, `/public/java/**`, the generated controllers, the scripting endpoints and the STOMP broker from its own origin.

Everything below is opt-in. A deployment that sets none of the variables behaves as before, with the exceptions listed under [What changes for existing deployments](#what-changes-for-existing-deployments).

## Allow the origin

```bash
DIRIGIBLE_CORS_ALLOWED_ORIGINS=https://app.example.com,capacitor://localhost,tauri://localhost
```

Origin patterns are accepted (`https://*.example.com`). The other `DIRIGIBLE_CORS_*` variables carry sensible defaults - the `Authorization` header is granted, credentials are not. See [Environment variables](/help/reference/environment-variables#cors).

::: warning Credentials are not for token clients
`DIRIGIBLE_CORS_ALLOW_CREDENTIALS=true` lets the listed origins send the session cookie. The platform runs without CSRF tokens, so such an origin is fully trusted with the sessions of signed-in users. A client that sends bearer tokens never needs it, and it is refused together with a wildcard origin.
:::

## Send the right token

Send the token in the `Authorization: Bearer` header - never as a query parameter or cookie.

- **A user acts through an ID token.** It is verified like a login: it must be issued for the platform's client (`aud`), name the user in the principal claim (`email` on Cognito, `preferred_username` on Keycloak) and, when identified by an e-mail address, carry a verified one. The user gets the roles of their groups (`cognito:groups` / `groups`) plus whatever the token's scopes map to - the same roles the hosted login grants, so `user.getName()` and `user.isInRole()` in scripts and `@Roles` on controllers behave identically for both.
- **A machine client acts through an access token.** It is identified by `sub` and gets the roles its scopes map to, exactly as before. Access tokens are not held to an audience unless `DIRIGIBLE_OAUTH2_JWT_AUDIENCES` is set. When you set it, list every client whose access tokens must keep working (Cognito access tokens present `client_id`, Keycloak ones need an audience mapper on the realm). Until it is set, every access token the issuer signs is a credential here, whichever client it was issued to, and the platform logs a warning at start - a deployment that accepts access tokens should set it.

A refresh token or any other kind of token is never accepted, and `DIRIGIBLE_OAUTH2_JWT_TOKEN_KINDS` can narrow what is accepted at all. The full rule set and the variables are in [Environment variables](/help/reference/environment-variables#bearer-tokens-cognito-keycloak).

::: tip Keycloak single-page applications
A Keycloak client library hands you both tokens. Send the ID token to act as the user. Sending the access token yields the technical `sub` and no group roles, because an access token is the grant of a client, not the identity of a user.
:::

Under the `TOKEN_GROUPS` tenant resolution strategy a bearer request runs in the default tenant with the user's global roles only.
A user with no global role is refused. Selecting a tenant on a bearer request is not supported yet.

## What an unauthenticated call gets back

A programmatic request - anything a browser marks with `Sec-Fetch-Mode` other than `navigate`, an `X-Requested-With: XMLHttpRequest` header, a bearer token, or an `Accept` header that prefers JSON - is answered with `401 Unauthorized`, a `WWW-Authenticate: Bearer` challenge and a JSON body:

```json
{
  "timestamp": "2026-09-17T10:15:30Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Authentication required",
  "path": "/services/js/my-app/api.mjs"
}
```

A refused token carries the reason in both the challenge (`error="invalid_token", error_description="..."`) and the message. A browser navigation keeps being redirected to the identity provider or to `DIRIGIBLE_SECURITY_LOGIN_PAGE`.

Bearer requests create no session and set no cookie.

## Connect to the STOMP broker

The handshake at `/stomp` accepts the configured origins. Authenticate the session in the CONNECT frame:

```js
const client = new StompJs.Client({
  brokerURL: "wss://dirigible.example.com/stomp",
  connectHeaders: { Authorization: "Bearer " + idToken },
});
client.onConnect = () => {
  client.subscribe("/user/queue/reply/my-endpoint", (frame) => console.log(frame.body));
  client.publish({ destination: "/ws/stomp/my-endpoint", body: JSON.stringify({ text: "hello" }) });
};
client.activate();
```

Every frame is authorized: a CONNECT needs a principal (the bearer token, or the cookie session of a page served by the platform), a client may subscribe to its own `/user/queue/**` destinations only and send to the application destinations under `/ws/**` only. Anything else - an anonymous CONNECT, a subscription to `/topic/**` or to another user's queue, a direct publish to a broker destination - is answered with an ERROR frame reading `Unauthorized` and the connection is closed. A session opened with a token ends when the token expires.

Connect over the WebSocket transport, as the example does, or over SockJS: the endpoint at `/stomp` checks origins itself, against the same list, and answers its own CORS - with credentials, as the SockJS transports require, whatever `DIRIGIBLE_CORS_ALLOW_CREDENTIALS` says for the rest of the platform. A script running on the platform reaches a Dirigible broker through the `websockets` API with the CONNECT headers as the third argument: `Websockets.createWebsocket(uri, handler, { Authorization: "Bearer " + idToken })` - see [Websockets](/api/net/websockets).

## Exchange a token for a session

The platform's cookie-based surfaces - the IDE, a generated application shell - can be opened by a token client as the same user through `POST /login/token`:

```
POST /login/token
Authorization: Bearer <ID token>
```

```json
{ "outcome": "AUTHENTICATED", "expiresAt": "2026-09-17T11:15:30Z" }
```

The response sets the session cookie. The session carries exactly the identity and roles of the token, is a fresh one (whatever session the request carried is discarded first) and ends when the token expires. Only an ID token qualifies:

| Outcome             | HTTP status | Meaning                                                                    |
| ------------------- | ----------- | -------------------------------------------------------------------------- |
| `AUTHENTICATED`     | 200         | Session established, cookie set.                                           |
| `UNAUTHENTICATED`   | 401         | No validated bearer token on the request.                                  |
| `ID_TOKEN_REQUIRED` | 403         | The token is an access token.                                              |
| -                   | 404         | The active profile does not accept bearer tokens (`basic`, `github`, ...). |

The session is filed under the profile's client registration (`cognito` or `keycloak`) - the one whose identity provider the tokens are validated against.

The cookie is meant for pages served by the platform itself. Its attributes are unchanged - in particular there is no `SameSite=None` - so a page on another site cannot use it cross-site, which is intended.

The session is not consulted with the identity provider again. A hosted-login session is re-validated through its refresh token whenever the access token expires. A token-minted session has none and lives until the ID token's `exp`, so a user disabled at the provider keeps it until then - exactly as long as the token itself would be accepted as a bearer. Keep the lifetime of ID tokens short accordingly.

## What changes for existing deployments

These apply without any configuration:

- An ID token presented as a bearer token used to pass on signature and expiry alone and to act as its `sub` with no roles. It is now verified like a login and acts as the user it names: the user name is the principal claim (`email` on Cognito, `preferred_username` on Keycloak) and the roles are those of its groups. An ID token of another application of the same user pool or realm is refused (audience check), as is one without the principal claim, one whose `email` is the name but is not verified (`DIRIGIBLE_OAUTH2_JWT_REQUIRE_VERIFIED_EMAIL`), and a Keycloak token whose `typ` is neither `ID` nor `Bearer` - or that carries no `typ` at all, since Keycloak types every token it issues and an untyped one is another issuer's. A deployment that keyed data on the `sub` of such tokens sees the user name change.
- Access tokens keep their rules (signature, expiry, `sub` as the name, roles from scopes) and are additionally checked against the issuer of the profile - `DIRIGIBLE_OAUTH2_JWT_ISSUER_URI` overrides it where the tokens name the provider by another URL.
- On the `basic` and `snowflake` profiles, cross-origin requests no longer carry credentials - a bearer token still works from any origin.
- The STOMP broker requires an authenticated CONNECT and restricts destinations as described above. Anonymous STOMP clients stop working - the platform's own `websockets` API client included, which connects with a bare CONNECT unless it is given the headers: `Websockets.createWebsocket(uri, handler, { Authorization: "Bearer " + token })`.
- On the OAuth2 profiles a bearer or anonymous request no longer creates a session.
- In the single-pool and single-realm multi-tenant modes an ID token must carry the `custom:tenant` claim of the host's tenant - an access token without the claim passes as before.

## See also

- [Amazon Cognito](/help/setup/authentication/cognito) and [Keycloak](/help/setup/authentication/keycloak) - profile setup
- [First-Party Sign-In](/help/setup/authentication/first-party-sign-in) - an application-owned login page served by the platform
- [Environment variables](/help/reference/environment-variables#cors) - the CORS and bearer token variables
- [Security model](/help/concepts/security-model)
