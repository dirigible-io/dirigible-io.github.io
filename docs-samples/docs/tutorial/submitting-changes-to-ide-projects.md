# Submitting changes to IDE projects

All IDE projects are located  in [Dirigible Labs (github.com)](https://github.com/dirigiblelabs) repository.
 
 Make sure you have permissions to commit in DirigibleLabs.

 1. **Commit change to DirigibleLabs projects**

 - Go to [Dirigible Labs (github.com)](https://github.com/dirigiblelabs)
   and copy the url link to the ide project you will add changes.
 - Start locally your dirigible (http://localhost:8080/). 
 - Go to GIT perspective and click on  'clone  project' button
 - Enter the URL of the ide project and click clone. The project will appear under the git project list.
 - Go to Workspace perspective and make your changes, by using the right click on the project with Publish, apply the changes and test them locally.
 - After the changes are tested you can submit them.
 - Open Git perspective again, click on the project and stage the changed files, using the down arrow button 'Add to Index'
 - Enter commit message.
 - Enter you username, email, and for the password use your Personal generated Access Token and click 'Commit and Push'. See the next section how to get access token if you do not have one.
 - Go in [Dirigible Labs (github.com)](https://github.com/dirigiblelabs) and check if your changes were committed.
 
 2. **Commit change to Dirigible projects**
 - Go in your local dirigible project
 - Execute 'mvn clean install -Pcontent' for the ide project
 - Execute 'mvn clean install'
 - You should see your changes that you already committed in DirigibleLabs project.
 - Commit only the changed files.
 
 
 ## How to generate and get my personal access token
 [Creating a personal access token - GitHub Docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
 Notes: choose all scopes.
 Notes: Save your token somewhere because, after you navigate off the page, you will not be able to see the token again.
 