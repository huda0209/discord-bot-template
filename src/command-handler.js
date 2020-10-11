/*

created by huda0209
discord-bot v2 for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :module  'liten some event and sort the task'  <= this
 
ran by node.js

2020-10-11

*/

const ping = require('./command/ping.js')

const commandHandler = async function ([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case "ping" :
            ping.ping([command, ...args],message,guildData,BOT_DATA,client)
            break;
      }
}

exports.commandHandler = commandHandler