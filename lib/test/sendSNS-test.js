const s = require('../sendSNS');
//const should = require('should'); 	// eslint-disable-line no-unused-vars

describe('AWS SNS tests:', function() {

	it('Can send message via SNS', function() {

		return s.sendMessage('Test SNS message.');

	});
});
