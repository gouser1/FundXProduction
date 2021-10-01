# FundX

A React based web application with a node serve for connecting businesses seeking investment to potentional investors

---

## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can do so with using `npm update`! After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Install

    $ git clone https://github.com/gouser1/FundXProduction
    $ cd fundXProduction
    $ npm install

## Finally, to install the client packages

    $ npm run clientInstall

## Configure app

Open `/index.js` then edit with your settings. You will need:

- Change the port you want Node to serve from on line 24

## Configure database

Open ``config/config.json` then edit it with your settings. You will need:

- Change the database connection fields matching your database connection information.
- For offline development and testing, simply change the development and test sections.
- For production, change the production section.

########### IMPORTANT NOTE: ###########
The default port for API calls in the application is 3001. If you need to change the port then you will have to change EVERY endpoint URL in components.
#######################################

## Running the project

    $ npm run devStart

## Simple build for production

    $ npm run build

## API Documentation

API documentation can be found at the following links:

NOTE: An Apimatic account is needed to view the documentation
Alternatively you can access the JSON files from the API documentation folder and open them in [Postman](https://www.postman.com/)

[Users API](https://www.apimatic.io/api-docs-preview/dashboard/615661fb2a2e7587ebc258f7/v/1_0#/http/step-by-step-tutorial) ||
[Pitches API](https://www.apimatic.io/api-docs-preview/dashboard/615662b52a2e7587ebc27014/v/1_0#/http/step-by-step-tutorial) ||
[Favourites API](https://www.apimatic.io/api-docs-preview/dashboard/615662f62a2e7587ebc272c6/v/1_0#/http/step-by-step-tutorial)
