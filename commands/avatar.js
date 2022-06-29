module.exports = {
	meta: {
		name: "avatar",
		desc: "Get the profile picture of somebody!"
	},
	async execute(bot, msg, args) {
		const user = msg.mentions[0] || msg.author;
		bot.createMessage(
			msg.channel.id,
			`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
		);
	},
};