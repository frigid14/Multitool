const toml = require('toml');
const path = require('path');
const concat = require('concat-stream');
const fs = require('fs');

function readFile(path) {
	fs.createReadStream(path, 'utf8').pipe(concat(function(data) {
		return data;
	}));
}

function readConfig() {
	const env = process.env.NODE_ENV || 'development';

	if (env == 'development') {
		return toml.parse(readFile(path.join(__dirname, "../config/test.toml")));
	}
	return toml.parse(readFile(path.join(__dirname, "../config/main.toml")));
}

module.exports = readConfig;