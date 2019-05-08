---
title: You Don't Need Abs to Model Apps
author: dragomir.anachkov
---

Two of the coolest additions in version 3.x of Eclipse Dirigible are without a doubt the Entity Data Modeler (EDM) and the Business Process Modeler (BPM). They take the concept of model-driven architecture to the next level. What the “hack” does that mean, you’d probably say?

With the fast pace of technological evolution (Cloud Computing, AI, IoT, etc.), application developers face a common problem – how to develop proof of concepts as quickly as possible, and to receive early feedback from customers. Dirigible provides you with the opportunity to use In-System and Rapid application development techniques such as code generation, EDM, BPM, and Enterprise JavaScript APIs.

The Entity Data Modeler plays a huge role in model-driven development.

![Entity-Data-Model](/img/posts/20181205/entity-data-model.png){: .img-responsive }

It allows developers to create application prototypes based on linked entities. These entities can be Books, Stores, Currencies, Categories, among others. Everything that your customers may ever need. Every single one of these entities has its own unique identifier (ID), along with any other set of unique properties you’d like to assign to these entities. They are stored in database tables and you can interconnect them to make your business application come true.

To develop business applications, you need persistency, RESTful services, and a user interface with CRUD operations to create, edit, delete, and list entities. There are predefined templates that help you generate your application from the model, so you don’t have to start the development process from scratch. Based on the model you’ve come up with, you can then generate your full-stack application:

![Admin-UI](/img/posts/20181205/admin-ui.png){: .img-responsive }

Awesome, isn’t it?

But… that’s just a set of well-organized CRUD views integrated into an Admin UI, which was generated from the EDM. Sure, the Entity Data Modeler can help me join the dots between all app entities, but how can I develop a more complex feature in the app itself? What about building a marketplace, or a feedback system, or a service request system for customers to use?

Of course, you can build applications with separate data, logic, and presentation layers. These layers can reuse parts of the admin functionalities. For example, here is a bookshop marketplace that consumes several services from the admin application:

![Welcome-To-Bookstore](/img/posts/20181205/welcome-to-bookstore.png){: .img-responsive }

That sounds great, but behind every enterprise solution, there must be a set of very complex business processes and models. Is there a way to develop this type of processes with Dirigible or even reuse already existing Activiti/Flowable processes? Sure, you can! All this is possible thanks to the Business Process Modeler.

Eclipse Dirigible has an integrated BPM engine based on Flowable. This engine lets you define or reuse your business processes by adding service tasks and flows. These tasks enhance your business solution and will truly make your application enterprise-ready. What does that mean exactly, you'd say? Let's take a brief look at the following example:

![BPM-PoD](/img/posts/20181205/bpm-pod.png){: .img-responsive }

This is what the flow of a Print on Demand business process looks like at the background in the Eclipse Dirigible Web IDE. Meanwhile, here is an example for a custom-built view that lets users purchase their books on demand:

![BPM-PoD-UI](/img/posts/20181205/bpm-pod-ui.png){: .img-responsive }

By the way, this Print on Demand view is integrated in the marketplace thanks to the lightweight extensibility concept built in Dirigible. See [Dirigible - Extend, Embed, Reuse](http://www.dirigible.io/blogs/2018/11/09/dirigible_extend_embed_reuse.html).

Right now, if there was a book on developing business applications with the Eclipse Dirigible Web IDE, I’d be the first one to purchase it. While I’m waiting though, I’ll keep on exploring the ins and outs of this cool basket of modern tools for developers of business applications. The EDM and the BPM tools are just the beginning, I’m sure of it!

# Resources

Experiment with the **single-click deployment** of the following demos from **EclipseCon 2018**:

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-edm.git&uri=/services/v3/web/bookshop-admin/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop%20Marketplace-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-complex.git&uri=/services/v3/web/bookshop/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-edm-complex))

1. [![Run on Dirigible](https://img.shields.io/badge/Run%20on%20Dirigible-Bookshop%20Print%20on%20Demand-blue.svg)](http://dirigible.eclipse.org/services/v3/web/ide-deploy-manager/index.html?repository=https://github.com/dirigiblelabs/demo-eclipsecon2018-bpm.git&uri=/services/v3/web/bookshop/) ([GitHub](https://github.com/dirigiblelabs/demo-eclipsecon2018-bpm))
