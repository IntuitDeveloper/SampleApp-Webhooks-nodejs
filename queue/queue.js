var async = require('async'); // for queue implementation
var QuickBooks = require('node-quickbooks'); // quickbooks sdk
var moment = require('moment');
var config = require('../conf'); // constants file
var database = require('../db/db.js'); // database operations

/**
 * Manages a queue and executes a single async thread to process 
 * the queue whenever an item is added to the queue
 *
 */

// creating a queue with concurrency 1
var q = async.queue(function (task, callback) {
    processTask(task);
    callback();
}, 1);

function addToQueue(payload) {
	q.push(payload);
}

/**
 * Process the queue task
 * 1. Retrieves the realmId from the payload 
 * 2. Queries the database to get the last CDC performed time and auth keys for the realmId
 * 3. Performs CDC for all the subscribed entities using the lastCDCTime retrieved in step 2
 * 4. Updates the database record with the last CDC performed time for the realmId - time when step 3 was performed
 *
 */
function processTask(task) {
	console.log('processing task in queue');

	// get realm id from payload
	var data = JSON.parse(task);
	if (data && data.eventNotifications) {
	
		var realmId = data.eventNotifications[0].realmId;
		
		// get company config
		database.db.find({ companyId: realmId }, function (err, company) {

			if (err) {
				return console.log(err);
			} else {	   		
	   			console.log('calling CDC');
	   			var qbo = new QuickBooks(config.consumerKey,
	                         config.consumerSecret,
	                         company[0].accessToken,
	                         company[0].accessTokenSecret,
	                         company[0].companyId,
	                         true, // set to false for prod
	                         false); // enable logs

	   			// call CDC
		   		qbo.changeDataCapture(company[0].webhooksSubscribedEntites, company[0].lastCdcTimestamp, function(err, data) {
				  if (err) {
				  	return console.log(err);
				  } else {
				  	console.log('CDC complete');
				  	
				  	//update timestamp
				  	database.db.update({ companyId: realmId }, { $set:{lastCdcTimestamp: data.time}}, {});
				  	console.log('completed update for realmId ' + realmId);
				  	console.log('queue task complete');
				  }
				});
		   	}
		});
	}
	
}
module.exports.addToQueue = addToQueue;