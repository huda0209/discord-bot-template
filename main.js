/*

created by huda0209
discord bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS  'liten some event'
 
ran by node.js

2020-9-6

*/

//node.js modules
const dotenv = require('dotenv').config();
const fs = require('fs');
const discord = require("discord.js");

//class
const msgEvent = require('./class/msgEvent.js')

//other 
var json = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));
const client = new discord.Client();
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


//start the bot
client.on("ready", message => {
  console.log(`bot is ready! ver: test \nlogin: ${client.user.tag}`);
  client.user.setActivity('discord bot ver. 0.0.1', { type: 'PLAYING' })
});

//when bot join the guild, this event will load
client.on("guildCreate", bot =>{
    
  const GuildId = bot.id;
  const GuildName = bot.name
  const Owner = bot.ownerID;

  const adddata ={
              "GuildId" : GuildId,
              "GuildName" : GuildName,
              "Owner" : Owner,
             }
  json.guild = (adddata)
  fs.writeFileSync('./config/setting.json', JSON.stringify(json),'utf8');
  console.log("guildCreate catch")
  })

//guild update event
client.on("guildUpdate", bot =>{
  json.guild.GuildName = bot.members.guild.name;
  fs.writeFileSync('./config/setting.json',JSON.stringify(json),'utf8');
  console.log("guildUpdate catch");
})

//message event
client.on("message", async message => {

  const prefix = '!'
  if (message.content.startsWith(prefix)){
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if(command === "stop"){
      if(message.author.id === json.guild.Owner || message.author.id === message.guild.ownerID){
        console.log(`server stop. by${message.author.tag}`);
        await message.delete()
        process.exit(0);}
    }

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


if(process.env.MAIN_TOKEN == undefined || process.env.MAIN_TOKEN == ""){
  console.log("please set ENV : MAIN_TOKEN");
  process.exit(0);
}
var token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = process.env.MAIN_TOKEN;
      break;
    case "test" :
      if(process.env.TEST_TOKEN == undefined || process.env.TEST_TOKEN == ""){
        console.log("please set ENV : TEST_TOKEN");
        process.exit(0);
      }
      token = process.env.TEST_TOKEN;
      break;
    default :
      console.log(`\nUnknown command. \nUsage \n node main.js main : main token \n node main.js test : test token`)
      process.exit(0);
  };
}else token = process.env.MAIN_TOKEN
client.login(token);