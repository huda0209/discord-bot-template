/*

created by huda0209
discord bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :module  'liten some event'
 
ran by node.js

2020-10-11

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//module
const commandHandler = require('./src/command-handler.js');

//config
const BOT_DATA = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));

//other 
const client = new discord.Client({ws: {intents: discord.Intents.ALL}});
const logger = require('./src/util/logger')


//start the bot
client.on("ready", message => {
  logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}{reset}\n`);
  client.user.setActivity(`${BOT_DATA.PREFIX}helpでヘルプを表示 ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", bot =>{
  const DATA = {"GuildId" : bot.id,
                "GuildName" : bot.name,
                "Owner" : bot.ownerID};
  fs.writeFileSync(`./config/guild/${bot.id}.json`, JSON.stringify(DATA, null, '\t'),'utf8');
  logger.info(`guildCreate catch`);
  })

//guild update event
client.on("guildUpdate", bot =>{
  let DATA = JSON.parse(fs.readFileSync(`./config/guild/${bot.id}.json`,'utf8'));
  DATA.GuildName = bot.members.guild.name;
  fs.writeFileSync(`./config/guild/${bot.id}.json`,JSON.stringify(DATA, null, '\t'),'utf8');
  logger.info(`guildUpdate catch`);
})

//message event
client.on("message", async message => {
  let guildData;
  try{
    guildData = JSON.parse(fs.readFileSync(`./config/guild/${message.guild.id}.json`,'utf8'));
  }catch (error){
    logger.error(`fail to load guild file \n${error}\n`);
    return};

  if (message.content.startsWith(BOT_DATA.PREFIX)){
    const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');

    if(command === "stop" &&(message.author.id === message.guild.ownerID)){
      logger.info(`server was stoped by {cyan}${message.author.tag}`);
      await message.delete();
      client.destroy();
      process.exit(0)};
    
      //write command code here
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


if(BOT_DATA.MAIN_TOKEN == undefined || BOT_DATA.MAIN_TOKEN == ""){
  logger.error(`please set setting.json : {cyan}MAIN_TOKEN`);
  process.exit(0)};
if(BOT_DATA.PREFIX == undefined || BOT_DATA.PREFIX == ""){
  logger.error(`please set setting.json : {cyan}PREFIX`);
  process.exit(0)};
if(BOT_DATA.VERSION == undefined || BOT_DATA.VERSION == ""){
  logger.error(`please set setting.json : {cyan}VERSION`);
  process.exit(0)};
let token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = BOT_DATA.MAIN_TOKEN;
      break;
    case "div" :
      if(BOT_DATA.DIV_TOKEN == undefined || BOT_DATA.DIV_TOKEN == ""){
        logger.error(`please set setting.json : {cyan}DIV_TOKEN`);
        process.exit(0)};
      token = BOT_DATA.DIV_TOKEN;
      BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
      break;
    default :
      logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
      process.exit(0);
  };
}else token = BOT_DATA.MAIN_TOKEN;
client.login(token);