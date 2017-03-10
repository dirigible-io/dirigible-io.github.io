---
title: "Integration of Third-Party JavaScript Libraries in Dirigible"
author: georgi.pavlov
---

Integrating new test frameworks in Dirigible presented some challenges that I will explore in this blog. They can serve as a "watch-out list" in the process of integrating any third-party libraries in Dirigible in future.   

Integration of Third-Party JavaScript Libraries in Dirigible
----

In the last months I integrated (or tried to integrate) a number of third-party libraries to make them available to the server-side of the platform.

### License

Before you start your integration efforts, which may turn out significant, make sure you are license compatible or can get along with the library author on the subject. That will spare you a lot of wasted time eventually. As you will see below sometimes the only way to integrate a third party library is to make some changes in its original code and you should ensure that you are on the safe side license-wise to do that.  

### CommonJS

CommonJS is designed as a common, standard module loading system, which is a fair attempt when there are some many yet so similar out there already. The downside of standards that are driven not by urgent and inevitable but nice, yet not critical needs is that people implement it with low priority, when they can and to the extent they feel they absolutely need to.   

Dirigible's scripting runtime ([Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino)) supports [CommonJS](http://www.commonjs.org) as module management systems. However, you should keep in mind that it is not entirely comparable to the same in [NodeJS](https://nodejs.org). So not every single NodeJS module out there is directly transferable in Dirigible as it is as far as module dependencies are concerned. I am referring to NodeJS here as a platform with pretty rich set of modules that would be beneficial for other CommonJS platforms too, but the principle is the same for any CommonJS-enabled library too. 

**Lesson learned:** Explore the dependencies of the library you try to integrate, how they are loaded and assess if Rhino can support that. Chances are that you may need to modify the library's loading mechanism and introduce its dependencies as Dirigible modules too.     

### ECMAScript 2015 (ES6)

[ES6](http://www.ecma-international.org/publications/standards/Ecma-262.htm) introduces a great deal of improvements to JavaScript for good. In fact, they are sometimes so significant that applications and platforms can hardly catch up. For example, Dirigible's JavaScript runtime environment Rhino is ECMAScript 5 compliant and that's quite unfortunate when you need to integrate a great third party library that is pushing ES6 JavaScript to the edge (as they all should). There are translation engines ([Babel](https://babeljs.io)) that are actually trying to fill this gap, but I had problems integrating Babel itself so for now it's not coming to the rescue. The point is that if you have e.g. Symbol in your library code you are likely lost. Sometimes there are useful polifills though so  don;t rush to give up.

**Lesson learned:** Check the JavaScript standard compliance of the third-party library. Look for Symbol or something else that's specific to ES6 if unsure.

### Type checks

Type checks can be tricky in Rhino and not behave entirely as you might expect.
For example, neither of the expressions below will evaluate to true in Rhino.

```javascript
Object.prototype.toString.apply(function(){}) === '[object Function]';
Object.prototype.toString.apply((function(){})()) === '[object Function]';
Object.prototype.toString.apply(new Function()) === '[object Function]';
```

However, in Chrome for example it most certainly will. Unfortunately, the trick to use toString for type checks is quite common as it seems and eventually you may hit this problem. The fix is luckily trivial, and is to use something more conventional such as: typeof target === 'function', but it will certainly require that you modify the library code. And this son its own requires that the third-party code licenses you for such modifications. So take care to check beforehand.

**Lesson learned:** Look for use of Object.prototype.toString.apply for type checks and modify accordingly (if possible)

### No globals for you

Well written libraries will not tightly rely that they are executed in a browser and make it up for in browser-less environments. That includes global objects and functions. But you will find none of these in Rhino. And you may need to make it up for that if possible at all. For example (using Jasmine as example here), setTimeout is not a global function as Jasmine expects it to be and I need to create and inject it like this (note the use of Java):

```javascript
jasmineGlobal.console = console;
var timer = new java.util.Timer();
var counter = 1; 
var ids = {};
jasmineGlobal.setTimeout = function (fn, delay) {
	if(fn){
        var id = counter++; 
        ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
        timer.schedule(ids[id], delay);
        return id;  
	}
};    
```

In this example jamsineGlobal is initialized as 'this', which in the context of a Dirigible module is empty (and not window (as expected by Jasmine)   

**Lesson learned:** Look for browser-specific objects such as window, set/clearTimeout/setInterval/clearInterval, document or console. See what exactly is required from them and then mock them delegating to the Rhino/Dirigible environment.
