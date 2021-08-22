/*

created by huda0209
discord-bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module  <= this
 -admin.js :module

 
ran by node.js

2020-12-29

*/
'use strict'

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//module
const commandHandler = require('./src/command-handler.js');

//other 
const client = new discord.Client({ws: {intents: discord.Intents.ALL}});
const logger = require('./src/util/logFile');
const configChecker = require('./src/util/config');

//config
let guildData = configChecker.getConfig()
const BOT_DATA = configChecker.getBotData()


//start the bot
client.on("ready", message => {
	logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}{reset}\n`);
  	client.user.setActivity(`${BOT_DATA.PREFIX}helpでヘルプを表示 ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", guild  =>{
  	const DATA = {
		  	"GuildId" : guild.id,
  	        "GuildName" : guild.name,
			"Owner" : guild.ownerID,
			"Admin" : []
		};

  	fs.writeFileSync(`./config/guild/guildData.json`, JSON.stringify(DATA, null, '\t'),'utf8');
  	logger.info(`guildCreate catch`);
})

//guild update event
client.on("guildUpdate", (beforeGuild, afterGuild) =>{
	guildData.GuildName = afterGuild.name;
	guildData.Owner = afterGuild.ownerID
  	fs.writeFileSync(`./config/guild/guildData.json`,JSON.stringify(guildData, null, '\t'),'utf8');
  	logger.info(`guildUpdate catch`);
})

//message event
client.on("message", async message => {
  	if (message.content.startsWith(BOT_DATA.PREFIX)){
    	const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');   
      	commandHandler.commandHandler([command, ...args],message,guildData,BOT_DATA,client)
  	};
	

//write other processing

})


client.on('guildMemberAdd', member => {
//When member enter the guild, this event will load
});


client.on("guildMemberUpdate", async (olduser,newuser) =>{
//When member update(nickname, role ...)
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
  	if(user.bot) return;
//when member add reaction
})    

let token;
if(process.argv.length == 3){
  	switch(process.argv[2]){
  	  	case "main" :
  	    	token = BOT_DATA.MAIN_TOKEN;
  	    	break;
  	  	case "div" :
  	    	configChecker.divCheck(BOT_DATA);
  	    	token = BOT_DATA.DIV_TOKEN;
  	    	BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
  	    	break;
  	  	default :
  	    	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
  	    	process.exit(0);
  	};
}else if(process.argv.length == 2){
	token = BOT_DATA.MAIN_TOKEN;
}else{
	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
	process.exit(0);
}
client.login(token);