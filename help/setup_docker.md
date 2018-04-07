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

> docker pull dirigiblelabs/dirigible-trial
        
2. Start the container.

> docker run -p 8888:8080 dirigiblelabs/dirigible-trial <&- &

3. Open a web browser and go to:

> http://localhost:8888/

Tomcat Image
---

The same steps can be performed for the standard Tomcat image *dirigible-tomcat*. The default user name and password are *dirigible/dirigible*.
    
Contribution
---

Optionally you can enhance and customize the Dockerfile artifacts from [here](https://github.com/eclipse/dirigible/blob/master/releng/Dockerfile-tomcat).
