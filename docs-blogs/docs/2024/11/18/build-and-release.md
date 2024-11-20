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

**Prerequisite:** This guide assumes you already have created a Dirigible application.

## **1. Building the Docker Image**

A Docker image is the foundation for deploying your application. Below is an example `Dockerfile` to build your application.


### **Example Dockerfile**
```Dockerfile
FROM dirigiblelabs/dirigible:latest

COPY application target/dirigible/repository/root/registry/public/application
COPY application/node_modules/ target/dirigible/repository/root/registry/public/

ENV DIRIGIBLE_HOME_URL=/services/web/application/gen/application/index.html
```

- The first line in the Dockerfile sets up the Dirigible Docker image as your base. Note that this is not a runtime image, meaning that the Dirigible’s Web IDE will be incorporated into your application.

- The first `COPY` copies your project directory. 

- The second one copies npm packages you’ve listed in the dependency section in your package.json. If you application doesn’t depend on any you should delete this line.

- The final line in the Docker file uses a Dirigible Environment Variable (full list here: [Enviroment Variables - Eclipse Dirigble](https://www.dirigible.io/help/setup/setup-environment-variables/#basic)) to set up the main page of your application.


## **2. Handling Dependencies**

If your application uses npm packages (otherwise skip this step), you’ll need `package.json` and `package-lock.json`. The Dirigible Web IDE generates these files, and they should only be completed as you need. The easiest way to fill in the `package-lock.json` is to pull you repository locally and to run` npm install` in your project directory.


### **Example** `project.json`
```json
{
	"guid": "your-application-name",
	"dependencies": [
    	{
        	"guid": "first-npm-package",
        	"type": "git",
        	"url": "link-to-git-repo",
        	"branch": "main"
    	},
    	{
        	"guid": "second-npm-package",
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


### **Example** `package.json`
```json
{
	"name": "your-application-name",
	"lockfileVersion": 3,
	"requires": true,
	"packages": {
    	"": {
        	"dependencies": {
            	"first-dependency": "0.3.0",
            	"second-dependency": "0.3.0",
        	}
    	},
    	"path/to/your/first/dependency": {
        	"version": "0.3.0",
        	"resolved": "exact/first/dependency/url",
        	"integrity": "first/dependency/content/cryptographic/hash"
    	},
    	"path/to/your/second/dependency": {
        	"version": "0.3.0",
        	"resolved": "exact/second/dependency/url",
        	"integrity": "second/dependency/content/cryptographic/hash"
    	},
   }
}
```


## **3. Build Workflow (**`build.yaml`**)**

To automate the build process, create a `build.yaml` file inside `.github/workflows`. This action will take effect immediately after pushing to the main branch of your projects repository.


### **Key Steps**

1. **Install Node.js**: Sets up the Node.js environment.

2. **Install Dependencies**: Downloads necessary npm packages. Point the workflow to the directory that contains your package.json. If your application doesn’t depend on any packages you should delete this section.

3. **TypeScript Build**: Ensures TypeScript compilation without critical errors. Point the workflow to the directory that contains your tsconfig.json that is generated through the Dirigible Web IDE

4. **Docker Buildx**: Builds and pushes a multi-architecture Docker image.


### **Example** `build.yaml`
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


## **4. Pull-Request Workflow (**`pull-request.yaml`**)**

This workflow validates pull requests by ensuring builds aren’t disrupted. The build process is identical, but the image is **not pushed** to a registry. If your application doesn’t depend on any packages you should delete the given section.


### **Example** `pull-request.yaml`
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


## **5. Release Workflow (**`release.yaml`**)**

This workflow triggers a release manually and tags the Docker image with a specific version.


### **Key Steps**

1. **Inputs**: Accepts a release version as input.

2. **Git Operations**: Creates a release branch and tags the repository.

3. **GitHub Release**: Generates a GitHub release with metadata.

Note that this workflow expects you to have a correct DOCKER\_USERNAME and DOCKER\_PASSWORD repository secrets that should be respectively your GitHub username and access token with enabled permissions to read and write. If your application doesn’t depend on any packages you should delete the given section.


### **Example** `release.yaml`
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

## **6. Activating the Release**

To trigger the release:

1. Go to the **Actions** tab in your GitHub repository.

2. Select the **Release** workflow.

3. Click **Run workflow**.

4. Enter the desired release version (e.g., `0.1.0`).

5. Monitor the workflow for successful completion.


## **Takeaways**

By leveraging Docker and GitHub Actions, we’ve automated the entire process of building, testing, and releasing Docker images for **Eclipse Dirigible** applications. This approach ensures consistency, reproducibility, and efficiency across your development pipeline.
