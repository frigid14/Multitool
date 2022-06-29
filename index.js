const Eris = require("eris");
const commands = [];
const prefix = "law 2 ";
const path = require("path");
const fs = require("fs");
require('dotenv').config();

if (process.versions.node.split(".")[0] < 17) {
	console.error(`You are currently running Node.js version ${process.version}.
	Multitool requires Node.js version 17 or above.
	Now exiting.`);
	process.exit(1);
}

console.log(`
	BBBBBB   #BBB########BBB#   BBBBBB                                 
	&&&&&&&&#55555P&&&GPPPPPPPPPPPPPPG&&&P55555#&&&&&&&&                        
   BPPPPPPPPPYYYYYYPPPGGGP55PPPP55PGGGPPPYYYYYYPPPPPPPPPB                       
#BB5??JJJYPP5YYJ???YYYPGGPPPP55PPPPGGPYYY???JYY5PPYJJJ??5BB#                    
G5PJ!!7?7JP55JJJ???YYYPGGGGGPPPPGGGGGPYYY???JJJ55PJ7?7!!JP5G                    
GPPJ!!?JJJYYJ7!7PPPPPPGGGPPPPGGPPPPGGGPPPPPP7!7JYYJJJ?!!JPPG                    
GPPY???77?555YYY???5PPGGGPPPPGGPPPPGGGPP5???YYY555?77???YPPG                    
BGG5YYJ??JPPPPP57775PPGGGPPPPGGPPPPGGGPP57775PPPPPJ??JYY5GGB                    
   BPPPPPP555PP5?7?5PPGGGGGGPPPPGGGGGGPP5?7?5PP555PPPPPPB                       
   B555PPG&#&&&#JJJ???5PPPPPY??YPPPPP5???JJJ#&&&#&GPP555B                       
&#&BGGGGG#   &&#PPPJJJ5555Y5?77?5Y5555JJJPPP#&&   #GGGGGB&#&                    
GP5#        &PPP   BGBYJJ?77777777?JJYBGB   PPP&        #5PG                    
G55B     #PPG&&&   &&&GPGPPPPPPPPPPGPG&&&   &&&GPP#     B55G                    
BGGB##&  &GGG###      BGGGGPB##BPGGGGB      ###GGG&  &##BGGB                    
   BPPB     &PPP      GPP555B  B555PPG      PPP&     BPPB                       
	&&B55G  &555      P55B&&    &&B55P      555&  G55B&&                        
	  #GGB  &GGB      BGG&        &GGB      BGG&  BGG#                          
`);

function registerCommands() {
	commands.splice(0,commands.length); // Refresh commands
	const commandsPath = path.join(__dirname, 'commands'); // Get the path of the commands folder
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Get every file that ends with JS

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		commands.push([command.meta, command.execute]);
	}
}

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.DISCORD_TOKEN, {
    intents: [
        "guildMessages"
    ]
});

bot.on("ready", () => { // When the bot is ready
	registerCommands();
    console.log("Bot is on.");
});

bot.on("error", (err) => {
	console.error(err); // or your preferred logger
});

bot.on("messageCreate", async (msg) => { // When a message is created
    if (msg.content.startsWith(prefix)) {
		msg.content = msg.content.substring(prefix.length);
		
		const cmdName = msg.content.split(" ")[0];
		const args = msg.content.split(" ");
		args.shift();

		console.log(commands)

		const command = commands.find(function(element) {
			if (element[0].name == cmdName) {
				return element;
			}
		});
 
		if (!command) return; // No command found

		try {
			await command[1](bot, msg, args)
		} catch (e) {
			bot.createMessage(msg.channel.id, "Malfunction! This incident will be reported to Central Command.");
			console.error(e)
		}
	}
});

bot.connect(); // Get the bot to connect to Discord
