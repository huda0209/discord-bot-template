/*

created by huda0209
discord-bot for discord bot 
 
ran by node.js

2022-1-29

*/

"use strict"

const logger =require('../util/logger');
const configManager = require("../config/configManager");
const embedContent = require("../util/embed");

module.exports = async([command, ...args],message) => {
    switch(args[1].toLowerCase()){
        case "add" :
            if(args.length<2){
                message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `引数が不足しています。\n実行例\`${configManager.getBotData("PREFIX")}${configManager.getBotData("COMMAND")} admin <add | delete | list> [user]\``));
                return;
            }
            if(configManager.getGuildtData("Admin").indexOf(message.mentions.members.first().id)>=0){
                message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `ユーザー<@${message.mentions.members.first().id}>は追加済みです。`));
                return;
            }
            configManager.getGuildtData("Admin").push(message.mentions.members.first().id);
            logger.info(`Add admin {green}${message.mentions.members.first().user.tag}`);
            message.reply(embedContent.infoWithTitle(`✅コマンド実行成功`, `ユーザー<@${message.mentions.members.first().id}>をAdminに追加しました。`));
            break;

        case "delete" :
        case "del" :
            if(args.length<2){
                message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `引数が不足しています。\n実行例\`${configManager.getBotData("PREFIX")}${configManager.getBotData("COMMAND")} admin <add | delete | list> [user]\``));
                return;
            }
            if(configManager.getGuildtData("Admin").indexOf(message.mentions.members.first().id)==-1){
                message.reply(embedContent.errorWithTitle(`❌コマンド実行失敗`, `ユーザー<@${message.mentions.members.first().id}>はAdminではないため、削除できませんでした。`));
                return;               
            }
            let adminList = configManager.getGuildtData("Admin");
            delete adminList[adminList.indexOf(message.mentions.members.first().id)];
            adminList = adminList.filter(Boolean);
            configManager.setGuildtData("Admin", adminList);
            logger.info(`Remove admin {red}${message.mentions.members.first().user.tag}`);
            message.reply(embedContent.infoWithTitle(`✅コマンド実行成功`, `ユーザー<@${message.mentions.members.first().id}>をAdminから削除しました。`));
            break;

        case "list" :
            const adminLinkList = configManager.getGuildtData("Admin").map(key=>{
                return `<@${key}>`;
            });
            message.reply(embedContent.infoWithTitle(`Adminリスト`, `${ adminLinkList.length>0? adminLinkList.join("\n") : "ユーザーはいません。"}`));
            break;

        default :
            message.reply(embedContent.errorWithTitle(`❓コマンドがありません`, `実行したコマンドは登録されていません。`));
            break;
    };
};