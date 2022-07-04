const uConfig = require("../../utils/config.js");
const logging = require("../../utils/logging.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = [
	"status",
	async (msg, args) => {
		if(args.length === 0) {
			return "Invalid input";
		}
		const config = uConfig.getModule("ss14");
		if (config === 1) return "An error occured.";

		const connection = `http://${config[args[0]]["ip_address"]}:${config[args[0]]["port"]}/status`;
		let output;

		await fetch(connection)
		.then((res) => res.json())
		.then(function (json) {
			output = `**Name**: ${json.name}\n**Players**: ${json.players}`;
		}).catch(function(e) {
			logging.error(e);
			output = "An unknown error occurred.";
		});

		return output;
	},
	{
		description: "Make the bot say something",
		fullDescription: "The bot will echo whatever is after the command label.",
		usage: "<link_name>"
	}
]