
var config = {};

//sandbox app config
config.consumerKey = '';
config.consumerSecret = '';

//sandbox verifier token
config.webhooksverifier = '';

//change port number as needed
config.port = 8080;

// sandbox company config
config.company1 = {};
config.company1.companyId = '';
config.company1.accessToken = '';
config.company1.accessTokenSecret = '';
//add more entities if required
config.company1.webhooksSubscribedEntites = 'Customer,Vendor';

/** 
* if you want to test with only one company, 
* comment the next 5 lines below and modify db/db.js to load only one company
*/
config.company2 = {};
config.company2.companyId = '';
config.company2.accessToken = '';
config.company2.accessTokenSecret = '';
config.company2.webhooksSubscribedEntites = 'Customer,Vendor';

module.exports = config;