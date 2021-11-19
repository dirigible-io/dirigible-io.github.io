---
title: Java Remote Debugging
---

Java Remote Debugging
===


Debugging
---

To connect for remote java debugging of Eclipse Dirigible, follow the next steps:

1. Start the Tomcat server in [JPDA (debug)](https://cwiki.apache.org/confluence/display/TOMCAT/Developing#Developing-Debugging) mode:

    !!! example "Run Tomcat in JPDA mode"

        === "on macOS"

            ```
            ./catalina.sh jpda run`
            ```

        === "on Linux"

            ```
            ./catalina.sh jpda run`
            ```

        === "on Windows"

            ```
            catalina.bat jpda run
            ```

        === "Docker Image"

            Run the docker image **with Java Debugging Options** as described [here](/help/setup/docker/).

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

    1. Create new `Debug Configuration from "Edit Configurations.." option`:
    
        ![remote_debug_intellij](https://user-images.githubusercontent.com/20951516/142581815-1f6e18a5-cb8d-430f-a1db-e311fa031a83.png)

    1. Add new `Remote JVM Debug` configuration using "+" sign and double click on `Remote JVM Debug`:
    
        ![new_remote_jvm_debug_configuration](https://user-images.githubusercontent.com/20951516/142582326-bb4490d4-c7bf-442e-9283-420c229c8565.png)
        
    1. Use the configuration provided on the screenshot below, updating the `host` and `port` properties if needed:
    
        ![remote_debug_configuration](https://user-images.githubusercontent.com/20951516/142583056-5e674c95-4519-4302-b883-d137faa85c75.png)

    1. Press the `Debug` button to start new remote debug session.    
    
