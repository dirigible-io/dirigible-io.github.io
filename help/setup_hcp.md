---
layout: help
title: SAP HANA Cloud Platform
icon: none
group: help-setup
---

Setup on HANA Cloud Platform
===



Deploy on the [SAP HANA Cloud Platform](https://account.hana.ondemand.com/) with the [Cloud SDK](https://tools.hana.ondemand.com/#cloud).

Prerequisites
---

- [Account in SAP HANA Cloud Platform](https://help.hana.ondemand.com/help/frameset.htm?65d74d39cb3a4bf8910cd36ec54d2b99.html)
- [SAP HANA Cloud Platform SDK](https://tools.hana.ondemand.com/#cloud)

Steps
---

1. Go to the `neo-java-web-sdk-1.xxx/tools` SDK folder.
2. Deploy with the command:

        neo deploy --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --source <source_directory> --password <your_password>

3. Start with the command:

        neo start --account <your_account> --application <application_name> --user <your_user> --host <target_landscape_host> --password <your_password> -y

4. Go to `https://account.hanatrial.ondemand.com/cockpit` and to the Authorizations section. Add Developer and Operator roles to your user to get full access to all features.
