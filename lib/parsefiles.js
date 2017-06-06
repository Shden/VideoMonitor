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
					var startDate = new Date(pathSegments[0] + "T00:00:00.000-03:00");
					var finishDate = new Date(pathSegments[0] + "T00:00:00.000-03:00");

					startDate.setHours(
						parseInt(fileNameSegments[1]),
						parseInt(fileNameSegments[2]),
						parseInt(fileNameSegments[3])
					);

					finishDate.setHours(
						parseInt(fileNameSegments[4]),
						parseInt(fileNameSegments[5]),
						parseInt(fileNameSegments[6])
					);

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
