---
title: "Server-Side Tests: Enabling Jasmine Test Results in Dirigible Console"
author: Georgi Pavlov
author_gh_user: shturec
author_avatar: https://avatars.githubusercontent.com/u/4983982?v=4
read_time: 3 min
publish_date: March 10, 2017
---

In my previous [blog](http://www.dirigible.io/blogs/2017/03/10/blogs_apps_tests-jasmine.html) I introduced [Jasmine](https://jasmine.github.io/) as a testing framework for server-side JavaScript. Here I will explore how to add the server console as another test results output channel. 

Server-Side Tests: Enabling Jasmine Test Results in Dirigible Console
----

In my previous [blog](http://www.dirigible.io/blogs/2017/03/10/blogs_apps_tests-jasmine.html) I introduced [Jasmine](https://jasmine.github.io/) as a testing framework for server-side JavaScript. Here I will explore how to add the server console as another test results output channel. It is rudimentary, yet handy channel. Lucky for you, it comes right out-of-the-box with the [GitHub dirigiblelabs Jasmine project](https://github.com/dirigiblelabs/jasmine).
To use it, you need to require the console reporter library and integrate it in Jasmine's environment.
  
```javascript
//get the console reporter library
var console_reporter = require("jasmine/reporters/console_reporter");

var jasmine = j.core(j);
var env = jasmine.getEnv();

//add the reporter to Jasmine env 
env.addReporter(console_reporter.jasmine_console_reporter);

$$j.describe("A suite is just a function", function() {
    
	$$j.it("and has a positive case", function() {
    	$$j.expect(false).toBe(true);
    });
    
    $$j.it("and can have a negative case", function() {
    	$$j.expect(false).not.toBe(true);
    });   
    
});
```

With this setup, selecting a Jasmine test suite .js script file in the user workspace will yield results similar to the following when the test suite is done:

```text
[2017-03-09T23:11:05.131Z][info] [Jasmine started]: {totalSpecsDefined:2}
[2017-03-09T23:11:05.139Z][info] [Suite started]: {id:"suite1", description:"A suite is just a function", fullName:"A suite is just a function", failedExpectations:[]}
[2017-03-09T23:11:05.301Z][info] [Spec started]: {id:"spec0", description:"and has a positive case", fullName:"A suite is just a function and has a positive case", failedExpectations:[], passedExpectations:[], pendingReason:""}
[2017-03-09T23:11:05.321Z][info] [Spec done]: {id:"spec0", description:"and has a positive case", fullName:"A suite is just a function and has a positive case", failedExpectations:[{matcherName:"toBe", message:"Expected false to be true.", stack:undefined, passed:false, expected:true, actual:false}], passedExpectations:[], pendingReason:"", status:"failed"}
[2017-03-09T23:11:05.327Z][info] [Spec started]: {id:"spec1", description:"and can have a negative case", fullName:"A suite is just a function and can have a negative case", failedExpectations:[], passedExpectations:[], pendingReason:""}
[2017-03-09T23:11:05.347Z][info] [Spec done]: {id:"spec1", description:"and can have a negative case", fullName:"A suite is just a function and can have a negative case", failedExpectations:[], passedExpectations:[{matcherName:"toBe", message:"Passed.", stack:"", passed:true}], pendingReason:"", status:"passed"}
[2017-03-09T23:11:05.354Z][info] [Suite done]: {id:"suite1", description:"A suite is just a function", fullName:"A suite is just a function", failedExpectations:[], status:"finished"}
[2017-03-09T23:11:05.360Z][info] [Jasmine done]
```
And that's all folks.

## References

* [Jasmin project](https://jasmine.github.io/)
* [Dirigible Jasmine module project](https://github.com/dirigiblelabs/jasmine)
