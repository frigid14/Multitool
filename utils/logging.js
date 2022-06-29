const { createLogger, format, transports } = require("winston");
 
const logLevels = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4,
	trace: 5,
};
 
module.exports = createLogger({
	levels: logLevels,
	transports: [new transports.Console()],
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.align(),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	)
});
