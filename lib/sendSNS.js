'use strict';

var AWS = require('aws-sdk');

exports.sendMessage = function(message) {

	return new Promise((success, fail) => {

		AWS.config.update({
			accessKeyId	: '--',
			secretAccessKey	: '--',
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
