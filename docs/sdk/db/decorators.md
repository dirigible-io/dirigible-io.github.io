# Decorators

## Overview

::: tip Module
- package: `org.eclipse.dirigible.sdk.db`
- source: [db/](https://github.com/eclipse/dirigible/tree/master/components/api/api-modules-java/src/main/java/org/eclipse/dirigible/sdk/db)
:::

These annotations are the declarative mapping layer for entities managed by the `data-store-java` module. Their signatures mirror `jakarta.persistence` so existing JPA knowledge transfers, but they are processed by Dirigible's own runtime - not propagated to Hibernate via JPA. The runtime reflects over these annotations and builds Hibernate mappings (HBM XML, dynamic-map mode) on the fly.

### Complete Example:

```java
import org.eclipse.dirigible.sdk.db.*;
import java.sql.Timestamp;

@Entity(name = "Customer")
@Table(name = "CUSTOMER")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "CUSTOMER_ID")
    private Long id;

    @Column(name = "NAME", nullable = false, length = 128)
    private String name;

    @Column(name = "EMAIL", unique = true, length = 256)
    private String email;

    @CreatedAt
    @Column(name = "CREATED_AT")
    private Timestamp createdAt;

    @CreatedBy
    @Column(name = "CREATED_BY", length = 64)
    private String createdBy;

    @UpdatedAt
    @Column(name = "UPDATED_AT")
    private Timestamp updatedAt;

    @UpdatedBy
    @Column(name = "UPDATED_BY", length = 64)
    private String updatedBy;

    @Transient
    private String displayLabel;

    // getters and setters
}
```

## @Entity

Marks a client Java class as a persistent entity managed by the `data-store-java` module.

- **Target**: `TYPE`
- **Retention**: `RUNTIME`

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `name` | `String` | `""` | Logical entity name. Defaults to the simple class name when blank. |

### Example

```java
@Entity(name = "Customer")
public class Customer {
    // fields...
}
```

## @Table

Overrides the physical table name for an `@Entity`. When absent, the table name defaults to the entity name in upper case.

- **Target**: `TYPE`
- **Retention**: `RUNTIME`

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `name` | `String` | `""` | Physical database table name. |

### Example

```java
@Entity(name = "Customer")
@Table(name = "CRM_CUSTOMERS")
public class Customer {
    // fields...
}
```

## @Column

Maps a field to a database column. All attributes are optional. When `name` is blank, the field name is used verbatim (case preserved).

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `name` | `String` | `""` | Physical column name. Defaults to the field name. |
| `nullable` | `boolean` | `true` | Whether the column may be `NULL`. |
| `unique` | `boolean` | `false` | Whether a unique constraint applies. |
| `length` | `int` | `255` | Length for string-typed columns. |
| `precision` | `int` | `0` | Numeric precision (total digits). |
| `scale` | `int` | `0` | Numeric scale (digits after the decimal point). |
| `columnDefinition` | `String` | `""` | Raw column definition override (overrides other attributes when set). |

### Example

```java
@Column(name = "EMAIL", nullable = false, unique = true, length = 256)
private String email;

@Column(name = "PRICE", precision = 12, scale = 2)
private java.math.BigDecimal price;
```

## @Id

Marks the primary-key field of an `@Entity`. Field access only.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@Id
@Column(name = "CUSTOMER_ID")
private Long id;
```

## @GeneratedValue

Declares an ID-generation strategy for the field it annotates. Must accompany `@Id`.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Attributes

| Attribute | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| `strategy` | `GenerationType` | `GenerationType.AUTO` | The ID-generation strategy. |

### Example

```java
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
@Column(name = "CUSTOMER_ID")
private Long id;
```

## GenerationType

ID generation strategies, mirroring `jakarta.persistence.GenerationType`. Mapped onto Hibernate's `generator class` attribute in the produced HBM mapping:

| Value | Hibernate generator | Description |
| ------ | ------ | ------ |
| `AUTO` | `native` | Let the database pick the most natural strategy. |
| `IDENTITY` | `identity` | Auto-increment / identity column. |
| `SEQUENCE` | `sequence` | Database sequence. |
| `TABLE` | `increment` | Sequence emulated via an increment counter. |

### Example

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

## @CreatedAt

Marks a timestamp field that the store automatically populates with the current instant on insert. The field type should be `java.sql.Timestamp`, `java.time.Instant`, or `java.util.Date`.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@CreatedAt
@Column(name = "CREATED_AT")
private java.sql.Timestamp createdAt;
```

## @CreatedBy

Marks a `String` field that the store automatically populates with the calling user's name on insert (via `UserFacade.getName()`).

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@CreatedBy
@Column(name = "CREATED_BY", length = 64)
private String createdBy;
```

## @UpdatedAt

Marks a timestamp field that the store automatically refreshes to the current instant on every update.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@UpdatedAt
@Column(name = "UPDATED_AT")
private java.sql.Timestamp updatedAt;
```

## @UpdatedBy

Marks a `String` field that the store refreshes with the calling user's name on every update.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@UpdatedBy
@Column(name = "UPDATED_BY", length = 64)
private String updatedBy;
```

## @Transient

Excludes a field from the entity's database mapping. Use it for derived or in-memory-only state.

- **Target**: `FIELD`
- **Retention**: `RUNTIME`

### Example

```java
@Transient
private String displayLabel;
```
