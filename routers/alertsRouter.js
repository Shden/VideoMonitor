'use strict';

const express = require('express');
const alertsRouter = express.Router();
const path = require('path');

const directoryWalker = require('../lib/walk');
const fileNameDecoder = require('../lib/parsefiles');
const execp = require('../lib/execp');
const sendSNS = require('../lib/sendSNS');

const mediaDir = './NVRConnector/alerts/192.168.1.9_00121274a512';

// Get alerts list.
alertsRouter.get('/getList', (request, responce) => {
	directoryWalker.walk2('./NVRConnector/alerts')
	.then(result => {
		responce.json(fileNameDecoder.parse(result));
	});
});

// Get static media files.
alertsRouter.use('/media', express.static(mediaDir));

// Delete specified media file
alertsRouter.delete('/media/*', (request, responce) => {

	var filePattern = path.resolve(mediaDir, request.params[0] + '.*');
	filePattern = filePattern.replace(/\[/g, '\\[');
	filePattern = filePattern.replace(/]/g, '\\]');
	filePattern = filePattern.replace(/@/g, '\\@');

	console.log(filePattern);

	execp('rm ' + filePattern)
		.then(() => {
			responce.end();
		})
		.catch(err => {
			console.log(err);
			responce.status(400);
			responce.send(err);
		});
});

// Raise alarm on identified event.
alertsRouter.post('/raise', (request, responce) => {
	sendSNS.sendMessage(request.body);
	responce.end();
});

module.exports = alertsRouter;
