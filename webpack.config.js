var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build');
var SRC_DIR = path.resolve(__dirname, 'webConsole');

module.exports = {
	entry: ['whatwg-fetch', SRC_DIR + '/index.js'],
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module : {
		loaders : [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015'],
				plugins: [
					//'transform-object-rest-spread',
					'transform-es2015-modules-commonjs'//,
					//'transform-class-properties'
				]
			}
		}]
	},
	devServer: {
		open: true,
		contentBase: BUILD_DIR
	},
};
