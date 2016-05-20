---
layout: post
title: "Docker image for Dirigible"
category: news
tag: news
brief: <h4><a href='news/2016/01/26/news_docker.html'>Docker image for Dirigible</a></h4> <sub class="post-info">January 26, 2016</sub><br> Docker container descriptor and built image...<br>
---

### Docker image for Dirigible

<sub class="post-info">January 26, 2016</sub>
	
Docker image for Dirigible is created ... finally.

Dockerfile can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/releng/docker/Dockerfile).

Ready to use image supported by [Quay.io](http://quay.io) can be used as follows:

	docker pull quay.io/delchevn/dirigible223
	
	docker run -p 8888:8080 -p quay.io/delchevn/dirigible223

###### Resources

[https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

#### Enjoy!
