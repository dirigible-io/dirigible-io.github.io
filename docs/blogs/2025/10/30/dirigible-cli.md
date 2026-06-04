---
title: "Introducing the Eclipse Dirigible CLI – Develop and Run Dirigible Projects Effortlessly from Your Terminal"
description: "Learn how to quickly create, run, and manage Eclipse Dirigible projects using the new Dirigible Command Line Interface (CLI) — available now as an NPM package."
author: Iliyan Velichkov
author_gh_user: iliyan-velichkov
author_avatar: https://avatars.githubusercontent.com/u/5058839?v=4
read_time: 5 min
publish_date: October 30, 2025
---

We’re excited to announce the **new Command Line Interface (CLI)** for the [Eclipse Dirigible](https://www.dirigible.io/) project — available as an NPM package:  
👉 [@dirigiblelabs/dirigible-cli](https://www.npmjs.com/package/@dirigiblelabs/dirigible-cli)

This CLI simplifies the entire **development lifecycle** of Dirigible projects — from creation and startup to live reloading and testing.  
With just a few commands, you can bootstrap a new Dirigible application, run it locally, and iterate quickly — all from your terminal.

In this post, we’ll explore two ways to use the CLI:

1. **Globally installed CLI**
1. **CLI as a local development dependency**

---

## 🌍 Using the CLI Globally

The simplest way to get started is to install the CLI globally.

### 1️⃣ Install the CLI Globally

```shell
npm install -g @dirigiblelabs/dirigible-cli
```

Once installed, the `dirigible` command becomes available globally in your terminal.

### 2️⃣ Create a New Dirigible Project

Let’s create a new Dirigible project named `demo`:

```shell
dirigible new --name demo
```

This command generates a ready-to-run project with a simple `hello.ts` service.

### 3️⃣ Start the Project

Navigate to your project directory and start it:

```shell
cd demo
dirigible start
```

The project will start on [http://localhost:8080](http://localhost:8080) by default.

### 4️⃣ Test the Hello Service

Open the `hello.ts` URL in your browser: [http://localhost:8080/services/ts/demo/hello.ts](http://localhost:8080/services/ts/demo/hello.ts).

Use the default credentials: `admin / admin`

You should receive status code `200` and body `Hello World!`.

🎉 Your Dirigible project is running successfully!

Alternatively, you can use curl 

```shell
curl -u admin:admin http://localhost:8080/services/ts/demo/hello.ts
```

<a href="../../../../images/dirigible-cli/start-project.gif" target="_blank">
<img src="../../../../images/dirigible-cli/start-project.gif" alt="start-project.gif">
</a>

### 5️⃣ Enable Watch Mode for Live Development

To automatically apply your code changes, start the project in watch mode:

```shell
dirigible start --watch
```

Open the project in VSCode (or your preferred editor):

```shell
code .
```

Edit the `hello.ts` file to modify the response, for example:

```typescript
import { response } from "sdk/http";

response.println("Hello from Watch Mode!");
```

Save the file, refresh your browser at [http://localhost:8080/services/ts/demo/hello.ts](http://localhost:8080/services/ts/demo/hello.ts) and you’ll see the updated body `Hello from Watch Mode!` — no manual restart needed.

<a href="../../../../images/dirigible-cli/start-in-watch.gif" target="_blank">
<img src="../../../../images/dirigible-cli/start-in-watch.gif" alt="start-in-watch.gif">
</a>


---

## 💻 Using the CLI as a Local Development Dependency

You can also install and use the Dirigible CLI locally inside a Node.js project.

### 1️⃣ Initialize a New Node.js Project

```shell
mkdir demo 
cd demo

npm init --yes
```

### 2️⃣ Install the CLI as a Dev Dependency

```shell
npm install --save-dev @dirigiblelabs/dirigible-cli
```

### 3️⃣ Add NPM Scripts

Open your `package.json` and add:

```json
{
  "scripts": {
    "start": "dirigible start",
    "start:dev": "dirigible start --watch"
  }
}
```

### 4️⃣ Add a Sample Service

Create a file named `hello.ts` in your project root with the following content:

```typescript
import { response } from "sdk/http";

response.println("Hello World!");
```

### 5️⃣ Start the Project

Run your Dirigible project using the `start` script:

```shell
npm run start
```

Then open [http://localhost:8080/services/ts/demo/hello.ts](http://localhost:8080/services/ts/demo/hello.ts)

Use the default credentials `admin / admin`.

You should receive status code `200` and body `Hello World!`.

### 6️⃣ Enable Watch Mode

To automatically reload the project on file changes, use:

```shell
npm run start:dev
```

Now each time you edit and save `hello.ts`, Dirigible will reload your changes instantly.

---

## 🎯 Conclusion

With the new **Eclipse Dirigible CLI**, developing and managing Dirigible projects has never been easier.  
You can:

- Scaffold new projects instantly
- Run and debug them locally
- Enable live reloads for faster feedback loops

Whether installed globally or used as a local dev dependency, the CLI offers a **streamlined developer experience** for building cloud-ready applications on top of **Eclipse Dirigible**.

Try it out today:

👉 [https://www.npmjs.com/package/@dirigiblelabs/dirigible-cli](https://www.npmjs.com/package/@dirigiblelabs/dirigible-cli)

---
