if (process.versions.node.split(".")[0] < 17) {
	console.error(`You are currently running Node.js version ${process.version}.
	Multitool requires Node.js version 17 or above.
	Now exiting.`);
	process.exit(1);
}

const Eris = require("eris");
const path = require("path");
const logger = require("./utils/logging.js");
const config = require("./utils/config.js");
const fs = require("fs");
require('dotenv').config();

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

const commands = [];
const autoresponse = [];

// Replace TOKEN with your bot account's token
const bot = new Eris.CommandClient(process.env.DISCORD_TOKEN, {intents: ["all"], maxShards: "auto"},{
	description: "Multitool: A multipurpose discord bot",
	owner: process.env.OWNER_ID,
	prefix: config.getConfig().bot.prefix
});

function init() {
	registerCommands();
	registerResponses();
}

function registerCommands() {
	const timer = Date.now();
	commands.splice(0,commands.length); // Refresh commands
	const commandsPath = path.join(__dirname, 'commands'); // Get the path of the commands folder
	// const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Get every file that ends with JS

	fs.readdirSync(commandsPath).forEach(dir => {
		fs.readdir(path.join(commandsPath + `/${dir}`), (err, files) => {
			commandFiles = fs.readdirSync(path.join(commandsPath + `/${dir}`)).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const filePath = path.join(path.join(commandsPath + `/${dir}`), file);
				const command = require(filePath);
				bot.unregisterCommand(command[0]);
				bot.registerCommand(command[0], command[1], command[2])
			}
		});
	});

	logger.info(`Commands registed in ${(Date.now()-timer)} ms`);
}

function registerResponses() {
	const timer = Date.now();
	autoresponse.splice(0,commands.length); // Refresh responses
	const arPath = path.join(__dirname, 'autoresponder'); // Get the path of the commands folder
	const arFiles = fs.readdirSync(arPath).filter(file => file.endsWith('.js')); // Get every file that ends with JS

	for (const file of arFiles) {
		const filePath = path.join(arPath, file);
		const ar = require(filePath);
		autoresponse.push([ar.regex, ar.response]);
	}

	logger.info(`Responses registed in ${(Date.now()-timer)}ms`);
}

bot.on("ready", () => { // When the bot is ready
	init();
	bot.editStatus("online", {name: "everyone's every move", type: 3, link: "https://discord.gg/n8se25bGCx"});
	logger.info("Bot is on");
});

bot.on("error", (err) => {
	logger.error(err);
});

bot.on("messageCreate", async (msg) => { // When a message is created
	if (msg.author.id === bot.user.id) return; // don't want an infinite loop

	for (let i = 0; i < autoresponse.length; i++) {
		const data = autoresponse[i];
		if (data[0].test(msg.content)) {
			bot.createMessage(msg.channel.id, data[1]);
			return;
		}
	}
});

bot.on("messageReactionAdd", async (message, emoji, reactor) => {
	let rr = config.getModule("rr");
	for (let i = 0; i < rr.length; i++) {
		const data = rr[i];
		if (data.msg == message.id) {
			if (data.emoji == emoji.id) {
				reactor.addRole(data.role, "Reacted to reaction role");
			}
		}
	}
})

bot.on("messageReactionRemove", async (message, emoji, userid) => {
	let rr = config.getModule("rr");
	for (let i = 0; i < rr.length; i++) {
		const data = rr[i];
		if (data.msg == message.id) {
			if (data.emoji == emoji.id) {
				bot.guilds.get(message.guildID).removeMemberRole(userid, data.role, "Unreacted from reaction role");
			}
		}
	}
})

bot.on("shardReady", async(id) => {logger.info(`Shard #${id} is now ready.`)})
bot.on("shardDisconnect", async(id) => {logger.warn(`Shard #${id} has disconnected.`)})

bot.connect(); // Get the bot to connect to Discord
