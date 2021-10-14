---
title: Custom Domain in Kubernetes with AWS Route 53, Gardener, Istio & Let's encrypt
author: krasimir.dermendzhiev
---


# Custom Domain in Kubernetes with AWS Route 53, Gardener, Istio & Let's encrypt

## Overview

In this article we are going to setup custom domain for **Dirigible** application in **Kubernes** cluster with **Gardener**, **AWS Route 53**, **Istio**, **Let's encrypt**.

The target Kubernetes deployment is shown bellow:
![Gardener - AWS - Istio - Dirigible](/img/posts/20211014/overview.png)


=== "Kubernetes"

!!! tip "Overview"

    Kubernetes is an open source system for automating deployment, scaling, and management of containerized applications in a cluster environment. You can read more about Kubernetes [here](https://kubernetes.io/).

=== "AWS Route 53"

!!! tip "Overview"

    Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. [here](https://aws.amazon.com/route53/).

=== note "Gardener"

!!! tip "Overview"

    Deliver fully-managed clusters at scale everywhere with your own Kubernetes-as-a-Service. Kubernetes-native system managing the full lifecycle of conformant Kubernetes clusters as a service on Alicloud, AWS, Azure, GCP, OpenStack, EquinixMetal, vSphere, MetalStack, and Kubevirt with minimal TCO.[here](https://gardener.cloud/).

=== "Istio"

!!! tip "Overview"

    Istio is an open source service mesh that layers transparently onto existing distributed applications. Istio’s powerful features provide a uniform and more efficient way to secure, connect, and monitor services. [here](https://istio.io/).

## Prerequisites

In this article we assume that you have already running productive _**Kubernetes Cluster** on **Gardener**_ and configured _**kubectl**_ for it. If you don't have such, you can create one by using the the open-source [Gardener](https://github.com/gardener) project. Also you will need [AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) or [AWS Free Tier](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all), you need to install [Istio](https://istio.io/latest/docs/setup/install/) and [Dirigible](https://www.dirigible.io/help/setup/kubernetes/)

## Configurations in AWS Route 53

1. Create hosted zone.
When you create hosted zone choose type `Public hosted zone` see the image below.

![AWS - Hosted Zone](/img/posts/20211014/aws-hostedzone.png)

After you create your hosted zone you can delegate your subdomain to AWS, if you don't host your parent domain in AWS. You can take the name servers which you can see in the image bellow and add `ns` records to your domain. But if you host your domain in AWS you don't need to delegate.  
![AWS - Nameservers](/img/posts/20211014/nameservers.png)

2. Create new user - which will provide to Gardener dns provider.

- When you create user select credential type to be `Access key - Programmatic access` ( you see the image below).

![AWS - Create User](/img/posts/20211014/create-user.png)

3. Create group - add user to group, but for this scenario we need to create new group which will be using only for this purpose. That's why, click on `Create group` and it will open new tab to create the group.
![AWS - Create Group](/img/posts/20211014/create-group.png)

4. Create Policy - Before you create the new group click on `Create policy` it will open new tab to create the policy.
![AWS - Create Group Name](/img/posts/20211014/create-group-name.png)

- On the first step click on the JSON see the image below.
![AWS - Create Policy - Step 1](/img/posts/20211014/create-policy-step1.png)

- Leave this tab open and find your `Hosted zone ID` see the image below
![AWS - Take Your Hosted Zone Id](/img/posts/20211014/take-your-hosted-zone-id.png)

- Add your hosted zone id to the JSON you can use this example json

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "route53:ListResourceRecordSets",
            "Resource": "arn:aws:route53:::hostedzone/*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "route53:GetHostedZone",
            "Resource": "arn:aws:route53:::hostedzone/Z2XXXXXXXXXXXX"
        },
        {
            "Sid": "VisualEditor2",
            "Effect": "Allow",
            "Action": "route53:ListHostedZones",
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor3",
            "Effect": "Allow",
            "Action": "route53:ChangeResourceRecordSets",
            "Resource": "arn:aws:route53:::hostedzone/Z2XXXXXXXXXXXX"
        }
    ]
}

```
![AWS - Add Your Hosted Zone Id to Policy](/img/posts/20211014/add-your-hostedzone-id-to-policy.png)

> **Note:** It's very important to add your correct hosted zone id

- We don't need tags see image below
![AWS - Create Policy - Step 2](/img/posts/20211014/policy-step-2.png)

- Тype policy name  see image below
![AWS - Create Policy - Step 3](/img/posts/20211014/policy-step-3.png)

- Add new policy to the group see image below
![AWS - Add New Policy to the Group](/img/posts/20211014/add-new-policy-to-the-group.png)

5. Add new group to the user.
![AWS - Assign New Group to the New User](/img/posts/20211014/assign-new-group-to-the-new-user.png)

We don't need tags.
![AWS - Add User Step - 3](/img/posts/20211014/add-user-step-3.png)

!!! note

    Before you click on create user check Permissions summary that consist your new group.

![AWS - Add User Step - 4](/img/posts/20211014/add-user-step-4.png)

6. Download your access key.

![AWS - Download New Access Key Id](/img/posts/20211014/download-new-access-key-id.png)

## Configure Gardener

1. We need to provide our AWS Route 53 credentials from previous step.
![Gardener - Add New Amazone Route53 Secret](/img/posts/20211014/add-new-amazon-route53-secret.png)

2. Add gardener extensions to the Shoot cluster - configure dns and Let's Encrypt certificate.

- Open Gardener Shoot yaml file and add dns providers, shoot-dns-service, shoot-cert-service see under how to add.

```yaml
spec:  
  dns:
    providers:
      - secretName: my-aws-route53-secret
        type: aws-route53
  extensions:
    - type: shoot-dns-service
      providerConfig:
        apiVersion: service.dns.extensions.gardener.cloud/v1alpha1
        kind: DNSConfig
        dnsProviderReplication:
          enabled: true
    - type: shoot-cert-service
      providerConfig:
        apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
        issuers:
          - email: <your-email-here>
            name: <type-name-for-the-issue>
            server: 'https://acme-v02.api.letsencrypt.org/directory'
```

3. Create subdomain for your application.
We can use DNSEntry for Gardener, because in Gardener Shoot yaml file we configured:

```yaml
dnsProviderReplication:
          enabled: true
```
- Find Istio ingress gateway external ip:

```
kubectl get services istio-ingressgateway -n istio-system --output jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

```yaml
apiVersion: dns.gardener.cloud/v1alpha1
kind: DNSEntry
metadata:
  annotations:
    dns.gardener.cloud/class: garden
  name: dns-entry
  namespace: default
spec:
  dnsName: "app.demo.dirigible.io"
  ttl: 600
  targets: 
  - <type-here-the-result-from-previous-command>
```

## Configure Istio 
We need to configure our istio ingress gateway to accept our new sub domain `app.demo.dirigible.io` and the certificate.

1. Apply the dns configuration and certificate.
- In this article we will configure istio ingress gateway to accept wildcard certificate.


```
kubectl edit svc istio-ingressgateway -n istio-system
```

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
kind: Service
metadata:
  annotations:
    cert.gardener.cloud/issuer: app.demo.dirigible.io
    cert.gardener.cloud/secretname: wildcard-tls
    dns.gardener.cloud/class: garden
    dns.gardener.cloud/dnsnames: '*.demo.dirigible.io'
    dns.gardener.cloud/ttl: "120"
```

2. Configure `Gateway` and `VirtualService` for Dirigible application or any.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: dirigible
spec:
  selector:
    istio: ingressgateway 
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    tls:
      httpsRedirect: true      
    hosts:
    - "app.demo.dirigible.io"
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: wildcard-tls
    hosts:
    - "app.demo.dirigible.io"    
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: dirigible
spec:
  hosts:
  - "app.demo.dirigible.io"
  gateways:
  - dirigible
  http:
  - match:
    - uri:
        regex: /.*
    route:
    - destination:
        host: dirigible
        port:
          number: 8080        
```

