---
layout: help
title: Publishing
icon: none
group: help-concepts
---

{{ page.title }}
===

There is a conceptual separation between design-time and runtime phases of the development life cycle.
During the design-time phase, the source artifacts are created and managed within the isolated developer's area - [workspace](concepts_workspace.html).
When you are ready with a given feature, you have to publish the project so that the application artifacts become available for the other users. 

The meaning of "available" depends on the type of artifact. For example, for scripting services this is the registration of a public endpoint, while for web and wiki content, it is just the access to the artifacts them self, etc.

Publishing action is accessible from the context menu in the `Workspace` view.

The space within the *repository*, where all the public artifact are placed, is called *registry*.

