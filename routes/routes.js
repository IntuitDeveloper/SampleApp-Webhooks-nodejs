var util = require('../util/util');
var queue = require('../queue/queue');
var config = require('../conf');

var appRouter = function(app) {

	app.get('/', function(req, res) {
    	return res.send('Welcome to Intuit Webhooks Sample App');
	});

	 /**
     * Method to receive webhooks event notification 
     * 1. Validates payload
     * 2. Adds it to a queue
     * 3. Sends success response back
     * 
     * Note: Queue processing happens asynchronously
     */

	app.post('/webhooks', function(req, res) {

		var payload = JSON.stringify(req.body);
		var signature = req.get('intuit-signature')

		// if signature is empty return 401
		if (!signature) {
			return res.status(401).send('FORBIDDEN');
		}

		// if payload is empty, don't do anything
		if (!payload) {
			return res.status(200).send('success');
		}
		
		// validate signature
		if (util.isValidPayload(signature, payload)) {

			// add to queue
			queue.addToQueue(payload);
			console.log('task added to queue ');
		
			return res.status(200).send('success');
		} else {
			return res.status(401).send('FORBIDDEN');
		}

	});

}
module.exports = appRouter;