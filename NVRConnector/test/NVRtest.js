var test = require('unit.js');
var NVR = require('../NVR.js');

describe('NVR ancilary functions tests', function() {

  it('parseNVRFileName() function parses input', function() {

		var testFileName = '/alerts/192.168.1.9_00121274a512/2016-03-28/01/rec/23.19.52-23.20.19[M][@cf96][0].h264';

		var res = NVR.parseNVRFileName(testFileName)
		
		test
			.object(res)
				.hasProperty('startDate')
				.hasProperty('endDate')
				.hasProperty('camNo', 1)
				.hasProperty('fileName', '23.19.52-23.20.19[M][@cf96][0].h264')
		
			.date(res.startDate)
				.is(new Date(2016, 3, 28, 23, 19, 52))
		
			.date(res.endDate)
				.is(new Date(2016, 3, 28, 23, 20, 19))
		;
  });
});