'use strict';

// /Users/den/ShHarbor/videoMonitoring/NVRConnector/alerts/192.168.1.9_00121274a512/2016-03-29/01/rec/00.07.53-00.08.04[M][@cf9f][0].mp4
exports.parse = function(fileNames) {

	return fileNames.map(filePath => {

		var leftRight = filePath.split('/alerts/192.168.1.9_00121274a512/');
		if (leftRight.length == 2) {
			var pathSegments = leftRight[1].split('/');
			if (pathSegments.length == 4) {

				var fileName = pathSegments[3];

				var fileNameSegments =
					fileName.match(/(\d{2}).(\d{2}).(\d{2})-(\d{2}).(\d{2}).(\d{2}).*(\.\w{2,4})/);

				if (fileNameSegments && fileNameSegments[7] == '.mp4') {

					// hardcode MSK time zone
					var startTime = 'T' +
						fileNameSegments[1] + ':' +
						fileNameSegments[2] + ':' +
						fileNameSegments[3] + '.000+03:00';
					var finishTime = 'T' +
						fileNameSegments[4] + ':' +
						fileNameSegments[5] + ':' +
						fileNameSegments[6] + '.000+03:00';

					var startDate = new Date(pathSegments[0] + startTime);
					var finishDate = new Date(pathSegments[0] + finishTime);

					var fileURL = ('/alerts/media/' + leftRight[1]).replace('.mp4', '');

					return {
						fileURL : fileURL,
						start : startDate,
						finish : finishDate,
						cam : parseInt(pathSegments[1])
					};
				}
			}
		}
	})
	.filter(value => { return typeof(value) !== 'undefined'; })
	.sort((a, b) => {

		var ad = new Date(a.start);
		var bd = new Date(b.start);

		if (ad > bd)
			return 1;
		if (ad < bd)
			return -1;

		return 0;
	});
		// console.log(`${ad.toLocaleString()} > ${bd.toLocaleString()} res: ${ad > bd}`);
		// return +ad > +bd; });
};
