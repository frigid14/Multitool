module.exports = [
	"beep",
	(msg, args) => { // Make an echo command
		const messages = ["Beep.", "Boop.", "Beep-boop.", "Whirr."]
		return messages[Math.floor(Math.random() * messages.length)];;
	},
	{
		description: "Beep. Boop. Beep-boop. Whirr.",
		fullDescription: "Chooses a random beep.",
		usage: ""
	}
]