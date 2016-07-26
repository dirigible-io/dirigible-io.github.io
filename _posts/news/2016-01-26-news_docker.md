---
layout: post
title: "Docker image for Dirigible"
category: news
tag: news
---
Docker image for Dirigible is created ... finally.

Dockerfile can be found [here](https://github.com/eclipse/dirigible/blob/master/org.eclipse.dirigible/org.eclipse.dirigible.parent/releng/docker/Dockerfile).

Ready to use image supported by [Quay.io](http://quay.io) can be used as follows:

	docker pull quay.io/delchevn/dirigible223

	docker run -p 8888:8080 -p quay.io/delchevn/dirigible223

###### Resources

[Installation](https://docs.docker.com/engine/installation/)
[Builder](https://docs.docker.com/engine/reference/builder/)

#### Enjoy!
