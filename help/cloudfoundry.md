---
layout: help
title: CloudFoundry
icon: fa-cogs
group: help-setup
---

Setup on CloudFoundry
===


#### CloudFoundry

##### Prerequisites

- [CloudFoundry Cli](http://docs.cloudfoundry.org/devguide/installcf/install-go-cli.html)

##### Steps

1. Login to CloudFoundry Platform with:

		cf login -a [CloudFoundry Platform Host]

2. Deploy on the CloudFoundry supported Cloud Platform with:

		cf push dirigible -p [path to the target directory]/dirigible-all-tomcat-xxx.war -b https://github.com/dirigible-io/java-buildpack

3. Open a web browser and go to:

        http://dirigible.[CloudFoundry Platform Host]/

4. Login with user `dirigible` and password `dirigible` which are set by default in the custom buildpack used above.
