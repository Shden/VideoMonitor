const walk = require('../walk');
const should = require('should');	// eslint-disable-line no-unused-vars
const util = require('util');

describe('Subdir traversal testing:', function() {

	/* depreciated */
	it.skip('Walk breathes', function(done) {
		walk.walk('NVRConnector/alerts', function(err, result) {
			result.should.be.ok();
			console.log(result);
			done();
		});
	});

	it('Walk2 breathes', function() {
		return walk.walk2('NVRConnector/alerts')
			.then(result => {
				result.should.be.ok();
				console.log(result);
			});
	});

	/* depreciated */
	it.skip('Walk3 breathes', function() {
		return walk.walk3('NVRConnector/alerts')
			.then(result => {
				result.should.be.ok();
				console.log(util.inspect(result, {showHidden: false, depth: null}));
			});
	});
});
