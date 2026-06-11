---
title: REST with TypeScript decorators
description: Build a REST endpoint in TypeScript using @Controller / @Get / @Post / @Body.
---

# REST with TypeScript decorators

A 5-minute walkthrough: a CRUD endpoint in TypeScript using the modern decorator pattern.

## 1. Create a project

In the IDE, open the [Workbench perspective](/help/ide/perspectives/workbench). Right-click in the [Projects view](/help/ide/views/projects) -> **New** -> **Project**. Name it `countries`.

## 2. Add a controller

Create `countries/api/CountryController.ts`:

```ts
import { Controller, Get, Post, Put, Delete, Body, PathParam } from "@aerokit/sdk/http/decorators";

interface Country {
    id: number;
    code: string;
    name: string;
}

const data: Country[] = [
    { id: 1, code: "US", name: "United States" },
    { id: 2, code: "DE", name: "Germany" },
    { id: 3, code: "BG", name: "Bulgaria" }
];

@Controller
class CountryController {

    @Get("/")
    public list() {
        return data;
    }

    @Get("/{id}")
    public byId(@PathParam("id") id: number) {
        return data.find(c => c.id === id);
    }

    @Post("/")
    public create(@Body country: Country) {
        country.id = data.length + 1;
        data.push(country);
        return country;
    }

    @Put("/{id}")
    public update(@PathParam("id") id: number, @Body country: Country) {
        const i = data.findIndex(c => c.id === id);
        if (i < 0) return null;
        data[i] = { ...data[i], ...country, id };
        return data[i];
    }

    @Delete("/{id}")
    public remove(@PathParam("id") id: number) {
        const i = data.findIndex(c => c.id === id);
        if (i < 0) return null;
        return data.splice(i, 1)[0];
    }
}
```

## 3. Publish

Right-click the project -> **Publish**. The TypeScript file is transpiled on-demand by the platform; no build step.

## 4. Try it

```bash
curl http://localhost:8080/services/ts/countries/api/CountryController.ts/
curl http://localhost:8080/services/ts/countries/api/CountryController.ts/1
curl -X POST http://localhost:8080/services/ts/countries/api/CountryController.ts/ \
     -H 'content-type: application/json' \
     -d '{"code":"FR","name":"France"}'
```

## 5. OpenAPI

The controller's OpenAPI fragment is published at `/services/openapi`. Open the [Swagger view](/help/ide/views/swagger) for an interactive explorer.

## See also

- [REST APIs (develop)](/help/develop/rest-apis)
- [`@aerokit/sdk/http/decorators`](/api/http/decorators)
- [REST with Java controllers](/help/tutorials/rest-with-java-controllers)
