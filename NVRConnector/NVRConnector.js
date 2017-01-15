'use strict';

var 	ftpd = require('./nodeftpd/ftpd'),
	http = require('http'),
	fs = require('fs'),
	path = require('path'),
	execp = require('../lib/execp'),
	configuration = require('../appConfiguration/config.js'),
	package_configuration = require('../package.json'),
	keyFile,
	certFile,
	server,
	options = {
		host : process.env.OPENSHIFT_NODEJS_IP || package_configuration.config.host,
		port : process.env.PORT || package_configuration.config.ftp.port,
		tls  : null
	};

function startNVRConnector() {
	if (process.env.KEY_FILE && process.env.CERT_FILE) {
		console.log('Running as FTPS server');
		if (process.env.KEY_FILE.charAt(0) !== '/') {
			keyFile = path.join(__dirname, process.env.KEY_FILE);
		}
		if (process.env.CERT_FILE.charAt(0) !== '/') {
			certFile = path.join(__dirname, process.env.CERT_FILE);
		}
		options.tls = {
			key:	fs.readFileSync(keyFile),
			cert:	fs.readFileSync(certFile),
			ca: 	!process.env.CA_FILES ? null : process.env.CA_FILES
					.split(':')
					.map(function (f) {
						return fs.readFileSync(f);
					})
		};
	}
	else {
		console.log('*** To run as FTPS server,                 ***');
		console.log('***  set "KEY_FILE", "CERT_FILE"           ***');
		console.log('***  and (optionally) "CA_FILES" env vars. ***');
	}

	server = new ftpd.FtpServer(options.host, {
		getInitialCwd : function () {
			return '/NVRConnector/alerts/';
		},
		getRoot : function () {
			return process.cwd();
		},
		pasvPortRangeStart 	: 1025,
		pasvPortRangeEnd   	: 1050,
		tlsOptions		: options.tls,
		allowUnauthorizedTls	: true,
		useWriteFile		: false,
		useReadFile		: false,
		uploadMaxSlurpSize	: 7000 // N/A unless 'useWriteFile' is true.
	});

	server.on('error', function (error) {
		console.log('FTP Server error:', error);
	});

	server.on('client:connected', function(connection) {
		var username = null;
		console.log('client connected: ' + connection.remoteAddress);

		connection.on('command:user', function(user, success, failure) {
			if (user == 'nvr') {
				username = user;
				success();
			} else {
				failure();
			}
		});

		connection.on('command:pass', function(pass, success, failure) {
			if (pass) {
				success(username);
			} else {
				failure();
			}
		});

		connection.on('file:stor', function(action, fileInfo) {

			if (action == 'open') {
				if (configuration.getHouseStatus() != 'standby') {
					console.log('Alarms are skipped when status is not standby.');
					var self = this;
					if (self.dataSocket) {
						self._closeSocket(self.dataSocket, true);
					}
					self.respond('426 Connection closed; transfer aborted');
				}
			}

			if (action == 'close') {

				var h264FileName = path.join(process.cwd(), fileInfo.file);

				console.log('File received: ' + h264FileName);
				console.log('Alarm recorded.');

				// convert .h264 to .mp4 video
				var mp4FileName = process.cwd() + '/' + fileInfo.file.replace('.h264', '.mp4');
				var h264toMp4Cmd = process.cwd() + '/NVRConnector/ffmpeg/ffmpeg -f h264 -i ' + h264FileName + ' -c:v copy ' + mp4FileName;

				// convert .h264 to .jpg preview
				// ./ffmpeg -i ../alerts/192.168.1.9_00121274a512/2016-12-18/01/rec/19.55.58-19.56.09\[M\]\[\@137c5\]\[0\].mp4 -vf thumbnail,scale=300:200 -frames:v 1 out.jpg
				var jpgFileName = process.cwd() + '/' + fileInfo.file.replace('.h264', '.jpg');
				var mp4toJpgCmd = process.cwd() + '/NVRConnector/ffmpeg/ffmpeg -i ' + mp4FileName + ' -vf thumbnail,scale=256:144 -frames:v 1 ' + jpgFileName;

				execp(h264toMp4Cmd)
					.then(() => { execp(mp4toJpgCmd); })
					.then(() => { execp('rm ' + h264FileName); })
					.then(() => { raiseAlarm({ data: 'test data for now'}); })
					.catch(err => { console.error(err); });
			}
		});
	});

	server.debugging = 4;
	server.listen(options.port);
	console.log('NVRConnector is listening on port: ' + options.port);
}

module.exports = startNVRConnector;

// Raise alarm with supplementary information.
function raiseAlarm(alarm)
{
	return new Promise((resolved, rejected) => {
		var request = http.request({
			host: package_configuration.config.host,
			port: package_configuration.config.port,
			path: '/alerts/raise',
			method: 'POST'
		}, responce => {
			var data = '';
			responce.on('data', b => {
				data += b;
			});
			responce.on('end', () => {
				if (responce.statusCode === 200)
					resolved();
				else {
					console.log(data);
					rejected(responce.statusCode);
				}
			});
			responce.on('error', err => {
				console.log(err);
				rejected(err);
			});
		});
		request.write(
			JSON.stringify(alarm, null, 4),
			'utf8');
		request.end();
	});
}
