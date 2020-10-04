/*

created by huda0209
discord bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS  'liten some event'
 
ran by node.js

2020-10-4

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//class
const msgEvent = require('./src/msgEvent.js')

//other 
const option = {ws: {intents: discord.Intents.ALL}};
const json = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));
const client = new discord.Client(option);
const color = require('./src/color');
const PREFIX = json.PREFIX;
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


//start the bot
client.on("ready", message => {
  console.log(`${color.header.info}bot is ready! ver. ${json.VERSION} \n        login: ${color.chcol.cyan}${client.user.tag}${color.reset}\n`);
  client.user.setActivity(`${PREFIX}helpでヘルプを表示 ver. ${json.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", bot =>{
  const DATA = {"GuildId" : bot.id,
                "GuildName" : bot.name,
                "Owner" : bot.ownerID};
  fs.writeFileSync(`./config/guild/${bot.id}.json`, JSON.stringify(DATA, null, '\t'),'utf8');
  console.log(`${color.header.info}guildCreate catch`);
  })

//guild update event
client.on("guildUpdate", bot =>{
  let DATA = JSON.parse(fs.readFileSync(`./config/guild/${bot.id}.json`,'utf8'));
  DATA.GuildName = bot.members.guild.name;
  fs.writeFileSync(`./config/guild/${bot.id}.json`,JSON.stringify(DATA, null, '\t'),'utf8');
  console.log(`${color.header.info}guildUpdate catch`);
})

//message event
client.on("message", async message => {
  let DATA;
  try{
    DATA = JSON.parse(fs.readFileSync(`./config/guild/${message.guild.id}.json`,'utf8'));
  }catch (error){
    console.log(`${color.header.error}fail to load guild file \n${error}\n`);
    return};
  if (message.content.startsWith(PREFIX)){
    const [command, ...args] = message.content.slice(PREFIX.length).split(' ');

    if(command === "stop" &&(message.author.id === message.guild.ownerID)){
      console.log(`${color.header.info}server was stoped by ${message.author.tag}\n`);
      await message.delete();
      client.destroy();
      process.exit(0)};

//write command code here
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


if(json.MAIN_TOKEN == undefined || json.MAIN_TOKEN == ""){
  console.log(`${color.header.error}please set setting.json : ${color.chcol.cyan}MAIN_TOKEN${color.reset}`);
  process.exit(0);
}
let token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = json.MAIN_TOKEN;
      break;
    case "div" :
      if(json.DIV_TOKEN == undefined || json.DIV_TOKEN == ""){
        console.log(`${color.header.error}please set setting.json : ${color.chcol.cyan}DIV_TOKEN${color.reset}`);
        process.exit(0)};
      token = json.DIV_TOKEN;
      json.VERSION = `dev(${json.VERSION})`;
      break;
    default :
      console.log(`${color.header.error}Unknown command. \n${color.chcol.cyan}Usage${color.reset} \n node main.js main : use main token \n node main.js div : use divelopment token`);
      process.exit(0);
  };
}else token = json.MAIN_TOKEN;
client.login(token);