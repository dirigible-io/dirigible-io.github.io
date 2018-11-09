---
title: Make Low-Code/No-Code Platforms Great Again!
author: nedelcho.delchev
---


#### Buy Application or Build Application

It's been a fundamental question for Enterprises and SMEs over the last few decades. Can you save money by buying a packaged software, which follows the best practices and does exactly what you need or is this just an imaginary dream? Obviously, there is no single answer to this simple question. Usually, companies still stick to the packaged ready-to-use solutions coming from well-established software vendors for their core business processes, but at the same time open the door for in-house LoB applications built by their own IT staff or a partner. While the first one gives them stability for the mainstream business, the latter gives them an innovation power to cover the brand new yet differentiating business models. Sounds reasonable and pragmatic, no chief executive will be fired by following this strategy. Let's leave aside the packaged software case with its configurability, customization and extensibility strengths for another blog post and focus now on the build-your-own-application scenario.

#### What does "build" mean for a company, which doesn't have an IT background?

There are several options here - you can hire and manage your own developers, contact partners, use freelancers ... All these options have their pros and cons. What happens in reality is that most companies just go for all of them at the same time to minimize the risks. On one hand, this leads very easily to a situation, where the company has its own staff that has to gain technological know-how for the projects and try to control the development processes, time frames and feature sets. On the other hand, there are partners that offer developer manpower, but in fact they strive for maximum execution time i.e. budget, claiming the highest possible quality at the lowest possible cost. Depending on the complexity of the project and the technology stack, the negotiations can be very hard for everyone in that round and the outcome always results in a - **wrong estimation**. The good thing here is that nobody actually expects that the estimation will be precise, so why are we wasting time in useless activities?

#### Can we build the application directly instead of making estimations?

Here comes the Low-Code/No-Code hype. Also, the reborn hype related to BPM. Also, the reborn hype for MDA and RAD. Are they just the next wave of cool stuff that soon will be just a record in software history without a meaningful impact? Only time will tell. What is different nowadays that can lead to a massive usage of high productivity tools for building tailored applications?

* It is unlikely that there will be a new vendor of packaged software, who can build everything for everybody - it's an unrealistic huge investment
* The companies no more stop at the stage where they just follow the standard best practices for their industry - they need to be innovative to survive
* Cloud infrastructure is already matured enough at a level where one can use it to run a high-scale SaaS solution entirely based on the Cloud
* Old-fashioned software technologies do not fit well with the new infrastructure and quality requirements
* Transparency (and the ability to prove it) of the whole lifecycle of the business software development is already a must - not a nice-to-have feature

and

* Time-to-market is the most important goal when applying a new business model - nobody can wait months and years for its implementation

All abovementioned reasons, make the Low-Code/No-Code tools and even whole development platforms to rise again. This time in the Cloud - instantly accessible via a Web interface. They will fight for a multibillion business segment in the next few years, hence their business case looks promising. There is just a small problem - all of them are quite expensive for the SMBs, even for enterprises, although they have better ROI, TCD and TCO metrics than the standard development models. And there is a reason for this. The business scenarios are usually complex; hence somebody has to invest a fairly large amount of effort to build a solution. If it is not paid by the customer for the development, then it is paid by the platform vendor for building RAD tools, providing robust middleware, giving great monitoring and operations tools. Then the customer pays for the platform more and less for the development on this platform. It is quite simple and fair, isn't it?

What exactly does such a platform provide? Is there an open-source alternative?

#### BPM or MDA?

There are two major approaches at the moment - Business-Process-Model driven tools and platforms and those who rely on the Model-Driven-Architecture concepts. While the first one gives extremely fast and exhaustive implementation of the workflows including automated and user interactive tasks, the second one is focused on the definition of the domain model (or similar) and generation of the backbone of an application - mainly with CRUD support. So, following both approaches you can cover both -  the structure and the behavior aspects for a given business scenario. 

What did we decide to provide in Dirigible? As you can guess, following our principle to cover the full development lifecycle end-to-end, the decision was simple - to provide both... and more.

We managed to integrate the world's leading BPM engine - [Flowable](http://www.flowable.org) along with the browser-based BPMN 2.0 modeler. Now, you can create a business model on-the-fly on the live system and even to implement the steps in the same way using our famous [Enterprise JavaScript API](http://www.dirigible.io/api). More information about how to create a simple process you can find under the [samples section](http://www.dirigible.io/samples/complex_process_console.html).

<img src="/img/posts/20181107/bpmn_modeler.jpg" width="70%" title="Flowable BPMN Modeler"/>

For the second stream, we decided to follow the Entity-Data-Model approach, where all the information needed for the generation process is included in a single artifact. Now, you can visually drag-and-drop the entities representing your domain model as well as to set the parameters in separated spaces e.g. General, Database, User Interface. Then, you can choose one of the provided generation templates and build a whole business application including the whole database layout, RESTful backend services, CRUD forms, reports and even a launchpad home page. This one is very useful for administrative or simple internal LoB applications. For more sophisticated user interfaces, for instance, you can use the already available (during the generation) extension points. To try it by yourself, you can just follow the steps in this [tutorial](http://www.dirigible.io/samples/tutorial_generate_application_from_model.html).

<img src="/img/posts/20181107/edm_modeler.png" width="70%" title="Entity Data Modeler"/>

For the complementary features with regards to collaborative development, issue tracking, requirements and project management, validation and verification of the releases and even design-thinking tools, we mainly integrate GitHub, TravisCI, Docker, and some other Cloud-based third-party development services as well.

#### Does it mean that Dirigible is a full-fledged Low-Code/No-Code platform?

No. It is an open-source project providing lots of features covering variety of scenarios in this space, but it is not a product.

#### - Can I consider building a real productive Low-Code/No-Code platform based on Dirigible?

> Definitely - YES!


