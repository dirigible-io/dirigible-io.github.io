---
title: "Summer Practice in SAP"
author: viktor.marinov
---

My name is Viktor and in the past two weeks, I took part in the Summer Student Practice in SAP Labs Bulgaria, which brought together IT students from different Bulgarian universities: Sofia University “St. Kliment Ohridski”, Technical University – Sofia, University of Plovdiv "Paisii Hilendarski" and others. Within two weeks we, the participants, had the opportunity to expand our knowledge about modern IT topics and learn from professionals how to develop software – both theoretically and practically. Volunteers from SAP shared with us their professional experience in software architecture and design.

During the first few days the schedule included lectures and theoretical introduction to the most “hot” technology trends, methodologies and principles of project management, user experience, prototyping, documentation, maintenance and lifecycle of software products. Then, based on everyone’s personal preferences, we were divided into teams. Each team, with the help of a mentor, had to prepare a practical project, based on the acquired knowledge, and present it on the last day. The Eclipse Dirigible platform grabbed my attention and I wanted to try it out. I was a part of a team of five: Vili, Boris, Desi, Svilen, and I.

![Storky - The team in the beginning](/img/posts/20160817/team-in-the-beginning.png){: .img-responsive }
Here are we in the beginning - designing the application.
And here are some words about the team project from each of us:

### Viktor:

We had to develop a project using Eclipse Dirigible and we got the idea to make a “travel guide” application.
The plan was to gather everything you need to plan your trip in one place. We wanted every part of the application to be independent so we decided to use microservices architecture. When we saw what Eclipse Dirigible offers, we knew that it would be perfect for our needs. It turned out that it’s really easy to make RESTful services in Eclipse Dirigible in just a few minutes, so we had enough time to focus on the implementation details.

Each of us worked on a different part of the project, with its own user interface, and in the end we merged them together. My contribution to the project were two of those microservices: one for user profiles and one for finding hotels by given destinations and booking hotel rooms. 

Eclipse Dirigible helped me a lot with generating the user interface for the hotels service based on the AngularJS Framework. With just a little modification and coding, I managed to make a good looking and responsive web page. Now users can filter the hotels by different criteria, search for them on the map, check the available rooms and reserve them.

![Hotels - Main page](/img/posts/20160817/hotels-1.png){: .img-responsive }

### Vili:

Working in a team of young, educated and ambitious people is  such a precious experience to me.
We put our hearts and minds in this project. We had a week to work on this application that helps all the people out there to organize the desired trip.
The design pattern we applied on this application is MVC. When it comes to data, we used JQuery Ajax requests and REST services. 
Furthermore, a great advantage of the Eclipse
Dirigible, the platform we used, is its ability to generate automatically REST services depending on the built model. 

As all other developing platforms, Eclipse Dirigible has its own advantages and disadvantages. However, the 'crew' behind the idea puts every effort to fix the bugs. Hence, it's up to you to try and feel the adventure of Eclipse Dirigible!

### Desi:

When you want to develop your application as fast as you can, Eclipse Dirigible helps you to concentrate on your business logic.
Also, the auto-generated CRUD operations can help you out if you’re not really sure how things are done in the back-end. The generated user interface is the best thing for people who don't like to deal with front-end.

Being part of this project also introduced me to AngularJS and the MVC style. 
My part was to implement an Events service where you can find different types of events near a specified location or create your own public event.

### Svilen:

Our two weeks of practice in SAP were very intriguing. We had a couple of lectures and a team project. Our team of five had to develop a WEB Appliaction by our own idea using the Eclipse Dirigible platform. We’ve decided to create the app based on independent micro-services. I took part by creating a small service about transports - (Storky Transports Web Page). Our project is based on the MVC design pattern thanks to AngularJS. My application has two own entities in the database, one for Tickets, and one for Transports and one master entity about Cities and their airports. The data is being transfered by HTTP and REST. From my application you can choose your type of travel, city of departure, city of arrival and date.

![Transport - Main page](/img/posts/20160817/transport-1.png){: .img-responsive }

To create the RESTful API I used Eclipse Dirigible's automated scripting services for each of the entities from my database. Thanks to that, whatever the operation, I receive/pass the data in JSON format and easily can import it in my view with angular. After you choose the type of travel, an angular controller sends GET request to the server and only cities that have transport to or from are being displayed. The "Search" button has attached function from other angular controller that serves the tickets entity. The function sends another GET request, this time to a service of database view, filters the cities in the back-end and returns them again in JSON. The controller imports them as a view in the HTML and you can sort them by price or class thanks to angular. That's all.

### Boris:

My part of the application is divided into two similar parts:
* **Entertainments**:

When from another page (“Welcome”, “Transport”, “Events”, “Hotels” or “Sightseeings”) is being navigated to Entertainments, the name of the destination is automatically put into the textbox bellow the “Destination” label. The Entertainments, that are near this city are filtered and are shown together with their entertainment type and category, rating, additional information and destination.

![Entertainments - Filtered](/img/posts/20160817/entertainments-1.png){: .img-responsive }

The user may, however, delete the name of destination and see all of the entertainments in the database:

![Entertainments - Main page](/img/posts/20160817/entertainments-2.png){: .img-responsive }

With the help of the buttons “First”, “Previous”, ”Next”, ”Last” the user may navigate through all of the entertainments if they are too many.

* **Sightseeings**:

![Sightseeings - Filtered](/img/posts/20160817/sightseeings-1.png){: .img-responsive }

![Sightseeings - Main page](/img/posts/20160817/sightseeings-2.png){: .img-responsive }

# Summary

I found it really easy to develop using  Eclipse Dirigible. It provides everything I needed – from database modeling and management, through RESTful services, to user interface generation. It was the perfect platform.

I would say that the Summer Student Practice was a great success. We had a nearly finished the project in just a few days, with a platform we never used before, and in the end everyone had learned something new. Our project got second place in the rank list.

Here are we after the presentation.
![Storky - The team in the end](/img/posts/20160817/team-in-the-end.jpg){: .img-responsive }
