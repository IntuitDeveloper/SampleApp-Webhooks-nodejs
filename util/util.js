var crypto = require('crypto'); // for validating payload
var config = require('../conf');

/**
 * Validates the payload with the intuit-signature hash
 */
function isValidPayload(signature, payload) {
	var hash = crypto.createHmac('sha256', config.webhooksverifier).update(payload).digest('base64');
	if (signature === hash) {
		return true;
	}
	return false;
}

module.exports.isValidPayload = isValidPayload;