---
layout: home

hero:
  name: Eclipse Dirigible
  text: High-Productivity Application Platform
  tagline: In-system development tools and a runtime environment for the full lifecycle of cloud applications
  image:
    src: /img/logo/dirigible.svg
    alt: Eclipse Dirigible
  actions:
    - theme: brand
      text: Get Started
      link: /help/
    - theme: alt
      text: Try it Out
      link: https://trial.dirigible.io
    - theme: alt
      text: GitHub
      link: https://github.com/eclipse/dirigible

features:
  - title: In-System Programming
    details: Develop and modify running applications through the browser IDE — no restarts, no deployments, immediate feedback
    link: /help/development/concepts/dynamic-applications
    linkText: Learn more
  - title: Model-Driven Development
    details: Design entity domain models visually, generate full-stack applications in minutes with built-in templates
    link: /help/tutorials/modeling/generate-application-from-model
    linkText: Learn more
  - title: Full-Stack Runtime
    details: JavaScript, TypeScript, Java execution engines alongside BPM, Camel integration, OData, and more — all in one platform
    link: /help/overview/engines
    linkText: Learn more
  - title: Open & Extensible
    details: Eclipse Public License 2.0, fully open source on GitHub. Extend with custom facades, templates, and perspectives
    link: /help/development/extensions/
    linkText: Learn more
---

<div class="content">
  <section>
    <div class="container flex">
      <div class="text">
        <h2>Unified Modeling Workspace</h2>
        <p>Model everything visually: entities, APIs, UI pages, workflows, and integrations using a single editor experience. Dirigible eliminates the fragmentation of modern dev stacks, giving teams a coherent, structured workflow from idea to implementation. Even complex applications stay organized, consistent, and easy to reason about.</p>
      </div>
      <div class="image">
        <i class="uil uil-sitemap section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Code-Behind for Complete Control</h2>
        <p>Low-code never limits you — jump into TypeScript or JavaScript at any time to handle custom logic, rules, validation, transformations, or full microservices. Everything you model is immediately available as code, and every line of code instantly updates the runtime.</p>
      </div>
      <div class="image">
        <i class="uil uil-brackets-curly section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Instant Full-Stack Runtime</h2>
        <p>Your app runs the moment you hit save. No containers to build, no servers to configure, and no CI/CD pipeline required. Dirigible's embedded runtime executes UI, APIs, events, schedulers, scripts, and integrations out-of-the-box.</p>
      </div>
      <div class="image">
        <i class="uil uil-bolt section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Workflow &amp; Automation Engine</h2>
        <p>Define business processes, approvals, tasks, and event-driven logic with a lightweight BPMN-like workspace. Perfect for building end-to-end business apps that need structured automation.</p>
      </div>
      <div class="image">
        <i class="uil uil-process section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Built-In Integrations &amp; Adapters</h2>
        <p>Connect to the systems that matter — databases, queues, HTTP services, SAP, Snowflake, OCI, messaging brokers, and more. Drag-and-drop flows or write transformation logic directly in TypeScript or JavaScript.</p>
      </div>
      <div class="image">
        <i class="uil uil-plug section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Embedded UI Builder (Layouts + Components)</h2>
        <p>Developers can rapidly assemble UIs using layouts, forms, tables, pages, and custom components. Low-code for speed — fully scriptable for maximum freedom.</p>
      </div>
      <div class="image">
        <i class="uil uil-table section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Extensible by Design</h2>
        <p>Dirigible is not a closed low-code "box." Extend the platform with your own UI components, backend modules, adapters, scripts, NPM packages, reusable templates, or full application bundles.</p>
      </div>
      <div class="image">
        <i class="uil uil-puzzle-piece section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Security, Governance &amp; Workspace Isolation</h2>
        <p>Each workspace is isolated and secured. Role-based permissions, metadata-driven governance, workspace versioning, and enterprise-grade audit trails ensure development stays clean, compliant, and controlled.</p>
      </div>
      <div class="image">
        <i class="uil uil-shield-check section-icon"></i>
      </div>
    </div>
  </section>

  <section>
    <div class="container flex">
      <div class="text">
        <h2>Enterprise-Grade Debugging &amp; Observability</h2>
        <p>Get instant logging, profiling, stack traces, job monitoring, and API tracing — all built in. Developers see exactly what's running, where it's running, and why, without external tooling.</p>
      </div>
      <div class="image">
        <i class="uil uil-chart-line section-icon"></i>
      </div>
    </div>
  </section>
</div>

## Design, expose, and run APIs out-of-the-box - with decorators and zero boilerplate

Dirigible is built around an API-first mindset: when you model your data or services, REST endpoints are automatically available, fully documented, and ready to run. Using decorator-based programming, you can write clean, expressive controllers in TypeScript or JavaScript - while still having access to the underlying runtime for full control. The result: a low-code + code fusion where your APIs are first-class citizens.

You don’t need to switch between modeling tools or hand-write routing configuration - Dirigible’s CLI, decorators, and runtime handle this seamlessly. And because the API layer is baked directly into your models and service classes, you get autogenerated OpenAPI specs, built-in request validation, and a ready-to-use HTTP server surface immediately.

### What Do You Get:

* Speed & Productivity: You don’t spend time wiring up routing or scaffolding APIs - the decorator metadata does that.
* Clarity & Maintainability: Your service logic (business rules) lives in a clean class. Controller classes are just thin HTTP facades.
* Flexibility: You can mix low-code modeling (entities, metadata) with handwritten TypeScript for complex logic, validation, and dependency injection.
* Standardized API: With decorator metadata, you easily get API docs, validation, and client stubs if needed.

This example demonstrate one of Dirigible’s strongest capabilities:
your API becomes live the moment you save the file.
No packaging, no deployment cycle, no waiting.
Just write → save → call.

## Enjoy Programming Like Never Before

Building software should feel empowering - not exhausting. With Dirigible, you get a platform where ideas turn into running applications instantly, where tools feel light instead of heavy, and where everything — models, code, APIs, UI, workflows - lives in harmony. No boilerplate. No scaffolding madness. No context switching.

Just you, your logic, and a platform that stays out of your way.

Whether you love modeling, coding, scripting, automating, or simply shipping fast, Dirigible gives you the joy of seeing things work the moment you create them. Save a file - it runs. Change a schema - it updates. Add a service - it becomes an API. It’s development the way it should be.

### Ready to Dive Deeper?

Explore the platform, learn the tools, and start building your next application today.

- 📘 Documentation: https://www.dirigible.io/help/ Comprehensive guides covering modeling, runtime, APIs, scripting, extensions, CLI, and more.
- 🧩 SDK Reference: https://www.dirigible.io/sdks/ Full listing of all built-in modules across both SDKs (TypeScript/JavaScript and Java) — HTTP, database, events, security, integration, BPMN, and the core platform services.
- 📰 Blog & Tutorials: https://www.dirigible.io/blogs/ Hands-on articles, learning paths, release notes, architecture deep dives, and real-world examples.
- 💻 GitHub (Source Code): https://github.com/eclipse/dirigible Open source. Apache License. Contributions welcome.
