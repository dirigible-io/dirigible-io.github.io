---
title: OAuth
---

OAuth
===

OAuth gives the JWT information about the currently logged in user, if any.

=== "Overview"
- Module: `security/oauth`
- Definition: [https://github.com/eclipse/dirigible/issues/745](https://github.com/eclipse/dirigible/issues/745)
- Source: [/security/oauth.js](https://github.com/eclipse/dirigible/blob/master/components/api-security/src/main/resources/META-INF/dirigible/security/oauth.js)
- Status: `stable`


### Basic Usage

```javascript
var response = require("http/response");
var oauth = require("security/oauth");
 
response.println("Email: " + oauth.getEmail());
response.println("Username: " + oauth.getUsername());
response.println("GrantType: " + oauth.getGrantType());
response.println("JWT.payload: " + JSON.stringify(oauth.getToken()));
```

### Functions

---

Function     | Description | Returns
------------ | ----------- | --------
**getToken()**   | Returns the JWT object. | *object*
**get(name)**   | Get given property by *name* from the JWT. | *string*
**getEmail()**   | Returns the *email* JWT property. | *string*
**getUsername()**   | Returns the *user_name* JWT property. | *string*
**getGrantType()**   | Returns the *grant_type* JWT property. | *string*
**verify(token)**   | Returns true if JWT *token* is valid. | *boolean*
**getClient(config)**   | Returns *OAuthClient* with the specified *[config](#oauthconfg)*. | *OAuthClient*

### Objects

---

#### OAuthConfg

Property     | Description | Type     | Default
------------ | ----------- | -------- | --------
**url**   | The OAuth server *URL*. | *string* | `null`
**clientId**   | The  *clientId* for the authentication flow. | *string* | `null`
**clientSecret**   | The  *clientSecret* for the authentication flow. | *string* | `null`
**grantType**   | (Optional) The  *grantType* of the authentication flow. | *string* | `client_credentials`
**isAbsoluteUrl**   | (Optional) Whether to add by default `/oauth/token` to the *URL*. | *boolean* | `false`

Sample **OAuthConfg**:

```javascript
let oauthConfig = {
    url: "https://my-oauth-server.com",
    clientId: "my-client-id"
    clientSecret: "my-client-secret-1234"
};
```


#### OAuthClient

Function     | Description | Returns
------------ | ----------- | --------
**setUrl(url)**   | Sets the OAuth server *URL*. | *-*
**setClientId(clientId)**   | Sets the  *clientId* for the authentication flow. | *-*
**setClientSecret(clientSecret)**   | Sets the  *clientSecret* for the authentication flow. | *-*
**setGrantType(grantType)**   | Sets the  *grantType* of the authentication flow. | *-*
**getToken()**   | Gets the JWT access token. | *object*
