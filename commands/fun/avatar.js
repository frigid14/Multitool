module.exports = [
	"avatar",
	(msg) => {
		const user = msg.mentions[0] || msg.author;
		return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
	},
	{
		description: "Returns the ping of the bot",
		fullDescription: "Returns the API ms of the bot.",
		usage: ""
	}
]