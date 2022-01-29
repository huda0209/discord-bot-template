/*

created by huda0209
discord-bot for discord bot 
 
ran by node.js

2022-1-29

*/

"use strict"

const logger = require('../util/logger');
const embedContent = require("../util/embed");

const adminCommandRunner = require('./adminCommandRunner.js');
const pingCommandRunner = require("./pingCommandRunner");



const configManager = require("../config/configManager");

module.exports = (client)=>{
    client.on("messageCreate", async message => {
        if(!message.content.startsWith(configManager.getBotData("PREFIX"))) return;

        const [command, ...args] = message.content.slice(configManager.getBotData("PREFIX").length).split(' ');   
        switch(command.toLowerCase()){
            case configManager.getBotData("COMMAND") :
                if(!(message.author.id == message.guild.ownerId || configManager.getGuildtData("Admin").indexOf(message.author.id)>-1)){
                    message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `実行権限がありません。`));
                    break;
                };
                AdminCommandHandler([command, ...args],message,client);
                break;
        };
    })
}


async function AdminCommandHandler([command, ...args],message,client){
    if(args.length==0){
        message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `引数が不足しています。\n実行例\`${configManager.getBotData("PREFIX")}${configManager.getBotData("COMMAND")} <サブコマンド>\``));
        return;
    }
    switch(args[0].toLowerCase()){
        case "admin" :
        case "a":
            adminCommandRunner([command, ...args],message,client);
            break;

        case "ping":
            pingCommandRunner([command, ...args], message);
            break;
    
        case "stop" :
            logger.info(`server was stoped by {cyan}${message.author.tag}`);
            await message.delete();
            process.exit(0);

        case "help" :
        case "h":
            message.reply(embedContent.infoWithTitle(`❔ヘルプ`, `ここにヘルプを記述`));
            break;

        default:
            message.reply(embedContent.errorWithTitle(`❓コマンドがありません`, `実行したコマンドは登録されていません。`));
            break;
      };
}