---
layout: samples
title: Generate Application from Model
icon: fa-caret-right
group: tutorial
---

{{ page.title }}
===

This tutorial will guide you through the creation of an entity data model and generation of a full-stack Dirigible application, from this model.

# Prerequisites
- Access to the latest version of Eclipse Dirigible (3.2.2+)

# Overview
In this tutorial we will create an entity model of a **car service bookings** and generate full-stack Dirigible application from it. The complete sample can be found [here](https://github.com/dirigiblelabs/sample-v3-car-service-bookings).

# Car Service Bookings

## Setup
1. Create new project **car-service-bookings**
1. Right click -> New -> Entity Data Model
1. Rename **file.edm** to **car-service-bookings.edm**
1. Open **car-service-bookings.edm**

## Brands 

1. _**Drag and drop**_ new entity
    ![Create Entity](/img/samples/tutorials/generate-application-from-model/create-entity.gif){: .img-responsive }
1. Name it _**Brands**_
1. Rename **entityId** to _**Id**_
1. _**Drag and drop**_ new property
    ![Add Property](/img/samples/tutorials/generate-application-from-model/add-property.gif){: .img-responsive }
1. Rename **property2** to _**Name**_
1. Open the properties of the _**Brands**_ entity
1. Open the **General** tab
1. Set the **Type** to _**Primary Entity**_
1. Switch to the **User Interface** tab
1. Set the **Layout Type** to _**Manage Master Entites**_

## Models
1. _**Drag and drop**_ new entity
1. Name it _**Models**_
1. Rename **entityId** to _**Id**_
1. _**Drag and drop**_ new property
1. Rename **property2** to _**Name**_
1. Add new relation between _**Models**_ and _**Brands**_
    ![Add Relation](/img/samples/tutorials/generate-application-from-model/add-relation.gif){: .img-responsive }
1. Rename the relation property in the _**Models**_ entity to _**BrandId**_
1. Open the relation properties
1. Set **Name** to _**Brand**_
1. Set **Relationship Type** to _**Composition**_
1. Set **Relationship Cardinality** to _**one-to-many**_
1. Open the properties of the _**BrandId**_ property
1. Switch to the **User Interface** tab
1. Set **Is Major** to _**Show in form only**_
1. Open the properties of the _**Models**_ entity
1. Open the **General** tab
1. Set the **Type** to _**Dependent Entity**_
1. Swith to the **User Interface** tab
1. Set the **Layout Tab** to _**Manage Details Entities**_

## Cars
1. _**Drag and drop**_ new entity
1. Name it _**Cars**_
1. Rename **entityId** to _**Id**_
1. _**Drag and drop**_ new property
1. Rename **property2** to **PlateNumber**
1. Add new relation between _**Cars**_ and _**Models**_
1. Rename the relation property in the _**Cars**_ entity to _**ModelId**_
1. Open the properties of the _**ModelId**_ property
1. Open the **Data** tab
1. Set the **Data Type** to _**INTEGER**_
1. Switch to the **User Interface**
1. Set **Widget Type** to _**Dropdown**_
1. Set **Label** to _**Model**_
1. Set **Dropdown Key** to _**Id**_
1. Set **Dropdown Value** to _**Name**_
    > _**Note**_: the dropdown **key** and **value** refers respectively to the _**Models:Id**_ and _**Models:Name**_ values

## Generation
1. Save the model
    ![Save Model](/img/samples/tutorials/generate-application-from-model/save-model.gif){: .img-responsive }
1. Right click on _**car-service-bookings.model**_ and select _**Generate**_
1. Set **Template** to _**Full-stack Application (AngularJS)**_
1. Set **Extension** to _**car-service**_
1. Check **Embedded** mode
1. Set **Title** to _**Car Service**_
1. Set **Brand** to _**Car Service**_
1. Click _**Generate**_
1. Publish the project

## Extensibility
Sample view based extension can be found [here](https://github.com/dirigiblelabs/sample-v3-car-service-bookings-extension)

## Wrap up
The whole application can be found [here](https://github.com/dirigiblelabs/sample-v3-car-service-bookings)

# Resources
- Sample Car Service Bookings: [sample-v3-car-service-bookings](https://github.com/dirigiblelabs/sample-v3-car-service-bookings)
- Sample Data: [sample-v3-car-service-bookings-data](https://github.com/dirigiblelabs/sample-v3-car-service-bookings-data)
- Sample Extension: [sample-v3-car-service-bookings-extension](https://github.com/dirigiblelabs/sample-v3-car-service-bookings-extension)

