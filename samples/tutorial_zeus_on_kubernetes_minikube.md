---
layout: samples
title: Deploying Zeus on Kubernetes Minikube
icon: fa-caret-right
group: tutorial
---

{{ page.title }}
===

This tutorial was performed on a PC running Windows 10 Enterprise OS.

### Prerequisites

*	Have [VirtualBox 5.2.12 platform packages](https://download.virtualbox.org/virtualbox/5.2.12/VirtualBox-5.2.12-122591-Win.exe) installed
* .NET Framework 4+ (the installation will attempt to install .NET 4.0 if you do not have it installed)
* Enabled VT-x or AMD-v virtualization (use the Performance tab for the CPU in the Task Manager to verify it)

### Install Kubernetes command-line tool
1. Install **Chocolatey** 

1.1. Run the following command:

> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

If you don't see any errors, you are ready to use Chocolatey! 

1.2. To ensure that Chocolatey is successfully installed, type **choco** or **choco -?**.

For more information see https://chocolatey.org/install.

2. Install the Kubernetes command-line tool **kubectl** with Chocolatey 

2.1. Execute the command:

> choco install kubernetes-cli

2.2. To verify that the version you’ve installed is up-to-date, run **kubectl version**. 

2.3. Configure kubectl to use a remote Kubernetes cluster:

>cd C:\users\yourusername (Or wherever your %HOME% directory is)  
mkdir .kube cd .kube New-Item config -type file

Edit the config file with a text editor of your choice.

2.4. Check that kubectl is properly configured by getting the cluster state:

> kubectl cluster-info

### Installing Minikube  

1. Install **Minikube v0.26.1**

Download the [minikube-installer.exe](https://github.com/kubernetes/minikube/releases/download/v0.26.1/minikube-installer.exe) file, and execute the installer. This will automatically add minikube.exe to your path.

2. Start your Minikube cluster by executing the following command:

> minikube start

### Deploying Zeus 

1. Deploy Zeus version 3 on Minikube using kubectl by executing:

> kubectl create -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml

2. Get the necessary information for access

2.1. Get IP:

> minikube ip

2.2. Get port:

> kubectl get services -n zeus -o go-template='{{range .items}}{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}{{end}}'

2.3. Construct URL: {IP}:{Port}

3. Undeploying Zeus

If you want to undeploy Zeus, execute the following command:

> kubectl delete -f https://raw.githubusercontent.com/dirigiblelabs/zeus-v3-package/master/zeus/zeus.yml

4. Stop Minikube

To stop Minikube run **minikube stop**.

### Docker

Build an image without uploading it:

1. Set the environment variables with eval: **$(minikube docker-env)**
2. Build the image with the Docker daemon of Minukube: **docker build -t my-image**
3. Set the image in the pod spec like the build tag: **my-image**
4. Set the **imagePullPolicy** to **Never**, otherwise Kubernetes will try to download the image

>Important note: You have to run eval ** $(minikube docker-env)** on each terminal you want to use, since it only sets the environment variables for the current shell session.


