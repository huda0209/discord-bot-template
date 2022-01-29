/*

created by huda0209
discord-bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module  <= this
 -admin.js :module

 
ran by node.js

2020-12-29

*/

const ping = require('./command/ping.js');
const logger = require('./util/logger');
const admin = require('./command/admin/admin.js');


async function commandHandler([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case BOT_DATA.COMMAND :
            if(!(message.author.id == message.guild.ownerID || guildData.Admin.indexOf(message.author.id)>-1)) break;
            AdminCommandHandler([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "ping" :
            ping.ping([command, ...args],message,guildData,BOT_DATA,client)
            break;
      };
}


async function AdminCommandHandler([command, ...args],message,guildData,BOT_DATA,client){

    switch(args[0].toLowerCase()){
        case "admin" :
            admin.adminManager([command, ...args],message,guildData,BOT_DATA,client);
            break;

        case "stop" :
            logger.info(`server was stoped by {cyan}${message.author.tag}`);
            await message.delete();
            client.destroy();
            process.exit(0);
        
        default:
            message.reply(`Unknown command.`);
            break;
      };
}

exports.commandHandler = commandHandler