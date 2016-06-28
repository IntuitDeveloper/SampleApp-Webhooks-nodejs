var moment = require('moment');
var Datastore = require('nedb'); // for in memory database
var config = require('../conf'); // constants file

var db = new Datastore();

var company1 = { companyId: config.company1.companyId, 
		    accessToken: config.company1.accessToken,
		    accessTokenSecret: config.company1.accessTokenSecret,
		    webhooksSubscribedEntites : config.company1.webhooksSubscribedEntites,
	        lastCdcTimestamp : moment().format()
	    },
	company2 = { companyId: config.company2.companyId, 
		    accessToken: config.company2.accessToken,
		    accessTokenSecret: config.company2.accessTokenSecret,
		    webhooksSubscribedEntites : config.company2.webhooksSubscribedEntites,
	        lastCdcTimestamp : moment().format()
	};

	/**
	 * Loads the database with company configs (realmid and access tokens) from conf.js
	 */
	db.insert([company1, company2], function (err, newDoc) {   
		if (err) {
			return console.log(err);
		}
		console.log('company configs inserted into database');
	});

module.exports.db = db;