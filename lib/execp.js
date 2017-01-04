'use strict'; 

const exec = require('child_process').exec;

/**
 * Promisified child_process.exec
 *
 * @param cmd
 * @param opts See child_process.exec node docs
 * @param {stream.Writable} opts.stdout If defined, child process stdout will be piped to it.
 * @param {stream.Writable} opts.stderr If defined, child process stderr will be piped to it.
 *
 * @returns {Promise<{ stdout: string, stderr: stderr }>}
 */
function execp(cmd, opts) {
	opts || (opts = {});
	return new Promise((resolve, reject) => {
		const child = exec(cmd, opts,
			(err, stdout, stderr) => err ? reject(err) : resolve({
				stdout: stdout,
				stderr: stderr
			}));

		if (opts.stdout) {
			child.stdout.pipe(opts.stdout);
		}
		if (opts.stderr) {
			child.stderr.pipe(opts.stderr);
		}
	});
}

module.exports = execp;
