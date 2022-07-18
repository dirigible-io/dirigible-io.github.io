---
title: Docker
---

Setup as a Docker Image
===


Deploy Eclipse Dirigible in Docker.
    
!!! info "Prerequisites"
    Install [Docker](https://docs.docker.com/engine/installation/).


## Steps
---

1. Pull the Dirigible Docker image:

    ```
    docker pull dirigiblelabs/dirigible-all:latest
    ```

1. Start the container:

    === "Run"

        ```
        docker run --name dirigible \
        --rm -p 8080:8080 -p 8081:8081 \
        dirigiblelabs/dirigible-all:latest
        ```

    === "with Mounted Volume"

        ```
        docker run --name dirigible \
        -v <your-local-directory>:/usr/local/tomcat/target \
        --rm -p 8080:8080 -p 8081:8081 \
        dirigiblelabs/dirigible-all:latest
        ```

    === "with Environment Configurations"

        ```
        docker run --name dirigible \
        -e DIRIGIBLE_BRANDING_NAME="My Web IDE" \
        -e DIRIGIBLE_BRANDING_BRAND="WebIDE" \
        -e DIRIGIBLE_BRANDING_BRAND_URL="https://www.eclipse.org" \
        -e DIRIGIBLE_THEME_DEFAULT="fiori" \
        --rm -p 8080:8080 -p 8081:8081 \
        dirigiblelabs/dirigible-all:latest
        ```

        !!! note
            The complete list of Dirigible environment variables could be found [here](/help/setup/setup-environment-variables/).

    === "with Java Debugging Options"

        ```
        docker run --name dirigible \
        -e JPDA_ADDRESS=0.0.0.0:8000 \
        -e JPDA_TRANSPORT=dt_socket \
        --rm -p 8000:8000 -p 8080:8080 -p 8081:8081 \
        dirigiblelabs/dirigible-all:latest
        ```

    !!! tip "Eclipse Dirigible versions"
        Instead of using the `latest` tag (version), for production and development use cases it is recomended to use a stable release version:
        
        - All released versions can be found [here](https://github.com/eclipse/dirigible/releases/).
        - All Eclipse Dirigible Docker images and tags (versions) can be found [here](https://hub.docker.com/u/dirigiblelabs).


1. Open a web browser and go to: [http://localhost:8080/](http://localhost:8080/)

    !!! Note
        The default user name and password are **`dirigible/dirigible`**

1. Stop the container:

    ```
    docker stop dirigible
    ```

!!! example "Contribution"
    Optionally, you can enhance and customize the Dockerfile artifacts from [here](https://github.com/eclipse/dirigible/blob/master/releng/Dockerfile-tomcat), or any of the other Docker releases:

    - [anonymous-all](https://github.com/eclipse/dirigible/blob/master/releng/anonymous-all/)
    - [anonymous-runtime](https://github.com/eclipse/dirigible/tree/master/releng/anonymous-runtime)
    - [openshift-all](https://github.com/eclipse/dirigible/tree/master/releng/openshift-all)
    - [sap-cf-all](https://github.com/eclipse/dirigible/tree/master/releng/sap-cf-all)
    - [sap-cf-runtime](https://github.com/eclipse/dirigible/tree/master/releng/sap-cf-runtime)
    - [sap-kyma-all](https://github.com/eclipse/dirigible/tree/master/releng/sap-kyma-all)
    - [sap-kyma-runtime](https://github.com/eclipse/dirigible/tree/master/releng/sap-kyma-runtime)
    - [server-all](https://github.com/eclipse/dirigible/tree/master/releng/server-all)
    - [server-runtime](https://github.com/eclipse/dirigible/tree/master/releng/server-runtime)
    - [server-keycloak-all](https://github.com/eclipse/dirigible/tree/master/releng/server-keycloak-all)
    - [server-runtime-keycloak](https://github.com/eclipse/dirigible/tree/master/releng/server-runtime-keycloak)
    - [trial-all](https://github.com/eclipse/dirigible/tree/master/releng/trial-all)

    _**Note:** Most of the packages contains two files: `Dockerfile-base` and `Dockerfile`. Usually you would want to extend the `Dockerfile`, except in some special cases._
