var express = require('express');
var configurationRouter = express.Router();

const appConfiguration = require('../appConfiguration/config.js');

// Get current house status
configurationRouter.get('/houseStatus', (request, responce) => {
	responce.json({ houseStatus: appConfiguration.getHouseStatus() });
});

// Update house status
configurationRouter.put('/houseStatus/:newStatus', (request, responce) => {
	appConfiguration.setHouseStatus(request.params.newStatus)
	.then(() => {
		responce.json({ houseStatus: appConfiguration.getHouseStatus() });
	})
	.catch((err) => {
		responce.status(400);
		responce.send(err);
	});
});

module.exports = configurationRouter;
