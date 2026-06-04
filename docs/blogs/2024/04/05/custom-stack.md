---
title: "Building Your Own Eclipse Dirigible Stack"
description: "Building Your Own Eclipse Dirigible Stack: A Step-by-Step Guide"
author: Yordan Pavlov
author_gh_user: thuf
author_avatar: https://avatars.githubusercontent.com/u/4092083?v=4
read_time: 5 min
publish_date: April 05, 2024
---

# Building Your Own Eclipse Dirigible Stack: A Step-by-Step Guide

In the realm of enterprise development, customization often leads to optimization. Eclipse Dirigible, a cloud development platform, offers immense flexibility, allowing developers to tailor their development environments to specific needs. One such capability is creating a custom Eclipse Dirigible stack. This tutorial will walk you through the process of building your own stack from scratch.

## Overview

### What is a Custom Stack?

A custom stack in Eclipse Dirigible is essentially a personalized environment tailored to your project's requirements. It involves setting up your development environment with custom configurations, branding, and additional functionalities as per your project needs. Follow the steps [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/) to build your Eclipse Dirigible Custom Stack.

![Dirigible](dirigible.jpg)

## Getting Started

### Prerequisites

Before diving into the customization process, ensure you have the following prerequisites installed on your system:

- JDK 21+ (OpenJDK versions are also supported)
- Maven 3.5+
- Node.js 18+ and npm
- esbuild 0.19+
- TypeScript Compiler (tsc) 5.2+

## Build Your Custom Stack

### Project Structure

The first step is to create the project structure for your custom stack. This includes setting up Maven `pom.xml` files, static content resources, `application.properties` configuration files, and a Spring Boot Java class. Refer to the tutorial [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/project-structure/) for detailed instructions on creating the project structure.

### Build and Run

Once the project structure is set up, navigate to the root folder of your project in the terminal and execute the following commands:

To build the custom stack:

```
mvn clean install
```

To run the custom stack:

```
java --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.nio=ALL-UNNAMED -jar application/target/custom-stack-application-*.jar
```

You can access your custom stack at http://localhost:8080.

## Customization Steps

### Branding

Customizing the branding of your custom stack adds a personal touch to your development environment. Follow the instructions [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/branding/) to rebrand your Eclipse Dirigible Custom Stack.

### Facade

Creating Java Facade and TypeScript API enhances the functionality of your custom stack. The tutorial provides detailed steps on creating APIs Maven Module, Java Facade, and TypeScript API. Check out the tutorial [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/facade/) for a step-by-step guide.

### Advanced Facade

Dive deeper into creating a TypeScript API for your custom stack with different versions of Java Facades. Learn about the native Java and TypeScript ways of implementing APIs. Refer to the tutorial [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/advanced-facade/) for detailed instructions.

### Dependency

Integrating external Maven dependencies adds extra functionalities to your custom stack. Follow the steps in the tutorial [here](https://www.dirigible.io/help/tutorials/customizations/custom-stack/dependency/) to add external Maven dependency for generating barcodes and using it in your Eclipse Dirigible Custom Stack.

## Conclusion

By following this tutorial, you have successfully built your own Eclipse Dirigible stack tailored to your project's needs. With custom branding, APIs, and additional dependencies, your development environment is now optimized for efficient development. For more detailed instructions and resources, refer to the complete tutorial [here](https://github.com/dirigiblelabs/tutorial-custom-stack).

Start customizing and unleash the full potential of Eclipse Dirigible for your projects!