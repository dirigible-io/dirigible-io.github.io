---
layout: post
title: "Develop from Mobile for Mobile"
category: blogs
tag: blogs
brief: <h4><a href='blogs/2016/02/05/blogs_develop_from_mobile_for_mobile.html'>Develop from Mobile for Mobile</a></h4> <sub class="post-info">February 05, 2016 by Yordan Pavlov</sub></br>or what will be the next big breakthrough in the way native mobile applications are developed...<br>
---

##Develop from Mobile for Mobile

or what will be the next big breakthrough in the way native mobile applications are developed.

###Innovations
Before starting with the **"Develop from Mobile for Mobile"** topic, let's say few words about the innovations.
There are two types of innovations:

* **Sustaining innovation**
* **Disruptive innovation**

**Sustaining innovation** is innovation that leads to improvement of an existing technology, product or service.
Example of sustaining innovation is the electrical bulb - the evolution from the incandescent bulb to an energy saving bulb and then to the LED bulb. Through that evolution process the function of the electrical bulb didn't change, it became more energy efficient, emitting more light and having longer life. This sustaining innovation improved the existing "bulb business", but didn't create new business opportunities.

The second type of innovations - the **disruptive innovation**, is so powerful that it can develop new markets, re-shape existing ones, create industries that did not exist before and have an enormous effect over the "way the things are done". Examples for innovations of such scale are:

* **Ford model T** - the first serial produced automobile for mass consumption
* **Cellular phones** - Nokia gives to the market the cellular phones that soon replaced the fixed line telephones
* **iPhone** - wipe out the regular cellular phones from the market and open the doors for the smart phones
* **Netflix and iTunes** - drives out of the business most video and audio stores around the globe
* **airbnb and booking.com** - re-shapes the market for the tourist and the hotel industries

Almost all industries and lines of business have suffered disruptive innovations based on software through the last 10 years.

###Overview
It is time to go back to our topic and "Develop from Mobile for Mobile". What do we mean by this and how the native mobile application development is related in the context of the Dirigible? First of all, let's introduce <a href="https://tabrisjs.com/" target="_blank">Tabris.js</a>. It is a mobile framework that allows you to develop native iOS and Android mobile applications, written entirely in JavaScript. This framework is the right choice when native performance, native look and feel and single code-base (JavaScript) is wanted. Last but not least, it is possible to use existing JavaScript libraries and native extensions to extend the core functionality, when needed. 

Unlike other frameworks that use webviews or cross-platform intermediate runtimes, Tabris.js executes the JavaScript directly on the device and renders everything using native widgets. Thanks to the framework capabilities, the developers now can focus more on the mobile application development and less on the platform specifics (iOS and Android).

###Demo

Now let's see how you can **"Develop from Mobile for Mobile"** with Dirigible.

######Prerequisites
* Have installed the tabris mobile client on a iOS or Android device from <a href="https://tabrisjs.com/download" target="_blank">here</a>
* Have account at <a href="tabrisjs.com" target="_blank"> https://tabrisjs.com </a> (not mandatory)
* Have deployed your own instance of Dirigible as described <a href="https://github.com/eclipse/dirigible/blob/master/README.md#get-started" target="_blank">here</a> (not mandatory)

######Steps

1. Launch your own Dirigible instance or use the <a href="http://trial.dirigible.io" target="_blank">free trial</a>.
2. From the home screen click the **"Develop"** tile and then launch the IDE from the **"Web IDE"** tile.

	<br>
		<img src="/img/posts/20160205-0/1-0.png"/>
	<br>

3. Close the **"Get Started"** wizard if you don't have projects in the Dirigible instance.
4. Create new project. **Right click->New->Project**. Give it some name (in the demo, for name is used "tabris"). From the list of available project templates select **"Blank Application"**.
5. Create new **"Hello World"** native mobile application. **Right click on the project->New->Mobile App**. From the list of available templates select **"Tabris.js Hello World"**.

	<br>
		<img src="/img/posts/20160205-0/2-0.png"/>
	<br>

6. Expand your project and navigate to the **"package.json"** file under the **"MobileApplications"** folder. Select the file and open the **"Preview"** tab.
7. Copy from the **"Preview"** tab the URL to the application.

	<br>
		<img src="/img/posts/20160205-0/3-0.png"/>
	<br>

8. (Optional) Login into your <a href="https://tabrisjs.com" target="_blank">https://tabrisjs.com</a> account and select the **"My Scripts"** tab. From there **"Link Script"** that we've created with the Dirigible.

	<br>
		<img src="/img/posts/20160205-0/4-0.png"/>
	<br>

9. Open the **"Tabris.js"** mobile client from your device. If you've linked the script from your tabris.js account, the application can be found under the **"MY SCRIPTS"** tab, if not, then type the URL in the **"URL"** tab.

	<br>
		<img src="/img/posts/20160205-0/5-0.png"/>
	<br>

	<br>
		<img src="/img/posts/20160205-0/6-0.png"/>
	<br>

10. Now let's take the most from the **"In-System Development"** concept and apply it on the native mobile application. Switch back to the Dirigible IDE and update the application.

	<br>
		<img src="/img/posts/20160205-0/7-0.png"/>
	<br>

11. Back to the device, it is time to refresh the content of the application.

	<br>
		<img src="/img/posts/20160205-0/8-0.png"/>
	<br>

12. Whoah, that is a real **"zero time to market"**. The changes were applied immediately and the content of application was updated.

	<br>
		<img src="/img/posts/20160205-0/9-0.png"/>
	<br>

13. But what abot the **"Develop from Mobile for Mobile"** concept and more precisely the first part of the moto **"Develop from Mobile..."**? While you are on the device, luanch the web browser and open the **"Dirigible Registry"** (the home screen). Click on the **"Develop"** tile, on the next page select the **"Light IDE"** and you are ready to go.

	<br>
		<img src="/img/posts/20160205-0/10-0.png"/>
	<br>
	
	<br>
		<img src="/img/posts/20160205-0/11-0.png"/>
	<br>

14. Navigate down to the application sources and apply some changes.

	<br>
		<img src="/img/posts/20160205-0/12-0.png"/>
	<br>

15. Hit the **"Publish"** button, so the applied changes will be available immediately.

	<br>
		<img src="/img/posts/20160205-0/13-0.png"/>
	<br>

16. Convince yourself, that the **"Develop from Mobile for Mobile"** is real, available right now, applicable and easy to use.

	<br>
		<img src="/img/posts/20160205-0/14-0.png"/>
	<br>

###Conclusion

We've seen that a cross platform (iOS and Android) native mobile applications can be developed only with the help of a web browser and nothing more. The integration between <a href="http://www.dirigible.io/" target="_blank">Dirigible</a> and <a href="https://tabrisjs.com" target="_blank">Tabris.js</a> enables the developers to reach all their customers and make changes to the product with a **"zero time to market"** speed.
 
The bottom line is this:
**"By teaching ourselves to look through the lens of the theory to the future, we can actually see the future very clearly!"**

###Additional Resources

<a href="http://www.claytonchristensen.com/key-concepts/" target="_blank">What is a "Disruptive Innovation" by Clayton Christensen</a>

<iframe width="560" height="315" src="https://www.youtube.com/embed/mbPiAzzGap0" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cu6J6taqOSg" frameborder="0" allowfullscreen></iframe>


