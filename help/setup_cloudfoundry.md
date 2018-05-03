---
layout: help
title: Cloud Foundry
icon: none
group: help-setup
---

Setup on {{ page.title }}
===


You can deploy Tomcat based WAR files, for example *dirigible.war*, produced during the build on any Cloud Platform supporting Cloud Foundry.

Prerequisites
---

- [Cloud Foundry Command Line Interface](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)

Steps
---

1. Login to the Cloud Foundry Platform with:

> cf login -a [CloudFoundry Platform Host]

2. Deploy on the Cloud Platform supporting Cloud Foundry with:

> cf push dirigible -p [path to the target directory]/dirigible.war -b https://github.com/dirigible-io/java-buildpack

3. Open a web browser and go to:

> http://dirigible.[CloudFoundry Platform Host]/

4. Login with user *dirigible* and password *dirigible*, which are set by default in the custom buildpack used above.
