/*

created by huda0209
discord-bot for discord bot 
 
ran by node.js

2022-1-29

*/
'use strict'

//node.js modules
const discord = require("discord.js");
require('date-utils');

//other 
const client = new discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"], partials: ["USER", "MESSAGE", "CHANNEL"]});
const logger = require('./src/util/logFile');
const configManager = require("./src/config/configManager");
const Package = require("./package.json");

//listener register
require("./src/command/commandHandler")(client);


logger.info(`This service is standing now...`);
process.on("exit", ()=>{
	configManager.saveConfig();
	client.destroy();
    logger.info(`service end.`);
    logger.hasLastLog();
    console.log("Exitting...");
});
process.on("SIGINT", ()=>{
	process.exit(0);
});


//start the bot
client.on("ready", () => {
	logger.info(`bot is ready! ver. ${Package.version} \n        login: {cyan}${client.user.tag}{reset}\n`);
	client.user.setActivity(`${configManager.getBotData("PREFIX")}${configManager.getBotData("COMMAND")} helpでヘルプを表示 ver. ${Package.version}`, { type: 'PLAYING' });
});

setInterval( ()=>{
	configManager.saveConfig();
}, 300000);

let token;
if(process.argv.length == 3){
  	switch(process.argv[2]){
  	  	case "main" :
  	    	token = configManager.getBotData("MAIN_TOKEN");
  	    	break;
  	  	case "dev" :
  	    	if(!configManager.getBotData("DEV_TOKEN")){
				logger.error(`Don't have a property "{red}DEV_TOKEN{reset}" in {green}setting.json{reset}.`);
				process.exit(0);
			}
  	    	token = configManager.getBotData("DEV_TOKEN");
			require("./src/util/checkVersion");
  	    	break;
  	  	default :
  	    	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
  	    	process.exit(0);
  	};
}else if(process.argv.length == 2){
	token = configManager.getBotData("MAIN_TOKEN");
}else{
	logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
	process.exit(0);
}
client.login(token)
	.then(res=>{
		logger.info(`Succeed to login the discord service.`);
	})
	.catch(error=>{
		logger.error(`Could not login the discord service.\n${error}`);
	});