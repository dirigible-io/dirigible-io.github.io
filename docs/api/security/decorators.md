# Decorators

## Overview

::: tip Module
- package: `@aerokit/sdk/security`
- source: [security/decorators.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/security/decorators.ts)
- last updated: 
:::

This module provides security-related decorators for enforcing role-based access control on classes and methods. The primary decorator, `@Roles`, allows developers to specify which user roles are required to access certain functionality within their application. By applying the `@Roles` decorator to a class or method, developers can ensure that only users with the appropriate roles can execute the associated code, enhancing the security of their applications.

### Key Features:
- **Role-Based Access Control**: The `@Roles` decorator enables developers to define access control rules based on user roles, ensuring that only authorized users can access specific functionality.
- **Class and Method Level Security**: The `@Roles` decorator can be applied at both the class and method levels, allowing for flexible security configurations.

### Use Cases:
- **Securing API Endpoints**: Developers can use the `@Roles` decorator to protect API endpoints, ensuring that only users with the necessary roles can access certain routes or perform specific actions.
- **Enforcing Business Logic**: By applying the `@Roles` decorator to methods that contain critical business logic, developers can prevent unauthorized access and maintain the integrity of their applications.

### Example Usage:
```ts
import { Roles } from "@aerokit/sdk/security";

@Roles(["admin"])
class AdminController {
    @Roles(["admin", "manager"])
    deleteUser(userId: string) {
        // Logic to delete a user, accessible only to admin and manager roles
    }

    @Roles(["admin"])
    createUser(userData: any) {
        // Logic to create a new user, accessible only to admin role
    }
}
```

## Classes

