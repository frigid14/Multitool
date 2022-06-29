module.exports = {
	meta: {
		name: "beep",
		desc: "Beep."
	},
	async execute(bot, msg, args) {
		const messages = ["Beep.", "Boop.", "Beep-boop.", "Whirr."]
		const message = messages[Math.floor(Math.random()*messages.length)];
		bot.createMessage(msg.channel.id, message);
	},
};