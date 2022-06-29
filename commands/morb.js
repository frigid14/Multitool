module.exports = {
	meta: {
		name: "morb",
		desc: "Morb."
	},
	async execute(bot, msg, args) {
		bot.createMessage(msg.channel.id, `No.`);
	},
};