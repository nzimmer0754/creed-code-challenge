# CREED CODECHALLENGE

This application is to test an individuals knowledge of javascript/node.

## TECH STACK
Nodejs
Next.js
Firebase Firestore to manage the data

## Project Structure
    Nest.js was used to build this application
*   Api Layer
    * app.controller was created to handle the CRUD calls coming in getBest_Podcast

*   Services Layer
    * app.services establishes the connection with firebase and performs a get function to retrieve all of the data within the podcast collection. we then use the query parameters sent in to filter through the data brought back.

*   Domain layer
    * in the interface folder we have defined the domain models

* Data Layer
    *   firestore folder continas an import javascript that uploads a json file to the podcast database 
    * we defined the service account values to access the firebase api
    * we also initialize the firebase within the app.service

## Installation
Some machines do come preinstalled with node but if you don't have node installed run this on your 

* Mac Terminal install
    * download and installs Homebrew (macOS/Linux Package Manager)
        ```bash
        curl -o- https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | bash
        ```
    * download and install Node.js
        ```bash
        brew install node@20
        ```
    * verifies the right Node.js version is in the environment
        ```bash
        node -v # should print `v20.12.0`
        ```
    *  verifies the right NPM version is in the environment
        ```bash
        npm -v # should print `10.5.0`
        ```

* Download link
    * https://nodejs.org/en/download

After node is installed run 
* run ```bash npm install ```
    * This will install all packages listed in the package.json
    * Also run ```bash npm outdated ``` to get a list of outdated packages to make sure vulnerabilities are taking care of.
    * Recommended to update/upgrade packages individually to avoid breaking changes or not able to indicate which package upgrade broke what.

## Run Application
To properly test this application,
* run ```bash npm run start ```
    * this will run the application
* install Postman(to run application locally)
    * https://www.postman.com/downloads/
    * application will be running on http://localhost:3000
        * http://localhost:3000/podcasts/best_podcasts?page=1&region=us&safe_mode=true&genre_id=140

## Output - Results
![Page 1 get](../Screenshot_Page1.png)
![Page 2 get](../Screenshot_Page2.png)



