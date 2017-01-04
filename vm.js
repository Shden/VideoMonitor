'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const package_configuration = require('./package.json');

const startNVRConnector = require('./NVRConnector/NVRConnector.js');

const app = express();
const compiler = webpack(webpackConfig);
const path = require('path');

// Routers:
const configurationRouter = require('./routers/configRouter.js');
const alertsRouter = require('./routers/alertsRouter.js');

// Webpack packager on the fly:
app.use(webpackDevMiddleware(compiler, {
	publicPath: '/build'
}));

app.use(bodyParser.json());

// API: alerts router
app.use('/alerts', alertsRouter);

// API: configuration router
app.use('/configuration', configurationRouter);

// Web UI
// TODO: change mount point
app.get('*', (request, responce) => {
	responce.sendFile(path.join(__dirname + '/index.html'));
});

startNVRConnector();

var server_port = process.env.OPENSHIFT_NODEJS_PORT ||
	package_configuration.config.port;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP ||
	package_configuration.config.host;

app.listen(server_port, server_ip_address, function () {
	console.log(`Video Monitoring App is on ${server_ip_address}, port ${server_port}.`);
});
