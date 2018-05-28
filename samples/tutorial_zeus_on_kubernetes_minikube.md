---
layout: samples
title: Zeus on Kubernetes
icon: fa-caret-right
group: tutorial
---

{{ page.title }}
===

These tutorials will guide you through the processes of installation of Kubernetes Minikube, deployment of Zeus and building an image with Docker:

### Setup

* [on Windows](tutorial_zeus_on_windows.html)
* [on MacOS](tutorial_zeus_on_macos.html)


### Start Minikube 

To run the local Kubernetes cluster execute the following command:

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


### Stop Minikube

To stop Minikube run:

> minikube stop
