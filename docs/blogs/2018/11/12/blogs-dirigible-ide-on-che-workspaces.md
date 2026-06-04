---
title: Running Dirigible on Che Workspaces
author: Nedelcho Delchev
author_gh_user: delchev
author_avatar: https://avatars.githubusercontent.com/u/6852373?v=4
read_time: 10 min
publish_date: November 12, 2018
---


#### Eclipse Cloud Development - ONE team, ONE product

> What is Eclipse Cloud Development (ECD) and why should I consider it?

[ECD](https://www.eclipse.org/ecd/) is a Top-Level Project (TLP) at Eclipse Foundation that provides open-source implementations of standards, services and frameworks that enable developing for and in the Cloud.

If you read the definition from the home page, you will be misled that this is a single product or at least a bunch of projects that are complementary to each other and can run simultaneously.
That was not exactly true for several years, since the beginning of the ECD initiative itself. Apart from Flux, which was a collaboration development middleware framework, there were actually three major full-stack development platforms - Orion, Che and Dirigible, each of them with its own Web IDE and own backend. They were just three fancy vehicles parked in a special place in front of the Eclipse Foundation house. Each of them was built for its own purpose and based on its own technology stack, without so much care about the others. Good start - there was quite a big room for improvement. I remember the invaluable initial discussions we had in San Francisco more than three years ago. We tried to understand each other, which are the scenarios we want to cover, how to integrate them and how exactly to respond to the community, which required from us ONE single offering for their Cloud development needs.

<img src="/img/posts/20181108/ecd_team.jpg" width="60%" title="ECD Team"/>

The plan was just roughly defined, but all of us were eager to go for it and to collaborate much closely.

Time has passed, many things have changed. The projects matured by passing several reimplementation phases, clarified the goals and strategies, some acquisitions happened, new players appeared and even one was retired. Still, nobody has seen a prominent path forward for a much deeper integration.

> Until now!

#### Eclipse Che as a center of gravity for Cloud development environments

In the last few months Che guys were working hard on the new approach for workspaces management for the 7.0 release. One of the major changes is that now they allow contributions not only for IDE plugins, but also for whole Web IDE stacks as separate Docker containers. This helped them to retire the old-fashioned GWT based Web IDE and replace it with the modern Monaco based one - Theia. This also gives an opportunity for other development platforms, leveraging different development models and covering different development scenarios to land on the Che planet as well. This was seen by all of us as a great opportunity to finally start a new age of integration, which can lead to a real consolidation of tools, models, and efforts.

#### Dirigible as a Che editor plugin

Following the new extensibility concept, first we had to create a plugin descriptor for Dirigible. It contains the metadata about the content you want to contribute - name, description, Docker image identifier, environment variables, etc.

```yml
version: 1.0.0
type: Che Editor
name: eclipse-dirigible
id: org.eclipse.che.editor.dirigible
title: Eclipse Dirigible as Editor for Eclipse Che
description: Eclipse Dirigible as Editor for Eclipse Che
icon: http://download.eclipse.org/dirigible/dirigible.png
endpoints:
 -  name: "dirigible"
    public: true
    targetPort: 8080
    attributes:
      protocol: http
      type: ide
containers:
 - name: eclipse-dirigible
   image: dirigiblelabs/dirigible-anonymous
   env:
       - name: DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER
         value: /projects/dirigible/repository
       - name: DIRIGIBLE_REPOSITORY_LOCAL_ROOT_FOLDER_IS_ABSOLUTE
         value: true
       - name: DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER
         value: /projects/dirigible/repository
       - name: DIRIGIBLE_REPOSITORY_SEARCH_ROOT_FOLDER_IS_ABSOLUTE
         value: true
       - name: DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER
         value: /projects/dirigible/cms
       - name: DIRIGIBLE_CMS_INTERNAL_ROOT_FOLDER_IS_ABSOLUTE
         value: true
       - name: DIRIGIBLE_DATABASE_H2_ROOT_FOLDER_DEFAULT
         value: /projects/dirigible/h2
       - name: DIRIGIBLE_DATABASE_H2_URL
         value: jdbc:h2:/projects/dirigible/h2
       - name: DIRIGIBLE_OPERATIONS_LOGS_ROOT_FOLDER_DEFAULT
         value: /usr/local/tomcat/logs
   volumes:
       - mountPath: "/projects"
         name: projects
   ports:
       - exposedPort: 8080
   memory-limit: "512M"
```

The GitHub repository containing the project is at: [https://github.com/dirigiblelabs/dirigible-che-editor-plugin](https://github.com/dirigiblelabs/dirigible-che-editor-plugin)

Because the development environment is secured by OpenShift underneath, we use here the **dirigiblelabs/dirigible-anonymous** Docker image of Dirigible. Environment variables mainly redirect the file system dependent components of Dirigible to use the default **/projects** persistent folder.

We made several experiments with different sets of configurations, which we activated on the local Che registry by using the **publish_plugin** command.

> publish_plugin dirigible-che-editor-plugin 1.0.0 che

Once we agreed how the first version of the plugin should look like, we had to add our plugin definition to the official Che registry metadata to be available by default on any standard Che environment. The process says we have to make a PR to the repository: [https://github.com/eclipse/che-plugin-registry](https://github.com/eclipse/che-plugin-registry). The actual PR is: [https://github.com/eclipse/che-plugin-registry/pull/54](https://github.com/eclipse/che-plugin-registry/pull/54)

What it does is adding the metadata of the given plugin under a predefined folder structure of the Che registry:

```
id: org.eclipse.che.editor.dirigible
version: 1.0.0
type: Che Editor
name: dirigible-che-editor-plugin
title: Eclipse Dirigible for Eclipse Che
description: Eclipse Dirigible as App Development Platform for Eclipse Che
icon: https://www.dirigible.io/img/logo/dirigible-logo.png
url: https://github.com/dirigiblelabs/dirigible-che-editor-plugin/releases/download/1.0.0/dirigible-che-editor-plugin.tar.gz
```

The document with all the needed steps presented by Gorkem and Florent at EclipseCon Europe 2018 can be found at: [https://docs.google.com/document/d/1hFXTwzIU3MnqcciXH9E7xyUtEJRUeUuJ-e0JlEhTKjo/edit](https://docs.google.com/document/d/1hFXTwzIU3MnqcciXH9E7xyUtEJRUeUuJ-e0JlEhTKjo/edit)

#### Start Dirigible based workspace in Che

Since the beginning of this week you can go on the public Che environment on the OpenShift platform at: [https://che.openshift.io/dashboard/#/workspaces](https://che.openshift.io/dashboard/#/workspaces) and create a new workspace. In the configurations wizard, choose **Che 7 dev** stack and **dirigible-che-editor-plugin**.

<img src="/img/posts/20181108/dirigible_on_che_config.png" width="70%" title="Dirigible on Che"/>

Click the "Create" button and wait until the workspace gets created.

<img src="/img/posts/20181108/dirigible_on_che_welcome.png" width="70%" title="Dirigible on Che - Welcome"/>

> Note: You may need to wait a bit more the first time for Dirigible to get initialized, then refresh the browser.

#### What is the benefit of running Dirigible on Che

Now, there are two more options for running Dirigible - on the OpenShift Cloud platform and on the Eclipse Che workspace management platform.

<img src="/img/posts/20181108/dirigible_on_che_layers.png" width="70%" title="Dirigible on Che"/>

So, what are the benefits then to run Dirigible on Che?

 - First of all, you get a holistic experience on your development process. Che is the basis, where all the different frameworks, languages and tools complement each other to cover the maximum set of requirements for building your next generation Cloud services. We have to be really honest with ourselves here - in Dirigible it is quite unlikely that we build C/C++ tooling, for instance. This doesn't fit our goals and vision about high-productivity development of business applications. But, also we have to admit that somebody might need such a low-level component written in C/C++ for e.g. integration purposes. Thanks to this variety of options in Che now (and even more in the future), the developer doesn't need to go out to some external environments for such cases.
 - Second, you have the ability to run Dirigible on any platform where Che is deployed. It includes the front runner OpenShift platform as well as some other commercial and enterprise-grade Cloud platforms. This opens to the huge Che community all the scenarios for business applications development such as model-driven approach, business-process and in-system programming models and all the rest coming with Dirigible.
 - Last but not least, it is crucial for us to organize the efforts spent on the Cloud development topics under Eclipse Foundation in a much better way. Nobody has unlimited resources to solve the infinite numbers of challenges that we are currently facing. It will not be easy, but I am sure:
 
 > together we can do it!
 
 









