---
title: "Monitoring Eclipse Dirigible with Spring Boot Admin"
description: "Monitoring Eclipse Dirigible with Spring Boot Admin"
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 5 min
publish_date: December 04, 2024
---
## Overview
Modern applications demand robust observability and monitoring tools to ensure reliability, performance, and security. To address this, [Eclipse Dirigible](https://www.dirigible.io/) introduces seamless integration with [Spring Boot Admin (SBA)](https://docs.spring-boot-admin.com/). By embedding SBA's server and client capabilities, Dirigible provides an intuitive UI to monitor the health, performance metrics, and logs of applications. This feature eliminates the need for external monitoring setups, making it easier for developers to manage their applications directly from within Dirigible. This blog explores how to configure and use this integration to enhance your observability toolkit.

## Steps to Run Spring Boot Admin Server and Client

Prerequisites:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your system

Steps:

- Run Eclipse Dirigible with Spring Boot Admin profiles

    To run the application with the Spring Boot Admin server and client, you must activate two spring profiles: `spring-boot-admin-server` and `spring-boot-admin-client`. By default, the client is configured to automatically connect to the embedded server.
    ```shell
    # use version 10.6.32 or newer
    IMAGE_TAG=10.6.32
    
    docker run -e SPRING_PROFILES_ACTIVE=spring-boot-admin-server,spring-boot-admin-client \
       -p 8080:8080 --name dirigible dirigiblelabs/dirigible:$IMAGE_TAG
    ```

- Access Spring Boot Admin UI

    Once the application starts, you can access the Spring Boot Admin UI at: [http://localhost:8080/spring-admin](http://localhost:8080/spring-admin). You can login with the default credentials `admin / admin`.
    <a href="../../../../images/spring-boot-admin/sba-welcome-page.png" target="_blank">
     <img src="../../../../images/spring-boot-admin/sba-welcome-page.png" alt="sba-welcome-page.png">
    </a>

## Explore Spring Boot Admin UI

You can select the running instance and explore its capabilities.
The SBA interface is organized into several tabs, each offering different insights into your application's performance and health. Below is an overview of these tabs along with brief descriptions of their functionalities.

- Insights Tab
    - Details - displays general information about the application, such as process details, health, threads, garbage collection, memory details and so on.
    <a href="../../../../images/spring-boot-admin/insights-details-01.png" target="_blank">
    <img src="../../../../images/spring-boot-admin/insights-details-01.png" alt="insights-details-01.png">
    </a>
    <a href="../../../../images/spring-boot-admin/insights-details-02.png" target="_blank">
    <img src="../../../../images/spring-boot-admin/insights-details-02.png" alt="insights-details-02.png">
    </a>
    - Metrics - provides a comprehensive overview of various metrics such as CPU usage, memory consumption, request counts, and response times. This allows you to monitor application performance in real-time and identify performance trends or anomalies.
    <a href="../../../../images/spring-boot-admin/metrics.png" target="_blank">
    <img src="../../../../images/spring-boot-admin/metrics.png" alt="metrics.png">
    </a>
    - Quartz - displays information related to Quartz scheduler jobs. This helps in managing and monitoring scheduled tasks within your application.
    <a href="../../../../images/spring-boot-admin/quartz.png" target="_blank">
      <img src="../../../../images/spring-boot-admin/quartz.png" alt="quartz.png">
    </a>
    - Environment - shows environment properties and variables, giving you insights into the application's runtime environment and configurations. This is useful for verifying configuration settings and debugging environment-related issues.
    <a href="../../../../images/spring-boot-admin/env.png" target="_blank">
      <img src="../../../../images/spring-boot-admin/env.png" alt="env.png">
    </a>
    - Beans - lists all the Spring beans loaded in the application context, including their dependencies and configurations. This helps you understand the application's component structure and manage bean configurations effectively.
    <a href="../../../../images/spring-boot-admin/beans.png" target="_blank">
      <img src="../../../../images/spring-boot-admin/beans.png" alt="beans.png">
    </a>
    - Configuration Properties - displays the current configuration properties of the application, including both default and overridden settings. This facilitates easy configuration management and ensures that your application is running with the desired settings.
    <a href="../../../../images/spring-boot-admin/config-props.png" target="_blank">
      <img src="../../../../images/spring-boot-admin/config-props.png" alt="config-props.png">
    </a>
    - Conditions - provides details about the auto-configuration conditions, showing which configurations are applied and which are not. This aids in troubleshooting configuration issues and understanding how Spring Boot is configuring your application.
    <a href="../../../../images/spring-boot-admin/conditions.png" target="_blank">
      <img src="../../../../images/spring-boot-admin/conditions.png" alt="conditions.png">
    </a>

- Loggers Tab - allows you to configure log levels for different packages or classes dynamically. This enables real-time control over the verbosity of application logs, which is essential for debugging and monitoring.
<a href="../../../../images/spring-boot-admin/loggers.png" target="_blank">
<img src="../../../../images/spring-boot-admin/loggers.png" alt="loggers.png">
</a>
- JVM Tab
    - Thread Dumps - lets you create and analyze thread dumps to identify thread-related issues such as deadlocks or excessive thread usage.
    <a href="../../../../images/spring-boot-admin/thread-dump.png" target="_blank">
    <img src="../../../../images/spring-boot-admin/thread-dump.png" alt="thread-dump.png">
    </a>
    - Heap Dumps - allows you to generate heap dumps for memory analysis and debugging memory leaks, ensuring optimal memory management.
    <a href="../../../../images/spring-boot-admin/heap-dump.png" target="_blank">
    <img src="../../../../images/spring-boot-admin/heap-dump.png" alt="heap-dump.png">
    </a>
- Mappings - displays the HTTP request mappings, showing the available endpoints, their paths, and the associated controllers and methods. This assists in API management, ensuring that all endpoints are correctly mapped and functioning as expected.
  <a href="../../../../images/spring-boot-admin/mappings.png" target="_blank">
  <img src="../../../../images/spring-boot-admin/mappings.png" alt="mappings.png">
  </a>
- Caches - provides insights into the application's cache usage, including cache names, sizes, and hit/miss rates. This helps you optimize caching strategies to improve application performance and efficiency.
  <a href="../../../../images/spring-boot-admin/caches.png" target="_blank">
  <img src="../../../../images/spring-boot-admin/caches.png" alt="caches.png">
  </a>

## Configurations for SBA Server and Client
The integration supports several environment variables to customize the server and client behavior. These configurations can also be used to configure Eclipse Dirigible as an SBA client for an external SBA server.

| Config key | Description |
| --- | --- |
| DIRIGIBLE_SPRING_ADMIN_SERVER_URL | SBA Server URL |
| DIRIGIBLE_SPRING_ADMIN_SERVER_USERNAME | username which is used by the client to register in the SBA Server |
| DIRIGIBLE_SPRING_ADMIN_SERVER_PASSWORD | password which is used by the client to register in the SBA Server |
| DIRIGIBLE_SPRING_ADMIN_CLIENT_USERNAME | username for the client application which is passed to the SBA Server so that it can call the client |
| DIRIGIBLE_SPRING_ADMIN_CLIENT_PASSWORD | password for the client application which is passed to the SBA Server so that it can call the client |

## Summary
In this blog, we explore how to integrate Spring Boot Admin (SBA) into Eclipse Dirigible for enhanced monitoring and management capabilities. With an embedded SBA server and client profiles, Dirigible applications can be seamlessly registered and monitored. 

We detail how to set up the SBA server and client using Docker, configure Eclipse Dirigible, and leverage SBA’s intuitive UI to gain insights into application health, metrics, logs, and more. Whether you’re monitoring a single application or managing multiple instances, SBA integration provides a robust solution for operational observability.
