---
layout: help
title: HANA Cloud Platform
icon: fa-cogs
group: help-setup
---

Setup on HANA Cloud Platform
===


#### HANA Cloud Platform

Deploy on [HANA Cloud Platform](https://account.hana.ondemand.com/) with the [Cloud SDK](https://tools.hana.ondemand.com/#cloud).

##### Prerequisites

- [HANA Cloud Platform SDK](https://tools.hana.ondemand.com/#cloud)

##### Steps

1. Go to the `neo-java-web-sdk-1.xxx/tools` SDK folder.
2. Deploy with command:

        neo deploy --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --source <source_directory> --password <your_password>

3. Start with command:

        neo start --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --password <your_password> -y

4. Go to https://account.hanatrial.ondemand.com/cockpit at Authorizations section. Add Developer and Operator role to your user which gives you full access to all features.