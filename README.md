# Website of Eclipse Dirigible (dirigible.io) <img src="https://www.dirigible.io/img/dirigible.svg" align="left" height="60" width="120">

Eclipse Dirigible is a High-Productivity Application Platform providing development tools and runtime environment. The main project goal of the platform is to provide all required capabilities needed to develop and run an end-to-end vertical scenario in the Cloud for the shortest time ever.

Website address: [www.dirigible.io](https://www.dirigible.io).

This repository contains the source of the website, built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages.

## Features:
- Database Management
- Server-side Development
- Client-side Development
- Integration Services
- Mobile Apps Development
- Built-in DevOps

Learn about these features and many more [here](https://www.dirigible.io/help/overview/features).

## User Guide

The latest documentation is available [here](https://www.dirigible.io/help/).

- [Documentation](https://www.dirigible.io/help/)
- [API Reference](https://www.dirigible.io/api/)
- [Blog](https://www.dirigible.io/blogs/)

## Contributing

[These fine people](https://github.com/dirigible-io/dirigible-io.github.io/graphs/contributors) contribute to the project on a daily basis.

### Join us today!

```
1. Create an issue and describe your idea.
2. Fork the repository.
3. Work in your branch and why not publish it.
4. Commit the changes.
5. Create a pull request.
6. See your changes come to life!
```

## Setup

The site is a [VitePress](https://vitepress.dev/) project. It requires [Node.js](https://nodejs.org/) 20 or later.

Install the dependencies:

```
npm install
```

Run the development server on [http://localhost:8080](http://localhost:8080):

```
npm run docs:dev
```

Build the production site into `docs/.vitepress/dist`:

```
npm run docs:build
```

Preview the production build locally on [http://localhost:8080](http://localhost:8080):

```
npm run docs:preview
```

The content lives under `docs/` (Markdown), with the site configuration in `docs/.vitepress/config.mts`. On every push to `master`, the [`deploy.yaml`](.github/workflows/deploy.yaml) GitHub Actions workflow builds the site and publishes it to GitHub Pages at [www.dirigible.io](https://www.dirigible.io).

## License:

Eclipse Dirigible is under the [Eclipse Public License - v 2.0](https://www.eclipse.org/legal/epl-v20.html).
