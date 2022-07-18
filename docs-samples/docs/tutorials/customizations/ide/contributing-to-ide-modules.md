---
title: Contributing to IDE Modules
---

Contributing to IDE Modules
===

All IDE modules are located in the [DirigibleLabs](https://github.com/dirigiblelabs) GitHub organization. Sample repositories, used for showing how to create Dirigible modules, start with `sample-`.

!!! info "Prerequisites"
    - Make sure you have permissions to commit in **DirigibleLabs**.
    - PR are also accepted.

1. Commit change to **DirigibleLabs** organization:
    - Go to [DirigibleLabs](https://github.com/dirigiblelabs) and copy the url to the IDE project you will contribute to.
    - Start dirigible locally (http://localhost:8080/). You can find more information on how to do that [here](https://www.dirigible.io/help/development/).
    - Go to the `Git` perspective and click on  `Clone  Project` button.
    - Enter the `URL` of the IDE project and click `Clone`.
    - The project will appear under the git project list.
    - Go to the `Workspace` perspective and make your changes. To be 100% sure all changes are saved and applied, right click on the project and select `Publish`. Now you can test the changes locally.
    - After the changes are tested you can submit them.
    - Open the `Git` perspective, click on the project and select the `Stage` tab. Select the changed files and use the down arrow button to stage them.
    - Enter `Commit Message`.
    - Enter your `Username`, `Email`, `Password` and click `Commit and Push`.
        - In case your profile has `two-factor authentication`, for the `Password` field use your GitHub `Personal Access Token (PAT)`. See the additional info below.
    - Go to the IDE project github page and make sure your changes were committed.

2. Commit change to **Eclipse Dirigible** repository:
    - Fork the [Eclipse Dirigible](https://github.com/eclipse/dirigible) git repository into your account.
    - Pull the forked project locally.
        - If you have done this before and now have to push new changes, make sure to checkout the `master` branch, fetch all changes from the original repository in GitHub and pull them locally.
    - Checkout to a new branch by giving it either a topic name or a name starting with `fix-` followed by the issue number.
    - Execute `mvn clean install -Pcontent` in the ide module root directory. You can also execute this for the whole project but that will pull the changes from all modules.
    - Execute `mvn clean install` in the same module.
    - You should see your changes that you already committed in the DirigibleLabs project.
    - Add, commit and push only the files that you have changed. When committing, never forget to sign off you commit  using the `-s` argument. You can use the `git status` command, to see all changed files.
    - Create a PR to the master branch.

!!! info "How to generate and get my personal access token"
    - [Creating a personal access token - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
    - Select all scopes.
    - Copy and save your token, because after you navigate off the page, you will not be able to see the token again.