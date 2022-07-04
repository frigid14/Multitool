const uConfig = require("../../utils/config.js");

module.exports = [
	"link",
	(msg, args) => {
		if(args.length === 0) {
			return "Invalid input";
		}

		const config = uConfig.getModule("links");

		if (config === 1) return "An unkown error occured.\n\nThis incident has been reported to Central Command.";
		return config[args[0]];
	},
	{
		description: "Make the bot return a desired link.",
		fullDescription: "The bot will return the set link in the configuration..",
		usage: "<link_name>"
	}
]