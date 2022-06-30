module.exports = [
	"ping",
	(msg, args) => {
		return `Pong.\nAPI ms: ${msg.timestamp - Date.now()}`;
	},
	{
		description: "Returns the ping of the bot",
		fullDescription: "Returns the API ms of the bot.",
		usage: ""
	}
]