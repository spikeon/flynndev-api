# FlynnDev - API
This is the project file for the website you are currently using.  The frontend server is no longer active as it has been replaced by the Flynndev - React project.  

Please, take a look at the files and see how it runs!

## Project API

The Project API pulls from the file structure of the server that it is hosted on.  It reads for folders in specific locations, and then reads the package.json file within that folder to get most of the data for that project.  It also looks for specifically named images to use for the thumbnail and gallery.

It also serves the file structure and file content for the projects through the API so that they can be displayed in the portfolio. A project level file '.projectignores' provides a list of file patterns to be ignored

The ABOUT.md and README.md files are converted from MarkDown to HTML and sent along through the API as well so they can be displayed in the portfolio.

The server is setup to populate the file system using bare git repositories and post-receive hooks.  All the developer has to do to update the project in the portfolio is to push to the special git repo that resizes on this server.

