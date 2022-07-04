const toml = require('toml');
const path = require('path');
const fs = require('fs');

function readFile(path) {
	return fs.readFileSync(path, 'utf8');
}

function readConfig() {
	const env = process.env.NODE_ENV || 'development';

	if (env == 'development') {
		return toml.parse(readFile(path.join(__dirname, "../config/test.toml")));
	}
	return toml.parse(readFile(path.join(__dirname, "../config/main.toml")));
}

module.exports = {
	getConfig: readConfig
}