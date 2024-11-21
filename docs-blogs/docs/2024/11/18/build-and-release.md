---
title: "Building and Releasing a Docker Image for an Eclipse Dirigible Application"
description: "Building and releasing Docker image for Application effortlessly using GitHub Actions: Step-by-Step Tutorial"
author: Tomislav Ivanow
author_gh_user: TIVMOF
author_avatar: https://avatars.githubusercontent.com/u/105500638?u=dc143b82eef5e59088ec2d5c140b1e6e4f59ddb6&v=4&size=64
read_time: 10 min
publish_date: November 18, 2024
---

# Building and Releasing a Docker Image for an Eclipse Dirigible Application

This blog post will guide you through the process of building and releasing a Docker image for an Eclipse Dirigible application.

!!! info "Prerequisites"

    This guide assumes you already have created an Eclipse Dirigible application.

## **Building the Docker Image**

A Docker image is the foundation for deploying your application. Below is an example `Dockerfile` of how to build your application.

### Dockerfile

```Dockerfile
FROM dirigiblelabs/dirigible:latest

COPY application target/dirigible/repository/root/registry/public/application
# COPY application/node_modules/ target/dirigible/repository/root/registry/public/

ENV DIRIGIBLE_HOME_URL=/services/web/application/gen/application/index.html
```

- The first line in the Dockerfile sets up the Eclipse Dirigible Docker image as a base image.

    !!! note
  
        This is not a runtime image, meaning that Eclipse Dirigible’s Web IDE will be incorporated into your application.
  
- The `COPY` command transfers your project directory _(e.g., `application`)_ to the public [Registry](/help/development/concepts/registry/), where the [published](/help/development/concepts/publishing/) content resides.

- _(Optional)_ The second `COPY` command copies npm dependency packages listed in `package.json`.

    !!! note "NPM Dependencies"
  
        If your application doesn't have NPM dependencies, delete this line.
  
        If it does, run `npm install` before triggering the Docker build.

- The final line in the Dockerfile uses a Dirigible environment variable _(see the [Environment Variables Guide](/help/setup/setup-environment-variables/#basic))_ to set up the main page of your application.

## Handling Dependencies

If your application requires NPM dependencies _(otherwise, skip this step)_, you’ll need a `package.json` file. Eclipse Dirigible's Web IDE generates a `project.json` file by default. However, this file is Eclipse Dirigible-specific. You'll need to manually create a `package.json` file to declare your NPM dependencies.

To install the dependencies, run `npm install` in the project directory.

!!! note

    You can also use the [Terminal view](/help/development/ide/views/terminal/) in Eclipse Dirigible to execute commands.

??? info "project.json"

    The `project.json` file, combined with the `tsconfig.json`, enables seamless builds of TypeScript files in your project. Additional commands can be declared in `project.json` and executed at different stages of the development lifecycle.
    
    It's important to note that `project.json` is only a design-time artifact, meaning its commands are executed only during development in Eclipse Dirigible's Web IDE. For more details, see [Eclipse Dirigible Core Concepts](/help/development/concepts/).

    ```json
    {
        "guid": "your-application-name",
        "dependencies": [
            {
                "guid": "first-dirigible-module",
                "type": "git",
                "url": "link-to-git-repo",
                "branch": "main"
            },
            {
                "guid": "second-dirigible-module",
                "type": "git",
                "url": "link-to-git-repo",
                "branch": "main"
            }
        ],
        "actions": [
            {
                "name": "Build TypeScript",
                "commands": [
                    {
                        "os": "unix",
                        "command": "tsc"
                    },
                    {
                        "os": "windows",
                        "command": "cmd /c tsc"
                    }
                ],
                "registry": "true"
            }
        ]
    }
    ```

### package.json

```json
{
    "name": "@<github-org-name>/<application-name>",
    "version": "0.1.0",
    "repository": {
        "url": "https://github.com/<github-org-name>/<application-repository>.git",
        "type": "git"
    },
    "publishConfig": {
        "registry": "https://npm.pkg.github.com"
    },
    "dependencies": {
        "@<github-org-name>/<dependency-name>": "0.1.0"
    }
}
```

!!! info "package.json"

    Learn more about the `package.json` specification [here](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).

## Build Workflow

To automate the build process, create a `.github/workflows/build.yaml` file inside your GitHub repository. This GitHub Action will activate whenever changes are pushed to the main branch.

!!! note "GitHub Actions"

    This guide assumes you are setting up CI/CD pipelines with [GitHub Actions](https://github.com/features/actions). If you use a different CI/CD tool, you can still adapt the steps below.

### Key Steps

1. **Install Node.js**: Set up the Node.js environment.
1. **Install Dependencies**: Download necessary NPM packages. If your application doesn’t use dependencies, delete this step.
1. **TypeScript Build**: Compile TypeScript files without errors.
1. **Docker Buildx**: Build and push a multi-architecture Docker image.

### build.yaml

```yaml
name: Build - Application

on:
  push:
branches:
- main

jobs:
  main:
runs-on: ubuntu-latest

steps:
  - name: Checkout Repository
    uses: actions/checkout@v3

  - name: Install NodeJS
    uses: actions/setup-node@v4
    with:
      node-version: 18

  - name: Install TypeScript compiler
    run: npm i -g typescript

  - name: TypeScript Build
    run: |
          cd path/to/your/tsconfig.json
          tsc --pretty > tsc-output.log 2>&1 || true
          grep -v 'TS2688' tsc-output.log > filtered-tsc-output.log
          cat filtered-tsc-output.log
          if grep -q 'error TS' filtered-tsc-output.log; then
              exit 1
          fi

  - name: Install Dependencies
    run: |
          cd path/to/your/package.json
          echo "registry=https://npm.pkg.github.com
          //npm.pkg.github.com/:_authToken=${{ secrets.DOCKER_PASSWORD }}" > .npmrc
          npm install
          rm -rf .npmrc

  - name: Initialize Buildx
    run: |
          docker buildx create --name builder || true
          docker buildx use builder

  - name: Build and Push Docker Image
    run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login ghcr.io -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker buildx build --push --tag ghcr.io/your-github-username/your-application-name:latest -o type=image --platform=linux/arm64,linux/amd64 .
```

## Pull-Request Workflow

This workflow validates `Pull Requests` by ensuring builds aren’t disrupted. The build process is identical, but the image is **not pushed** to a registry.

### pull-request.yaml

```yaml
name: Pull Request - Application

on:
  pull_request:
    branches:
      - main

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
        uses: actions/checkout@v3

    - name: Install NodeJS
        uses: actions/setup-node@v4
        with:
        node-version: 18

    - name: Install TypeScript compiler
        run: npm i -g typescript

    - name: TypeScript Build
        run: |
            cd path/to/your/tsconfig.json
            tsc --pretty > tsc-output.log 2>&1 || true
            grep -v 'TS2688' tsc-output.log > filtered-tsc-output.log
            cat filtered-tsc-output.log
            if grep -q 'error TS' filtered-tsc-output.log; then
                exit 1
            fi

    - name: Install Dependencies
        run: |
            cd path/to/your/package.json
            echo "registry=https://npm.pkg.github.com
            //npm.pkg.github.com/:_authToken=${{ secrets.DOCKER_PASSWORD }}" > .npmrc
            npm install
            rm -rf .npmrc

    - name: Initialize Buildx
        run: |
            docker buildx create --name builder || true
            docker buildx use builder

    - name: Build Docker Image
        run: |
            docker buildx build --tag your-application-name -o type=image --platform=linux/arm64,linux/amd64 .
```

## Release Workflow

This workflow allows to manually trigger a release and tag the Docker image with a specific version.

### Key Steps

1. `Inputs`: Accepts a release version as input.
1. `Git Operations`: Creates a release branch and tags the repository.
1. `GitHub Release`: Generates a GitHub release with metadata.

!!! note

    Note that this workflow expects you to have a correct `DOCKER_USERNAME` and `DOCKER_PASSWORD` repository secrets that should be respectively your GitHub username and access token with enabled permissions to read and write.

### release.yaml

```yaml
name: Release - Application

on:
  workflow_dispatch:
    inputs:
      release-version:
        description: Release Version
        required: true
        default: 1.0.0

run-name: 'version set to ${{ inputs.release-version }} for release'

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
        uses: actions/checkout@v3
        with:
        fetch-depth: 0

    - name: Install NodeJS
        uses: actions/setup-node@v4
        with:
        node-version: 18

    - name: Install TypeScript compiler
        run: npm i -g typescript

    - name: TypeScript Build
        run: |
            cd path/to/your/tsconfig.json
            tsc --pretty > tsc-output.log 2>&1 || true

            grep -v 'TS2688' tsc-output.log > filtered-tsc-output.log

            cat filtered-tsc-output.log

            if grep -q 'error TS' filtered-tsc-output.log; then
                exit 1
            fi

    - name: Install Dependencies
        run: |
            cd path/to/your/package.json
            echo "registry=https://npm.pkg.github.com
            //npm.pkg.github.com/:_authToken=${{ secrets.DOCKER_PASSWORD }}" > .npmrc
            npm install
            rm -rf .npmrc

    - name: "Configure Git"
        run: |
            git fetch
            git checkout main  # Checkout the branch you want to release from
            git config user.name "$GITHUB_ACTOR"
            git config user.email "$GITHUB_ACTOR@users.noreply.github.com"

    - name: Initialize Buildx
        run: |
            docker buildx create --name builder || true
            docker buildx use builder

    - name: Build and Push Docker Image
        run: |
            echo ${{ secrets.DOCKER_PASSWORD }} | docker login ghcr.io -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
            docker buildx build --tag your-application-name -o type=image --platform=linux/arm64,linux/amd64 .
            docker buildx build --push --tag ghcr.io/your-github-username/your-application-name:${{ inputs.release-version }} -o type=image --platform=linux/arm64,linux/amd64 .

    - name: Create and Push Release Branch
        run: |
            git checkout -b release/${{ inputs.release-version }}
            git push --set-upstream origin release/${{ inputs.release-version }}

    - name: "Create GitHub Release"
        uses: softprops/action-gh-release@v1
        with:
            token: ${{ secrets.GITHUB_TOKEN }}
            tag_name: v${{ inputs.release-version }}
            name: ${{ inputs.release-version }}
            draft: false
            prerelease: false
            files: |
            LICENSE
        body: |
                ## Release - ${{ inputs.release-version }}
```

## Activating the Release

To trigger the release:

1. Go to the `Actions` tab in your GitHub repository.
1. Select the `Release` workflow.
1. Click the `Run workflow` button.
1. Enter the desired release version _(e.g., `1.0.0`)_.
1. Monitor the workflow for successful completion.

## Conclusion

By combining Docker and GitHub Actions, you can automate the building, testing, and releasing of Docker images for Eclipse Dirigible applications, ensuring a consistent and efficient development pipeline.
