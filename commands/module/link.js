const uConfig = require("../../utils/config.js");

module.exports = [
	"link",
	(msg, args) => {
		if(args.length === 0) {
			return "Invalid input";
		}

		const config = uConfig.getModule("links");

		if (config === 1) return "An error occured.";
		return config[args[0]];
	},
	{
		description: "Make the bot say something",
		fullDescription: "The bot will echo whatever is after the command label.",
		usage: "<link_name>"
	}
]