---
title: Zeus on Kubernetes with MacOS
hide:
  - toc
---

Zeus on Kubernetes with MacOS
===

### Prerequisites

1. Have a Homebrew installed - [https://docs.brew.sh/Installation](https://docs.brew.sh/Installation)


### Install Kubernetes command-line tool

1. Run the following command:

> brew install kubectl

2. To verify that the version you’ve installed is up-to-date, run:

> kubectl version

### Install Minikube

1. Install **Minikube v0.27.0**

> curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.27.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/



### Additional Steps with Docker

#### Install Docker 

1. Install it using Hombrew:

> brew cask install docker

2. Open Docker.app and continue the installation of the network (Ctrl+Space)

#### Build the image

Build an image without uploading it:

1. Set the environment variables with 

> eval $(minikube docker-env)

2. Clone the Zeus packaging project:

> git clone https://github.com/dirigiblelabs/zeus-v3-package.git

3. Build the image with the Docker daemon of Minikube:

> cd zeus-v3-package/zeus 

> mvn clean install

> docker build -t zeus .

3. Set the image in the pod spec like the build tag: **zeus**
4. Set the **imagePullPolicy** to **Never**, otherwise Kubernetes will try to download the image

> Important note: You have to run eval ** $(minikube docker-env)** on each terminal you want to use, since it only sets the environment variables for the current shell session.
