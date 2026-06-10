---
title: Azure DNS
---

Create Google DNS Zone Setup
===


::: info Prerequisites
- Install [Azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).
:::
## Steps
---

1. Create a resource group
            
    ```
    az group create \
    --name DirigibleResourceGroup \
    --location &lt;your-location&gt;
    ```

1. Create static public IP address
    
    ```
    az aks show \
    --resource-group DirigibleResourceGroup \
    --name dirigible \
    --query nodeResourceGroup \
    -o tsv
    ```

    After you run the previus command you will receive `MC_....` and add to next command.

    ```
    az network public-ip create \
    --resource-group MC_DirigibleResourceGroup_dirigible_&lt;your-location&gt; \
    --name PublicIP \
    --sku Standard \
    --allocation-method static \
    --query publicIp.ipAddress \
    -o tsv
    ```

1. Create DNS zone

    ```
    az network dns zone create \
    -g DirigibleResourceGroup \
    -n dirigible.io
    ```

1. Create DNS Record

    * Get ip address

    `kubectl get svc -n istio-ingress istio-ingressgateway -o jsonpath="{.status.loadBalancer.ingress[0].ip}"`

    * Set A dns record

    ```
    az network dns record-set a add-record \
    -g DirigibleResourceGroup \
    -z &lt;your-domain&gt; \
    -n dirigible \
    -a &lt;the-ip-from-previous-step&gt;
    ```
