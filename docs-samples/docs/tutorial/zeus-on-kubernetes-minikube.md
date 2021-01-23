---
title: Zeus on Kubernetes
hide:
  - toc
---

Zeus on Kubernetes
===

These tutorials will guide you through the processes of installation of Kubernetes Minikube, deployment of Zeus and building an image with Docker:

### Setup

* [on Windows](../zeus-on-windows)
* [on MacOS](../zeus-on-macos)


### Start Minikube 

To run the local Kubernetes cluster execute the following command:

> minikube start


### Deploy and Run the Guestbook sample

* Follow the steps described in this tutorial - https://kubernetes.io/docs/tutorials/stateless-application/guestbook/

### Deploy Zeus

* Deploy Zeus version 3 on Minikube using kubectl by executing:

> kubectl create -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml

* Get the necessary information for access

  * Get IP:

> minikube ip

or directly:

> minikube dashboard

  * Get port

Execute:

> kubectl get services -n zeus -o go-template='{{range .items}}{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}{{end}}'

or run 

> minikube dashboard



### Open Zeus Cockpit

* From the Kubernetes Dashboard:
  * Change the Namespace to **zeus** (from the sidebar menu)
  * Select **Discovery and Load Balancing** (from the sidebar menu)
  * Find the Services section and take the port of the Zeus instance. Copy the second port from the **Internal endpoints** column (e.g. 31111)
  * Construct URL: {IP}:{Port} and open it in Web browser.

### Create Account

* Go to **Accounts** settings (via the sidebar - last icon)
  * Select **Partners** view and add a new partner details
  * Select the **Accounts** view and add a new account details

### Configure the local Cluster

* Go to **Accounts** settings (via the sidebar - last icon)
* Select **Clusters** view and add a new cluster details as follows
  * Name: e.g. *local*
  * URL: *https://{IP}:8443*
  * Token: from Minikube Dashboard, go to *Config and Storage* -> *Secrets* -> Token
  * Account: select from the drop down

### Register a Container

* Go to **Templates** perspective
* Select the **Containers** view
* Enter the following parameters:
  * Name: Dirigible
  * Image: dirigiblelabs/dirigible-tomcat:latest
  * Protocol: TCP
  * Port: 8080

### Create a Template

* Go to **Templates** perspective
* Select the **Templates** section
* Create a new Template named *Dirigible*
* Select the row representing the just created Template
* Select the *Containers* section below
* Create a new reference to the Container created in the previous step
* Select the *Services* section
* Create a new Service with the following details:
  * Name: http
  * Type: NodePort
  * Port: 8080
  
### Deploy the Application

* Go to **Applications** perspective
* Select the **Deploy** view
* Click on *New* button and enter the following details:
  * Cluster: select from the drop down
  * Template: select from the drop down
  * Name: dirigible


### Undeploying Zeus

If you want to undeploy Zeus, execute the following command:

> kubectl delete -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml


### Stop Minikube

To stop Minikube run:

> minikube stop
