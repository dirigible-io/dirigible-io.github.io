---
title: Secrets and encryption
description: "@Encrypted JPA fields and platform secret handling."
---

# Secrets and encryption

## `@Encrypted` JPA fields

The platform ships an `@Encrypted` JPA annotation (`components/core/core-base/.../encryption/Encrypted.java`). Apply to a field on any platform entity to have its value encrypted on write and decrypted on read.

```java
import org.eclipse.dirigible.components.base.encryption.Encrypted;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

@Entity
public class ApiKey {
    @Id private String name;

    @Encrypted
    @Column private String secret;
}
```

Encrypted values are stored as base64-encoded ciphertext. The encryption key is platform-managed and derives from the configured master key (see below).

## Master key

The master encryption key is supplied via environment. Pick **one** of:

- `DIRIGIBLE_ENCRYPTION_KEY` (raw base64-encoded key).
- `DIRIGIBLE_ENCRYPTION_KEYSTORE_PATH` + `_KEYSTORE_PASSWORD` + `_KEYSTORE_ALIAS` (Java keystore).

For Kubernetes deployments mount the key from a `Secret`:

```yaml
env:
  DIRIGIBLE_ENCRYPTION_KEY:
    valueFrom:
      secretKeyRef:
        name: dirigible-encryption
        key: master-key
```

## Application-managed secrets

For secrets your application code consumes (third-party API keys, etc.):

- Prefer environment variables, sourced from the platform's secret store (Kubernetes Secret, AWS Secrets Manager, etc.).
- For runtime-managed values, store them in an `@Encrypted` field on a small JPA entity you publish as a `@Repository`.
- Avoid putting secrets in source-controlled artefact JSON. Use `${env.NAME}` interpolation in data-source artefacts (see [`/help/artefacts/data/datasource`](/help/artefacts/data/datasource)).

## Rotation

To rotate the master key:

1. Add a new master key alongside the old one. The platform supports a key list with the most-recent key used for writes; old keys remain usable for reads.
2. Re-encrypt: a one-off job that reads each `@Encrypted` value and writes it back triggers encryption with the current key.
3. Remove the old key once no stored value still uses it.

## See also

- [Security model](/help/concepts/security-model)
- [Authentication](/help/setup/authentication/)
