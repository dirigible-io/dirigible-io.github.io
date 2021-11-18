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

        === "Tomcat on macOS"

            ```
            ./catalina.sh jpda run`
            ```

        === "Tomcat on Linux"

            ```
            ./catalina.sh jpda run`
            ```

        === "Tomcat on Windows"

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

            Double click on the `Remote Java Application` to create new configuration.
            Update the `host` and `port` properties, if needed.

        ![Remote Java Application Configuration](/help/images/developer-resources/java-remote-debugging/2-remote-java-application-configuration.png)

    1. Press the `Debug` button to start new remote debug session.

=== "IntelliJ IDEA"

    TBD
