# Decorators

## Overview

::: tip Module
- package: `@aerokit/sdk/component`
- source: [component/decorators.ts](https://github.com/eclipse-dirigible/dirigible/tree/master/components/api/api-modules-javascript/src/main/resources/META-INF/dirigible/modules/src/component/decorators.ts)
- last updated: 
:::

This module provides a set of decorators for defining and managing Dependency Injection (DI) components within the Dirigible environment. The decorators are designed to be compatible with both legacy JavaScript environments (like Mozilla Rhino or older GraalJS) and modern JavaScript environments that support the latest decorator specifications.

### Key Features
- **Component Decorator**: Marks a class as a DI component, allowing it to be registered and managed by the DI container.
- **Injected Decorator**: An alias for the Component decorator, used for semantic clarity when a class is intended to be injected as a dependency rather than being a primary component.
- **Inject Decorator**: Marks a class property as an injection point, specifying that a dependency should be injected at runtime based on the property name or an optional custom name.
- **Hybrid Decorator Support**: The decorators are implemented to work seamlessly in both legacy and modern JavaScript environments, ensuring broad compatibility across different runtime contexts.

### Use Cases
- Defining services, repositories, controllers, or any other components that require dependency injection in a Dirigible application.
- Managing dependencies and promoting loose coupling between components for better maintainability and testability.
- Leveraging the DI container to automatically resolve and inject dependencies based on component registration and metadata.

### Example Usage
```ts
import { Component, Inject } from "@aerokit/sdk/component";

@Component('MyService')
class MyService {
  // Service implementation
}

@Component
class MyController {
  @Inject('MyService')
  private myService!: MyService;

  // Controller implementation that uses myService
}
```

## Classes

