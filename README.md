# Website of Eclipse Dirigible (dirigible-io.github.io) <img src="http://www.dirigible.io/img/dirigible.svg" align="left" height="60" width="120"> 

Eclipse Dirigible is a Cloud Development Platform providing development tools and runtime environment. The main project goal of the platform is to provide all required capabilities needed to develop and run an end-to-end meaningful vertical scenario in the cloud for the shortest time ever.

Website address: [www.dirigible.io](http://www.dirigible.io).

![ReadMe-Animation](https://github.com/dirigible-io/dirigible-io.github.io/raw/master/img/readme_animation.gif)

## Features:
- Database Management
- Server-side Development
- Client-side Development
- Integration Services
- Mobile Apps Development
- Built-in DevOps

Learn about these features and many more [here](http://www.dirigible.io/features.html).

## User Guide

The latest documentation is available [here](http://www.dirigible.io/help/).

There is also a list of samples that you can experiment with and reuse in order to get to know the features and APIs provided by Eclipse Dirigible. For more information, go to [the samples page](http://www.dirigible.io/samples/).

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

```
docker pull squidfunk/mkdocs-material
```

Run on localhost:
```
docker run --rm -it -p 8000:8000 -v $PWD/docs-pages/api:/docs squidfunk/mkdocs-material
docker run --rm -it -p 8000:8000 -v $PWD/docs-pages/help:/docs squidfunk/mkdocs-material
docker run --rm -it -p 8000:8000 -v $PWD/docs-pages/samples:/docs squidfunk/mkdocs-material
```

Build
```
docker run --rm -it -v $PWD/docs-pages/api:/docs squidfunk/mkdocs-material build
docker run --rm -it -v $PWD/docs-pages/help:/docs squidfunk/mkdocs-material build
docker run --rm -it -v $PWD/docs-pages/samples:/docs squidfunk/mkdocs-material build

rm -rf docs
mkdir docs

mv docs-pages/api/site docs/api
mv docs-pages/help/site docs/help
mv docs-pages/samples/site docs/samples
cp -a docs-pages/site/. docs/
```

## License:

Eclipse Dirigible is under the [Eclipse Public License - v 2.0] (https://www.eclipse.org/legal/epl-v20.html).
