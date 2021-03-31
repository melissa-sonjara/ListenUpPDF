==Installation instructions==

This project provides Azure Service Functions to generate PDF and PNG representations of web pages. It must be run on an Azure Service Function with the following attributes:

Linux Consumption Plan
Node 14
Remote build

To deploy:

Load project into VS Code
Go to Azure view
Right click on function, select "Deploy to Function App..."
Select Advanced deployment
Choose:
    NodeJS 14
    Linux
    Consumption

The function will deploy and begin a remote build.
The function requires an application setting to be set:
    PLAYWRIGHT_BROWSERS_PATH=0

If this setting isn't pulled through on the initial deployment, add it as an Application Setting to the deployed function and redeploy.

To test, run the following in a browser:

https://<function domain>/api/GeneratePNG?url=https://listenup.sonjara.com/index
https://<function domain>/api/GeneratePDF?url=https://listenup.sonjara.com/index

Once running, add the domain settings to your Listen Up Web Platform App.
