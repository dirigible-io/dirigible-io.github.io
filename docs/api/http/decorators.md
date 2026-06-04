# Decorators

## Overview

::: tip Module
- package: `@aerokit/sdk/http`
- source: [http/decorators.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/http/decorators.ts)
- last updated: 
:::

This module provides a set of decorators for defining HTTP controllers and their associated routes in a declarative manner. The decorators allow developers to annotate classes and methods to specify how they should handle HTTP requests, making it easier to create RESTful APIs with clear and concise code.

### Key Features:
- **Controller Decorator**: The `@Controller` decorator is used to mark a class as an HTTP controller, which can contain multiple route handlers.
- **HTTP Method Decorators**: Decorators such as `@Get`, `@Post`, `@Put`, `@Patch`, `@Delete`, `@Head`, and `@Options` are used to define the HTTP method and path for each route handler method within the controller.
- **Documentation Decorator**: The `@Documentation` decorator allows developers to add documentation to their controllers or methods, which can be useful for generating API documentation.

### Use Cases:
- **API Development**: These decorators are primarily used in the development of RESTful APIs, allowing developers to define their endpoints and handlers in a clear and structured way.
- **Code Organization**: By using decorators, developers can keep their code organized and maintainable, separating the routing logic from the business logic within their controllers.

### Example Usage:
```ts
import { Controller, Get, Post, Documentation } from "@aerokit/sdk/http";

@Controller
@Documentation("UserController handles user-related operations.")
class UserController {
    @Get("/users/{id}")
    @Documentation("Retrieves a user by ID.")
    getUserById(id: string) {
        // Logic to retrieve user by ID
    }

    @Post("/users")
    @Documentation("Creates a new user.")
    createUser(userData: any) {
        // Logic to create a new user
    }
}
```

## Classes

