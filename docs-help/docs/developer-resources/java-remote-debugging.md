---
title: Java Remote Debugging
---

Java Remote Debugging
===


Debugging
---

To connect for remote java debugging of Eclipse Dirigible, follow the next steps:

1. Start the Dirigible executable JAR with the JDWP agent enabled. The runtime ships as a self-contained Spring Boot fat JAR (`dirigible-application-*-executable.jar` under `build/application/target/`), so the standard `-agentlib:jdwp=...` JVM flag is all that is needed:

    !!! example "Start Dirigible with the JDWP agent"

        === "on macOS / Linux"

            ```
            java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 \
              -jar build/application/target/dirigible-application-*-executable.jar
            ```

        === "on Windows (PowerShell)"

            ```
            java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8000 `
              -jar build/application/target/$((Get-ChildItem dirigible-application-*-executable.jar -recurse -File | Sort-Object LastWriteTime | Select -Last 1).BaseName).jar
            ```

        === "Docker Image"

            Run the docker image **with Java Debugging Options** as described [here](/help/setup/docker/).

    The JVM will listen for debugger attaches on **port 8000** (configurable via the `address=` part of the agent string). Use `suspend=y` instead of `suspend=n` if you need the JVM to wait for the debugger before continuing startup.

=== "Eclipse IDE"

    1. Create new `Debug Configuration`:

        ![New Debug Configuration Project](/help/images/developer-resources/java-remote-debugging/1-new-debug-configuration.png)

    1. New `Remote Java Application` configuration:

        !!! note

            - Double click on the `Remote Java Application` to create new configuration.
            - Update the `host` and `port` properties, if needed.

        ![Remote Java Application Configuration](/help/images/developer-resources/java-remote-debugging/2-remote-java-application-configuration.png)

    1. Press the `Debug` button to start new remote debug session.

=== "IntelliJ IDEA"

    1. Create new `Debug Configuration` from the `Edit Configurations..` option:
    
        ![remote_debug_intellij](/help/images/developer-resources/java-remote-debugging/remote_debug_intellij.png)

    1. Add new `Remote JVM Debug` configuration using the `+` button and double click on `Remote JVM Debug`:
    
        ![new_remote_jvm_debug_configuration](/help/images/developer-resources/java-remote-debugging/new_remote_jvm_debug_configuration.png)
        
    1. Use the configuration provided on the screenshot below, update the `host` and `port` properties if needed:
    
        ![remote_debug_configuration](/help/images/developer-resources/java-remote-debugging/remote_debug_configuration.png)

    1. Press the `Debug` button to start new remote debug session.    
    
