---
title: "Testing Server-Side JavaScript with Jasmine"
author: georgi.pavlov
---

[Jasmine](https://jasmine.github.io/) is a popular test framework that supports BDD (Behavior-Driven Development) with testing JavaScript code. It does not require DOM. And all that makes it a very good candidate for a test framework of choice for JavaScript Scripting Services in Dirigible. It is made available for you to use as a Dirigible [GitHub project](https://github.com/dirigiblelabs/jasmine).

Testing Server-Side JavaScript with Jasmine
----

Writing tests with Jasmine is fun. It has interesting style of naming its functions so they sound quite natural.
You literally _describe_ what your code (_it_) is _expect_ ed to do with nice fluent assertion API. Here's (a dumb simple) example of how it looks:

```javascript
$$j.describe("A suite is just a function", function() {

    $$j.it("and has a positive case", function() {
        $$j.expect(false).toBe(true);
    });

    $$j.it("and can have a negative case", function() {
    	$$j.expect(false).not.toBe(true);
	});   

});
```

It's pretty much a functional specification of your code. Hence, how it supports BDD.
There's plenty of examples out there how to make use of it for client-side apps so I won't spend time on that right now. The point of this blog is to show how to make use of it for testing server side code in Dirigible.

## Jasmine API in Dirigible Scripting Environment  

Once you get the [Jasmine project](https://github.com/dirigiblelabs/jasmine) from GitHub into your workspace, you need to require the library first before you can make anything with it. Open up a file in the _Test Cases_ section of your project (or create it manually if you don't have one yet) and start writing: *var j = require("jasmine/jasmine");*. The **j** variable is a reference to the Jasmine API and now you are completely into the Jasmine world. Set it up and use *require* to reference the code you want to test and start asserting its behavior using the Jasmine API as you normally would when testing client-side JavaScript libraries.

```javascript
var j = require("jasmine/jasmine");
var jasmine = j.core(j);
var env = jasmine.getEnv();
var $$j = j.interface(jasmine, env);
```

## Test runner
So, you have your tests developed and now you are eager to run the suite. There are a couple of options here. You can go quite native to Jasmine and take care of integrating a test results reporter (we provide two reporters adapted for Dirigible for you out-of-the-box, one for console and one as a JSON service). Or even better, and I shall focus on this now, you can use the Jasmine Test Runner Service (require with path **jasmine/jasmine_test_runner_svc**). It is designed to work with the core Test Runner module in Dirigible to deliver test results as a service in a form suitable for you user agent. If you requested the test suite file via a browser (or the Preview view in Dirigible IDE) it will redirect the results to the Test Dashboard HTML UI. And if you requested it e.g. with cUrl using **Accept: application/json** header it will deliver test results formatted as JSON as a response. This makes it suitable both for direct consumption or integration in third-party quality control systems and it will cost just a single line of code to enable.

```javascript
require("jasmine/jasmine_test_runner_svc").service(env);
```
The test results output for HTML capable user agents looks like this:

<img src="/img/posts/20170310-0/test-dashboard.png"/>

And when requested for JSON instead of HTML it will deliver the following payload:

```json
{
  "tests": [
    {
      "id": "spec0",
      "name": "and has a positive case",
      "module": "A suite is just a function ",
      "runtime": 36,
      "assertions": [
        {
          "message": "Expected false to be true.",
          "result": false
        }
      ],
      "failed": true,
      "total": 1
    },
    {
      "id": "spec1",
      "name": "and can have a negative case",
      "module": "A suite is just a function ",
      "runtime": 26,
      "assertions": [
        {
          "message": "and can have a negative case assertion[toBe] passed.",
          "result": true
        }
      ],
      "failed": false,
      "total": 1
    }
  ],
  "testSuite": {
    "runtime": 122,
    "total": 2,
    "passed": 1,
    "failed": 1
  }
}
```  

## Putting it all together

Finally, putting it all together, here is the layout of Jasmine-Dirigible test suite with two test cases delivering results as a service, that we discussed so far.

```javascript
var j = require("jasmine/jasmine");
var jasmine = j.core(j);
var env = jasmine.getEnv();
var $$j = j.interface(jasmine, env);

$$j.describe("A suite is just a function", function() {
    
	$$j.it("and has a positive case", function() {
    	$$j.expect(false).toBe(true);
    });
    
    $$j.it("and can have a negative case", function() {
    	$$j.expect(false).not.toBe(true);
    });   
    
});
    
require("jasmine/jasmine_test_runner_svc").service(env);
```
    
Now, you are all set to benefit from what Jasmine has to offer to you as a developer for JavaScript server-side code.

## References

[GitHub project](https://github.com/dirigiblelabs/jasmine) 