const logger = require("./logging.js");
const toml = require('toml');
const path = require('path');
const fs = require('fs');

function readFile(path) {
	return fs.readFileSync(path, 'utf8');
}

function readConfig() {
	const env = process.env.NODE_ENV || 'development';
	let file = path.join(__dirname, "../config/main.toml")

	if (env == 'development') {
		file = path.join(__dirname, "../config/test.toml");
	}

	try {
		return toml.parse(readFile(file));
	} catch (e) {
		logger.error("Parsing error on line " + e.line + ", column " + e.column + ": " + e.message);
		return 1;
	}
}

function getModule(module) {
	const config = readConfig();

	if (config["module"]) {
		if (config.module[module]) {
			return config.module[module]
		} else { logger.error(`Specified module not found.`); return 1;}
	} else { logger.error("No module set up."); return 1;}
}

module.exports = {
	getConfig: readConfig,
	getModule: getModule
}