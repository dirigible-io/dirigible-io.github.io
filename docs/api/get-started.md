# Get Started

Welcome to the **Aerokit SDK** — a unified TypeScript SDK for building cloud-native applications, services, and integrations.

This guide will help you understand how to start using Aerokit both **inside the platform** and **externally via npm**.

## How Aerokit Works

Aerokit is typically **bundled with the Low-Code platform**, which means:

* No installation is required
* The runtime, APIs, and modules are already available
* You can immediately start building services, entities, and integrations

However, the SDK is also published on npm for **external usage and development**:

- [https://www.npmjs.com/package/@aerokit/sdk](https://www.npmjs.com/package/@aerokit/sdk)

## Development Model

Aerokit follows a **TypeScript-first, code-as-configuration approach**:

* Use **decorators** instead of XML/JSON configs
* Define APIs with `@Controller`
* Model data with `@Entity`
* Register services with `@Component`
* Schedule jobs with `@Scheduled`

This makes your code:

* Self-documenting
* Strongly typed
* Easy to test and maintain

## Basic Example

A simple application typically consists of:

### 1. Entity (Data Model)

```ts
import { Entity, Table, Id, Generated, Column } from "@aerokit/sdk/db";

@Entity("CountryEntity")
@Table("SAMPLE_COUNTRY")
export class CountryEntity {

  @Id()
  @Generated("sequence")
  @Column({ name: "COUNTRY_ID", type: "long" })
  public Id?: number;

  @Column({ name: "COUNTRY_NAME", type: "string" })
  public Name?: string;
}
```

### 2. Repository (Data Access)

```ts
import { Repository } from "@aerokit/sdk/db";
import { Component } from "@aerokit/sdk/component";
import { CountryEntity } from "./CountryEntity";

@Component("CountryRepository")
export class CountryRepository extends Repository<CountryEntity> {
  constructor() {
    super(CountryEntity);
  }
}
```

### 3. Controller (API Layer)

```ts
import { Controller, Get } from "@aerokit/sdk/http";
import { Injected, Inject } from "@aerokit/sdk/component";
import { CountryRepository } from "./CountryRepository";

@Controller
@Injected()
class CountryController {

  @Inject("CountryRepository")
  private readonly repository!: CountryRepository;

  @Get("/")
  public getAll() {
    return this.repository.findAll({ limit: 20, offset: 0 });
  }
}
```

## Using Aerokit Outside the Platform

If you're not using the bundled runtime, install the SDK manually:

```bash
npm install @aerokit/sdk
```

Then import only what you need:

```ts
import { Controller } from "@aerokit/sdk/http";
import { Entity } from "@aerokit/sdk/db";
```

## Key Concepts

* **Modules** – Independent packages like `http`, `db`, `security`, `job`
* **Decorators** – Define behavior declaratively
* **Dependency Injection** – Connect components via `@Inject`
* **Runtime Extensibility** – Add features without redeployment

## What to Do Next

* Explore individual **SDK modules** from the sidebar

* Start with:

  * `@aerokit/sdk/http` for APIs
  * `@aerokit/sdk/db` for persistence
  * `@aerokit/sdk/component` for DI

* Build your first:

  * REST service
  * Database entity
  * Background job

## Tip

Start small: define a simple controller + entity, then gradually introduce repositories, jobs, and integrations.

You're now ready to start building with **Aerokit SDK**
