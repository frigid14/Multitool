module.exports = {
	meta: {
		name: "ping",
		desc: "Ping pong!"
	},
	async execute(bot, msg, args) {
		bot.createMessage(msg.channel.id, "Pong!");
	},
};