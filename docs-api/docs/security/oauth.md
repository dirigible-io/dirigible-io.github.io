---
title: OAuth
---

OAuth
===

OAuth gives the JWT information about the currently logged in user, if any.

=== "Overview"
- Module: `security/v4/oauth`
- Alias: `security/oauth`
- Definition: [https://github.com/eclipse/dirigible/issues/745](https://github.com/eclipse/dirigible/issues/745)
- Source: [/security/v4/oauth.js](https://github.com/dirigiblelabs/api-security/blob/master/security/v4/oauth.js)
- Facade: [JwtUtils](https://github.com/eclipse/dirigible/blob/master/modules/security/security-oauth/src/main/java/org/eclipse/dirigible/oauth/utils/JwtUtils.java)
- Status: `stable`


### Basic Usage

```javascript
var response = require("http/v4/response");
var oauth = require("security/v4/oauth");
 
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
**getClient(config)**   | Returns *OAuthClient* with the specified *config*. | *OAuthClient*

### Objects

---

#### OAuthClient

Function     | Description | Returns
------------ | ----------- | --------
**setUrl(url)**   | Sets the OAuth server *URL*. | *-*
**setClientId(clientId)**   | Sets the  *clientId* for the authentication flow. | *-*
**setClientSecret(clientSecret)**   | Sets the  *clientSecret* for the authentication flow. | *-*
**setGrantType(grantType)**   | Sets the  *grantType* of the authentication flow. | *-*
**getToken()**   | Gets the JWT access token. | *object*
