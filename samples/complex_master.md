---
layout: samples
title: Master Repository
icon: fa-caret-right
group: complex
---

{{ page.title }}
===

This sample will guide you how to run an Eclipse Dirigible instance with a pre-defined content. This content is bundled in a Zip file with a specific Repository structure. You can easily get one by exporting the Repository from an existing instance via the Snapshot view (in the Repository perspective).

A sample content file with a single project with a single service you can find at: [repository-snapshot-20180820034353.zip](repository-snapshot-20180820034353.zip).

### Steps

1. Copy the above zip file in a directory e.g. /home/dirigible/master_sample
2. Download (or build and copy) to the same directory the standalone executable **dirigible-desktop-all-XXX.jar**
3. Set the environment variables:

	export DIRIGIBLE_MASTER_REPOSITORY_PROVIDER=zip
	export DIRIGIBLE_MASTER_REPOSITORY_ZIP_LOCATION=/home/dirigible/master_sample/repository-snapshot-20180820034353.zip

4. Run with:

	java -jar dirigible-desktop-all-XXX.jar

5. Enter with the nickname: **dirigible**
6. You should have already available project "my_project" in your workspace, with a service "hello.js"
7. The service is even published already, so you can directly execute it by access the location:

	http://localhost:8080/services/v3/js/my_project/hello.js
	
> Note: The is the simplest way (from life-cycle management PoV) to run an Eclipse Dirigible application. For the master repository you can use a Zip file (as it is shown above), File System based Repository located by a Path to its root folder or Jar file built into or accessible by the default class loader.

