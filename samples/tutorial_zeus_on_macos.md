---
layout: samples
title: Zeus on Kubernetes with MacOS
icon: fa-caret-right
group: new
---

{{ page.title }}
===

### Prerequisites

TBD


### Install Kubernetes command-line tool on MacOS

1. Run the following command:

> brew install kubectl

2. To verify that the version you’ve installed is up-to-date, run:

> kubectl version

### Install Minikube on MacOS

1. Install **Minikube v0.27.0**

> curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.27.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/

2. Start your Minikube cluster by executing the following command:

> minikube start


### Deploy and Run the Guestbook sample

1. Follow the steps described in this tutorial - https://kubernetes.io/docs/tutorials/stateless-application/guestbook/

### Deploy Zeus 

1. Deploy Zeus version 3 on Minikube using kubectl by executing:

> kubectl create -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml

2. Get the necessary information for access

2.1. Get IP:

> minikube ip

2.2. Get port

Execute:

> kubectl get services -n zeus -o go-template='{{range .items}}{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}{{end}}'

or run 

> minikube dashboard

In the Kubernetes Dashboard choose Namespace **zeus**. After that select **Discovery and Load Balancing**. Copy the second port from the **Internal endpoints** column (e.g. 31111).

2.3. Construct URL: {IP}:{Port} and open it in Web browser.

3. Undeploying Zeus

If you want to undeploy Zeus, execute the following command:

> kubectl delete -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml

4. Stop Minikube

To stop Minikube run 

> minikube stop

### Additional Steps with Docker

#### Install Docker on Mac

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
