---
title: Eclipse Dirigible 5.0 - celebrating 5 years in open source with 5 killer features
author: nedelcho.delchev
---

### Eclipse Dirigible 5.0 - celebrating 5 years in open source with 5 killer features

#### [GraalVM](https://www.graalvm.org/)'s [GraalJS](https://github.com/graalvm/graaljs)

Fast, easy-to-use, easy-to-upgrade from Nashorn or Rhino, ECMA 2020 compliant, deeply integrated with the host JVM, fast interoperability with JVM languages like Scala and Kotlin, embeddable, JVM agnostic, stable, robust... just perfect for our needs. We were quite happy so far by using Mozilla Rhino as the default scripting engine, but its slow adoption of the most recent ECMA specs was definitely an issue. Hence, we were kind of forced to look for another option for the future development of the stack. The biggest surprise was about the time and efforts it took to adapt our API layer to use GraalJS instead of Rhino - literally zero. How many projects or products support straigthforward and compatible migration from one major version to another? The fact that GraalJS is even a totally different project, driven by different people and still provides a smooth migration path from Rhino, deserves admirations.

#### [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

Another invaluable gift coming along with GraalJS is the Chrome DevTools debug protocol support. A few years ago we tried to adapt Rhino and V8 debug API and to expose them to the Chrome DevTools, but it was quite unstable due to the lack of public specification of the debug protocol itself and on the other hand not so trivial behavior of the tools themselves. So, you can imagine how speechless we were left once we tried to connect the dots and it just worked. The decision to replace our Debug Perspective's own tools with the well-known yet very powerful Chrome DevTools came naturally.

![Debug GraalJS in Chrome DevTools](/img/posts/20200629/debug_graaljs_chromedevtools.png){: .img-responsive }

#### [Xterm.js](https://xtermjs.org/)

We were also happy to add one more jewel in the most recent release was the Xterm.js terminal interface written in JavaScript and run entirely in the browser. It is adopted quite widely by many tools already as most prominent ones are the VSCode itslef and Eclipse Theia/Che projects. It connects to the server-side endpoint via websocket, so no need to open the port 22 on the server as it was a security-related requirement from our side. It integrates nicely with the ttyd terminal server, which we have embedded in the stack as well.

![Xterm.js](/img/posts/20200629/terminal_xtermjs.png){: .img-responsive }

#### [Monaco](https://microsoft.github.io/monaco-editor/)

Major advantage of VSCode is its editor - Monaco. During the past few years it became the most advanced open source code editor, that’s easy to embed and enhance. The investment and support by Microsoft in VSCode and Monaco in particular, gives a good perspective and confidence of the project's future. We were quite happy by using Orion, but recently we decided to bet on Monaco as the default code editor for version 5.0 and above of Dirigible. All the innovations and integrations related to writing source code assumed to go to Monaco now. Another benefit of using Monaco is its diff editor, which became a part of the last but not least major feature of 5.0 release.

#### Git Support

Git support in Dirigible was available, since the very beginning. You could clone, push pull or share projects. So far, the supported operations were over-simplified due to the fact that the file system (workspaces, projects, files) was abstracted. It was possible to have workspaces stored in a RDBMS for instance. This had its advantage when you had to run Dirigible on a platform with limited functionalities or by some other reasons. Of course, the drawback was the very limited support of Git integrations, which in fact is more important for developers than having an abstract file system. In 5.0 we decided to first stick to the native file system only, then it was possible to implement a full-fledged Git perspective with listing and changes of branches, low-level operations on files for staging, diff editor, etc.

![New Git Perspective](/img/posts/20200629/git_perspective_new.png){: .img-responsive }


#### Conclusion

With the latest release we set the future direction of the Dirigible project from a technology perspective. Now, as we fixed the problematic dependencies by betting on new and emerging projects as well as reverted some of the questionable architectural decisions from the past the future of Dirigible looks quite bright.

> One more good news came along with this release - completed graduation review ayeeeee!
