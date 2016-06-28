# SampleApp-Webhooks-nodejs

<p>Welcome to the Intuit Developer's Webhooks Node.js Sample App.</p>
<p>This sample app is meant to provide working examples of how to integrate your app with the Intuit Small Business ecosystem.  Specifically, this sample application demonstrates the following:</p>

<ul>
	<li>Implementing webhooks endpoint to receive event notifications.</li>
	<li>Best practices to be followed while processing the event notifications.</li>
	<li>Sample code using QuickBooks Online SDK to call CDC API to sync data between the app and the QuickBooks Online company.</li>
</ul>

<p>Please note that while these examples work, features not called out above are not intended to be taken and used in production business applications. In other words, this is not a seed project to be taken cart blanche and deployed to your production environment.</p>  

<p>For example, certain concerns are not addressed at all in our samples (e.g. security, privacy, scalability). In our sample apps, we strive to strike a balance between clarity, maintainability, and performance where we can. However, clarity is ultimately the most important quality in a sample app.</p>

<p>Therefore there are certain instances where we might forgo a more complicated implementation (e.g. caching a frequently used value, robust error handling, more generic domain model structure) in favor of code that is easier to read. In that light, we welcome any feedback that makes our samples apps easier to learn from.</p>

## Table of Contents

* [Requirements](#requirements)
* [First Use Instructions](#first-use-instructions)
* [Running the code](#running-the-code)
* [Project Structure](#project-structure)
* [Reset the App](#reset-the-app)


## Requirements

In order to successfully run this sample app you need a few things:

1. Node.js
2. A [developer.intuit.com](http://developer.intuit.com) account
3. An app on [developer.intuit.com](http://developer.intuit.com) and the associated app token, consumer key, and consumer secret.
4. Two sandbox companies, connect both companies with your app and generate the oauth tokens.
 
## First Use Instructions

1. Clone the GitHub repo to your computer
2. Fill in the [`conf.js`](conf.js) values (consumer key, consumer secret) by copying over from the keys section for your app.
3. Fill in the [`conf.js`](conf.js) values (companyId, access token, access token secret) with the oauth tokens generated while connecting with the company. 
4. Also add webhooks subscribed entities and webhooks verifier token that was generated when you subscribed for webhoooks event.

## Running the code

Once the sample app code is on your computer, you can do the following steps to run the app:

1. cd to the project directory</li>
2. Run the command:`npm install` to load all dependencies from package.json </li>
3. Run the command:`node app.js`</li>
4. Wait until the terminal output displays the "Listening on port 8080..." message.
5. The webhooks endpoint in the sample app is http://localhost:8080/webhooks
6. To run the code on a different port, update config.port property in conf.js

## Project Structure

1. Endpoint implementation and processing logic is in [`routes.js`](routes.routes.js)
2. Queue implementation and processing logic is in [`queue.js`](queue.queue.js)
3. Database handling and processing logic is in [`db.js`](db.db.js)
4. Utility functions such as validating payload logic is in [`util.js`](util.util.js)
5. Constants and properties are declaired in [`conf.js`](conf.js)
6. Package dependencies are defined in package.json and extracted in [`node_modules`](node_modules) directory 


## Reset the App

This app uses non-persistant in-memory nedb database. The database is loaded during startup with realmId and oauth tokens. The database is read and updated when webhooks notification is processed. Stopping the server will delete the records.

