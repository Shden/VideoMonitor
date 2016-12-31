var fs = require('fs');
var path = require('path');

// exports.walk = function(dir, done) {
// 	var results = [];
// 	fs.readdir(dir, function(err, list) {
// 		if (err)
// 			return done(err);
// 		var pending = list.length;
// 		if (!pending)
// 			return done(null, results);
// 		list.forEach(function(file) {
// 			file = path.resolve(dir, file);
// 			fs.stat(file, function(err, stat) {
// 				if (stat && stat.isDirectory()) {
// 					exports.walk(file, function(err, res) {
// 						results = results.concat(res);
// 						if (!--pending)
// 							done(null, results);
// 					});
// 				} else {
// 					results.push(file);
// 					if (!--pending)
// 						done(null, results);
// 				}
// 			});
// 		});
// 	});
// };

exports.walk2 = function(dir) {

	return new Promise((resolved, rejected) => {

		var results = [];
		fs.readdir(dir, (err, list) => {
			if (err)
				rejected(err);
			var pending = list.length;
			if (!pending)
				resolved(results);
			list.forEach(fileName => {
				fileName = path.resolve(dir, fileName);
				fs.stat(fileName, (err, stat) => {
					if (err)
						rejected(err);
					if (stat && stat.isDirectory()) {
						exports.walk2(fileName)
						.then(res => {
							results = results.concat(res);
							if (!--pending)
								resolved(results);
						});
					}
					else {
						results.push(fileName);
						if (!--pending)
							resolved(results);
					}
				});
			});
		});
	});
};

// exports.walk3 = function(dir) {
//
// 	return new Promise((resolved, rejected) => {
//
// 		var results = { path, dirs: [], files: [] };
// 		results.path = path.resolve(dir);
//
// 		fs.readdir(dir, (err, list) => {
// 			if (err)
// 				rejected(err);
// 			var pending = list.length;
// 			if (!pending)
// 				resolved(results);
// 			list.forEach(fileName => {
// 				var fullPath = path.resolve(dir, fileName);
// 				fs.stat(fullPath, (err, stat) => {
// 					if (err)
// 						rejected(err);
// 					if (stat && stat.isDirectory()) {
// 						exports.walk3(fullPath)
// 						.then(res => {
// 							results.dirs = results.dirs.concat(res);
// 							if (!--pending)
// 								resolved(results);
// 						});
// 					}
// 					else {
// 						results.files.push(fileName);
// 						if (!--pending)
// 							resolved(results);
// 					}
// 				});
// 			});
// 		});
// 	});
// };
