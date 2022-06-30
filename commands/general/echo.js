module.exports = [
	"echo",
	(msg, args) => { // Make an echo command
		if(args.length === 0) { // If the user just typed "law 2 echo", say "Invalid input"
			return "Invalid input";
		}
		const text = args.join(" "); // Make a string of the text after the command label
		return text; // Return the generated string
	},
	{
		description: "Make the bot say something",
		fullDescription: "The bot will echo whatever is after the command label.",
		usage: "<text>"
	}
]