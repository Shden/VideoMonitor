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

app.listen(package_configuration.config.port, function () {
	console.log('Video Monitoring App is on port ' + package_configuration.config.port);
});
