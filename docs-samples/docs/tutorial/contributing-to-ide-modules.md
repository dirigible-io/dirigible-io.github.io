# Contributing to IDE Modules

All IDE modules are located in the [DirigibleLabs](https://github.com/dirigiblelabs) GitHub organization.
    
!!! info "Prerequisites"
    - Make sure you have permissions to commit in **DirigibleLabs**.
    - PR are also accepted.

1. Commit change to **DirigibleLabs** organization:
    - Go to [DirigibleLabs](https://github.com/dirigiblelabs) and copy the url link to the IDE project you will add changes.
    - Start locally your dirigible (http://localhost:8080/). 
    - Go to `Git` perspective and click on  `Clone  Project` button
    - Enter the `URL` of the IDE project and click `Clone`.
    - The project will appear under the git project list.
    - Go to `Workspace` perspective and make your changes, by using the right click on the project with `Publish`, apply the changes and test them `locally`.
    - After the changes are tested you can submit them.
    - Open the `Git` perspective again, click on the project and `Stage` the changed files, using the down arrow button `Add to Index`.
    - Enter `Commit Message`.
    - Enter your `Username`, `Email`, `Password` and click `Commit and Push`.
        - In case of `two-factor authentication`, for the `Password` field use your `Personal Access Token (PAT)`.
    - Go in [DirigibleLabs](https://github.com/dirigiblelabs) and check if your changes were committed.
 
2. Commit change to **Eclipse Dirigible** repository:
    - Go in your local [Eclipse Dirigible](https://github.com/eclipse/dirigible) git repository.
    - Execute `mvn clean install -P content` for the ide module, that contains your changes.
    - Execute `mvn clean install` in the same module.
    - You should see your changes that you already committed in the DirigibleLabs project.
    - Commit and push only the changed files.

!!! info "How to generate and get my personal access token"
    - [Creating a personal access token - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).
    - Select all scopes.
    - Save your token somewhere because, after you navigate off the page, you will not be able to see the token again.
 
