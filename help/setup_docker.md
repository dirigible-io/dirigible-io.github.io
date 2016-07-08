---
layout: help
title: Docker
icon: fa-cogs
group: help-setup
---

Docker Image
===


Prerequisites
---

- [Install Docker](https://docs.docker.com/engine/installation/)

Steps
---
      
1. Pull the already built container from `Quay.io`.

        docker pull quay.io/delchevn/dirigible223
        
2. Start the container.

        docker run -p 8888:8080 -p quay.io/delchevn/dirigible223

3. Open a web browser and go to:

        http://[docker container ip]:8888/
        
4. (Optional) Enhance and customize the Dockerfile from [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/releng/docker/Dockerfile).
