---
title: JavaScript Decorators in Eclipse Dirigible
description: In this article we are going to take a look at the HTTP JS decorators of Eclipse Dirigible
author: Vladimir Mutafov
author_gh_user: vmutafov
author_avatar: https://avatars.githubusercontent.com/u/39677168?v=4
read_time: 4 min
publish_date: January 17, 2023
---

## Eclipse Dirigible supports JavaScript decorators?

Although decorators support is something new in Dirigible yet to be documented, we have plans to use them more and more. You may ask, how did we add support for them? Well, the secret ingredient is that internally GraalJS is used for executing JavaScript. If you have read [my blog post](https://vmutafov.com/graaljs-decorators) about decorators you should have a basic idea of how we've done it.

## What do we use JavaScript decorators for?

For some time now, we have been thinking of an easier-to-code and easier-to-read solution for writing REST APIs. The current way of writing RESTful services is via [the rs module](https://www.dirigible.io/api/http/rs/). At a first glance, this is pretty similar to the plain old NodeJS Express. We have a router and we define some routes:

```javascript
import { rs } from "sdk/http"
// or if you use the CJS modules support
// const rs = require("http/v4/rs");

rs.service()
    .get("/hello", (ctx, req, res) => res.println("Hello there!");)
.execute();
```

This approach has been working well but we've been hearing more and more about people wanting to write APIs in a way similar to Java Spring's and NestJS's annotation/decorator definitions.

When the new GraalJS version supporting decorators was released, we decided to create a PoC for decorator-based APIs. The first thing we tried out was something like the following:

```javascript
import { Controller, Get } from "sdk/http"
// or if you use the CJS modules support
// const { Controller, Get } = require("http/v4/rs/decorators");

@Controller
class MyApi {
    
    @Get("/test")
    onGet(req, res, ctx) {
        res.println("Hello there!");
    }
}
```

While this was good enough for a PoC, it was still a bit more verbose than necessary for simple APIs. From what we have seen, people most often write an API that receives some request data and respond with some other data. So, we changed our design to the following:

```javascript
import { Controller, Get, Post } from "sdk/http"
// or if you use the CJS modules support
// const { Controller, Get, Post } = require("http/v4/rs/decorators");

@Controller
class MyApi {

    @Get("/test")
    onGet() {
        return "Hello there!";
    }
    
    @Post("/test")
    onPost(body) {
        return {
            some: "data"
        }
    }
}
```

This change made writing simple APIs a lot easier - you just receive some data, and return some data. But what if you need to read some query parameters? Or headers? Or something that we have still not added support via just decorators? Well, you could still write your request handler like this:

```javascript
@Post("/test/:id")
onPost(body, ctx) {
    const id = ctx.req.params.id;
    return {
        some: "data",
        id: id
    }
}
```

By using the `ctx` argument of the request handler you can access the underlying [request](https://www.dirigible.io/api/http/request/) with `ctx.req` or the [response](https://www.dirigible.io/api/http/response/) object with `ctx.res`.

## Wrap up
Whether using decorators for declaring REST APIs is the best way, of course, is debatable. Some people like using decorators, and some people like defining routes like in Express. Personally, I believe both solutions have their pros and cons and it's the developer's responsibility to choose the best approach for a given REST API. If you want to see all this for yourself, go ahead and try it out at [Dirigible Trial](https://trial.apps.dirigible.io/).
