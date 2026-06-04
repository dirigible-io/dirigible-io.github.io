# Aerokit SDK

Welcome to the **Aerokit SDK** documentation.

Aerokit is a modern TypeScript SDK extracted from the Eclipse Dirigible ecosystem, designed to simplify the development of cloud-native applications, services, and integrations.

## Overview

The Aerokit SDK provides a modular and extensible set of APIs that enable developers to:

* Build backend services using TypeScript
* Interact with HTTP services and external APIs
* Work with databases and persistence layers
* Handle authentication, security, and context
* Integrate with cloud-native infrastructure

The SDK is structured into multiple modules, each focused on a specific concern. You can explore them through the sidebar navigation.

## Modules

The SDK is split into independent modules to ensure flexibility and scalability. Common categories include:

* **Core** – foundational utilities and runtime helpers
* **HTTP** – HTTP clients and request handling
* **Database** – database access and query execution
* **Security** – authentication and authorization
* **Messaging** – event-driven and messaging capabilities
* **Utilities** – helper functions and shared logic

## Getting Started

To start using the Aerokit SDK:

1. Use the SDK directly (pre-bundled in the platform) or install it from npm if working externally
2. Import the APIs into your project
3. Configure your runtime environment
4. Start building your application logic

Example:

```ts
import { HttpClient } from '@aerokit/sdk/http';

const response = HttpClient.get('https://api.example.com/data');
console.log(response.data);
```

## Design Principles

Aerokit follows a set of core principles:

* **Modularity** – use only what you need
* **Type Safety** – full TypeScript support
* **Simplicity** – clean and intuitive APIs
* **Extensibility** – easy to extend and customize

## Contributing

Aerokit is open-source and welcomes contributions. Whether it's bug fixes, improvements, or new features, feel free to get involved.

## License

Aerokit SDK is released under an open-source license.

## Next Steps

Select a module from the sidebar to begin exploring the SDK.
