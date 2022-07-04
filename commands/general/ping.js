module.exports = [
	"ping",
	(msg) => {
		return `Pong.`;
	},
	{
		description: "Returns the ping of the bot",
		fullDescription: "Returns the API ms of the bot.",
		usage: ""
	}
]