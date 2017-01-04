'use strict';

const fs = require('fs');
const path = require('path');

const configurationFileName = path.join(__dirname, 'config-data.js');

module.exports = {

	getHouseStatus: function() {

		var configuration = readConfig();
		return configuration.houseStatus;
	},

	setHouseStatus: function(state) {

		return new Promise((resolved, rejected) => {

			if (state !== 'presence' && state !== 'standby') {
				rejected(`Invalid house state value: ${state}.`);
				return;
			}

			var configuration = readConfig();
			configuration.houseStatus = state;

			fs.writeFile(
				configurationFileName,
				JSON.stringify(configuration, null, 4),
				(error) => {
					if (error)
						rejected(error);
					else
						resolved();
				}
			)
		});
	}
};

function readConfig() {

	return JSON.parse(fs.readFileSync(configurationFileName, 'utf8'));
}
