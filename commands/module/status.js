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
			output = "An unknown error occurred.";
			if (e.name == 'FetchError') {
				output = "The ping did not reach the server. Possible cause: Malformed configuration or the desired server is offline.\n\nThis incident has been reported to Central Command."
			}
			logging.error(e);
		});

		return output;
	},
	{
		description: "Get the status of a server.",
		fullDescription: "The bot will get the status of a server set in the configuration.",
		usage: "<server_name>"
	}
]