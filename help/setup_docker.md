---
layout: help
title: Docker
icon: none
group: help-setup
---

Setup as a {{ page.title }} Image
===


Prerequisites
---

- [Install Docker](https://docs.docker.com/engine/installation/)

Steps
---
      
1. Pull the already built container from *Docker Hub*.

      > ```docker pull dirigiblelabs/dirigible-tomcat:latest```


2. Start the container.

      > ```docker run --name dirigible --rm -p 8080:8080 -p 8081:8081 dirigiblelabs/dirigible-tomcat:latest```

3. Start the container with mounted volume.

      > ```docker run --name dirigible --rm -p 8080:8080 -p 8081:8081 -v <your-local-directory>:/usr/local/tomcat/target dirigiblelabs/dirigible-tomcat:latest```

4. Open a web browser and go to:

      > [http://localhost:8080/](http://localhost:8080/)

      The default user name and password are **_dirigible/dirigible_**.

5. Stop the container.

      > ```docker stop dirigible```

Contribution
---

Optionally you can enhance and customize the Dockerfile artifacts from [here](https://github.com/eclipse/dirigible/blob/master/releng/Dockerfile-tomcat).
