---
title: First-Party Sign-In
description: Application-owned login UX on the OAuth2 profiles - native credential sign-in, IdP deep links, and a configurable login page.
---

# First-Party Sign-In

Since 14.30, applications on the OAuth2 login profiles can own their sign-in UX instead of redirecting users to the identity provider's hosted page. Three pieces cooperate:

1. **Native credential sign-in** - `POST /login/native` authenticates the user server-side against the identity provider and establishes the standard platform session. Available on the `cognito` profile (over the SRP flow); other profiles can opt in through the internal `NativeLoginProvider` contract.
2. **IdP-hint passthrough** - federated logins can be deep-linked straight to the corporate IdP, so the provider-hosted page is never rendered for them either.
3. **Configurable login page** - `DIRIGIBLE_SECURITY_LOGIN_PAGE` redirects unauthenticated browsers to an application page instead of the provider.

A complete reference login page lives at [dirigiblelabs/sample-native-login](https://github.com/dirigiblelabs/sample-native-login).

## Native sign-in endpoint

```
POST /login/native
Content-Type: application/json

{ "username": "jane.doe@example.org", "password": "..." }
```

Optional request fields: `registrationId` (a client registration id, for multi-tenant setups; the profile's default registration when omitted) and `userContextData` (the provider's client-side collector blob - forward it so provider-side threat protection keeps its risk scoring behind the server-side proxy).

On success the response sets the session cookie - the same session the hosted authorization-code callback establishes, with the principal from the registration's `user-name-attribute` and roles from the provider's groups. Tokens never reach the browser, and the refresh token is registered server-side so session re-validation against the provider keeps working unchanged.

```json
{ "outcome": "AUTHENTICATED" }
```

When the provider requires another step, the response carries a challenge instead:

```json
{
  "outcome": "CHALLENGE",
  "challenge": "SOFTWARE_TOKEN_MFA",
  "session": "<opaque provider state>",
  "parameters": { "USERNAME": "<canonical user id>" }
}
```

Answer it on the follow-up endpoint, carrying `challenge`, `session` and the `username` from the challenge parameters back:

```
POST /login/native/challenge
Content-Type: application/json

{
  "challenge": "SOFTWARE_TOKEN_MFA",
  "session": "<opaque provider state>",
  "username": "<canonical user id>",
  "responses": { "SOFTWARE_TOKEN_MFA_CODE": "123456" }
}
```

The answer yields `AUTHENTICATED`, the next challenge, or a failure outcome. Challenge response keys follow the provider's protocol - for Cognito: `SOFTWARE_TOKEN_MFA_CODE`, `SMS_MFA_CODE`, `EMAIL_OTP_CODE`, `NEW_PASSWORD` (for `NEW_PASSWORD_REQUIRED`), `ANSWER` (for `CUSTOM_CHALLENGE`).

### Outcomes

Failures are normalized - provider-raw messages never reach the client, which avoids user enumeration and keeps the texts translatable in the application:

| Outcome | HTTP status | Meaning |
| --- | --- | --- |
| `AUTHENTICATED` | 200 | Session established, cookie set. |
| `CHALLENGE` | 200 | The provider requires another step. |
| `INVALID_CREDENTIALS` | 401 | Credentials refused (also covers unknown users). |
| `PASSWORD_RESET_REQUIRED` | 401 | The provider requires a password reset. |
| `USER_NOT_CONFIRMED` | 401 | The account has not been confirmed yet. |
| `CODE_MISMATCH` | 401 | The challenge code did not match. |
| `CODE_EXPIRED` | 401 | The challenge code expired. |
| `INVALID_PASSWORD` | 401 | The new password was refused by the password policy. |
| `TOO_MANY_ATTEMPTS` | 429 | The provider throttled the attempt. |
| `AUTHENTICATION_FAILED` | 401 | Any other failure. |
| `INVALID_REQUEST` | 400 | Malformed request or unknown client registration. |

On profiles without a native login provider (`basic`, `github`) the endpoint answers 404 and nothing changes.

::: warning Credential handling
Unlike the redirect flow, the raw password transits the platform (browser to endpoint). The implementation never logs request bodies on this route, keeps credential fragments out of exceptions and traces, and retains nothing after the provider call returns - but adopters should make this trade consciously. On the Cognito profile the platform-to-AWS hop uses SRP, so the password itself never crosses that wire.
:::

## IdP-hint passthrough

`/oauth2/authorization/{registrationId}` forwards an allowlisted identity-provider hint onto the authorize redirect, so a login page can deep-link federated users straight to the corporate IdP:

```html
<a href="/oauth2/authorization/cognito?identity_provider=CorporateSSO">Sign in with corporate SSO</a>
```

| Parameter | Provider |
| --- | --- |
| `identity_provider` | Cognito (federated IdP name, e.g. a SAML provider) |
| `idp_identifier` | Cognito (IdP identifier) |
| `kc_idp_hint` | Keycloak |

Only these parameters are forwarded. The hint value must name a provider actually registered at the IdP - an unknown name falls back to the provider-hosted page with a "login option is not available" style message.

The federated flow completes through the standard authorization-code callback, so `${DIRIGIBLE_HOST}/login/oauth2/code/<registration>` must be a registered callback URL at the provider. The same applies to logout: the provider-side sign-out redirects back to `${DIRIGIBLE_HOST}`, which must be a registered sign-out URL. The native credential flow needs neither.

## Configurable login page

```bash
DIRIGIBLE_SECURITY_LOGIN_PAGE=/public/web/my-app/login.html
```

When set, unauthenticated browser requests on the `cognito` and `keycloak` profiles are redirected to this page instead of the identity provider. Unset keeps the standard redirect - no behavior change.

The page itself must be publicly served, which takes three artefacts in the hosting project:

| File | Purpose |
| --- | --- |
| the page under the project | the login page itself |
| `project.json` with `"exposes"` | the web engine serves only exposed project content |
| a `*.access` constraint with role `Public` | anonymous requests are otherwise refused even under `/public` |

```json
{
    "constraints": [
        {
            "path": "/public/web/my-app/login.html",
            "method": "*",
            "scope": "HTTP",
            "roles": [ "Public" ]
        }
    ]
}
```

## See also

- [Amazon Cognito](/help/setup/authentication/cognito) - profile setup and the SRP specifics
- [Keycloak](/help/setup/authentication/keycloak) - profile setup
- [Environment variables](/help/setup/environment-variables)
- [sample-native-login](https://github.com/dirigiblelabs/sample-native-login) - the reference login page
