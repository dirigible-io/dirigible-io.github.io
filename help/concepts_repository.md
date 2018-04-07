---
layout: help
title: Repository
icon: none
group: help-concepts
---

{{ page.title }}
===

The **Repository** component is the main place where all the project's artifacts are stored. It provides an abstract file-system like structure with folder and files, which can be backed by different underlying persistence storages - file-system, relational database, noSQL database, etc.

In a single Repository instance there are several spaces holding different types of content - users' workspaces, public [registry](concepts_registry.html), search indices, git meta-data, versions, etc.
