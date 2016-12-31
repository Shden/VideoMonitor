const p = require('../parsefiles');
const should = require('should'); 	// eslint-disable-line no-unused-vars
const util = require('util');		// eslint-disable-line no-unused-vars

describe('Parse filePath array tests:', function() {

	it('Parsing works', function() {

		const testArray = [
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-28/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-28/01/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-28/01/rec/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-28/01/rec/23.25.49-23.26.00[M][@cf9b][0].mp4',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-28/01/rec/23.27.05-23.27.17[M][@cf9d][0].mp4',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/01/.DS_Store',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/01/rec/00.07.53-00.08.04[M][@cf9f][0].mp4',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/01/rec/00.08.05-00.08.15[M][@cfa1][0].mp4',
			'/Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/01/rec/00.08.30-00.08.41[M][@cfa3][0].mp4' ];

		var res = p.parse(testArray);
		res.length.should.be.exactly(5);

	});
});
