---
title: Custom authentication
description: Plug a new authentication backend in via CustomSecurityConfigurator.
---

# Custom authentication

Authentication backends are Spring Security configurations. The platform ships Basic, GitHub OAuth, Keycloak, Cognito, and Snowflake. Add a new one by implementing the `CustomSecurityConfigurator` SPI - this lets you contribute a Spring Security config without forking `BasicSecurityConfig`.

## Interface

```java
public interface CustomSecurityConfigurator {
    void configure(HttpSecurity http) throws Exception;
}
```

The platform's main security configuration calls every registered `CustomSecurityConfigurator` in turn against the same `HttpSecurity` builder, so each contributor can add filters, authentication providers, and route rules.

## Module layout

```
components/security/security-<name>/
  pom.xml
  src/main/java/.../<name>/
    <Name>SecurityConfigurator.java
    <Name>AuthenticationProvider.java   (optional)
  src/main/resources/
    application-<profile>.properties
```

The Spring profile (`<profile>`) gates the configuration so it activates only when explicitly turned on. Conventional name: same as the backend (`keycloak`, `cognito`, `<your-name>`).

## Implementing the configurator

```java
@Configuration
@Profile("foo")
public class FooSecurityConfigurator implements CustomSecurityConfigurator {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.oauth2Login(oauth -> oauth
            .clientRegistrationRepository(fooClientRegistrationRepository()));
    }

    @Bean
    public ClientRegistrationRepository fooClientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(/* ... */);
    }
}
```

For Spring Security OAuth2 the heavy lifting is already in Spring; the configurator just registers the client registration repository and any role-mapping filters.

## Mapping to platform roles

The platform expects role names in the authentication's authorities. The two super-roles `DEVELOPER` and `ADMINISTRATOR` short-circuit `@Roles` checks; declare any application-specific roles via `*.roles` artefacts and ensure your authentication provider populates them.

## Activation

```bash
SPRING_PROFILES_ACTIVE=foo
DIRIGIBLE_FOO_CLIENT_ID=...
DIRIGIBLE_FOO_CLIENT_SECRET=...
```

## See also

- [Authentication setup](/help/setup/authentication/)
- [Security model](/help/concepts/security-model)
- [Roles artefact](/help/artefacts/security/roles)
