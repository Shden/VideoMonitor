'use strict';

var AWS = require('aws-sdk');

exports.sendMessage = function(message) {

	return new Promise((success, fail) => {

		AWS.config.update({
			accessKeyId	: 'AKIAIKZVF2AX64ANDW7Q',
			secretAccessKey	: '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',
			region		: 'us-west-2'
		});
		var sns = new AWS.SNS();

		var params = {
			Message 	: message,
			TopicArn	: 'arn:aws:sns:us-west-2:868904153427:test'
		};

		sns.publish(params, (err, data) => {
			if (err)
				fail(err);
			if (data) {
				console.log(data);
				success();
			}
		});
	});
};
