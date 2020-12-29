/*

created by huda0209
discord-bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module  <= this
 -admin.js :module

 
ran by node.js

2020-12-29

*/

const fs = require('fs');
const logger =require('../../util/logger');


const adminManager = async function ([command, ...args],message,guildData,BOT_DATA,client){
    switch(args[1].toLowerCase()){
        case "add" :
            if(args.length<2) return message.channel.send(`コマンドの引数が足りません。`);
            if(guildData.Admin.indexOf(message.mentions.members.first().id)>=0) return message.channel.send(`そのユーザーは追加済みです`);
            guildData.Admin.push(message.mentions.members.first().id);
            fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8')
            logger.info(`Add admin {green}${message.mentions.members.first().user.tag}`);
            message.channel.send(`ユーザーを追加しました`);
            break;

        case "delete" :
        case "del" :
            if(args.length<2) return message.channel.send(`コマンドの引数が足りません。`);
            if(guildData.Admin.indexOf(message.mentions.members.first().id)==-1) return message.channel.send(`そのユーザーはリストに入っていません`);
            delete guildData.Admin[guildData.Admin.indexOf(message.mentions.members.first().id)];
            guildData.Admin = guildData.Admin.filter(Boolean);
            fs.writeFileSync('./config/guild/guildData.json', JSON.stringify(guildData, null, "\t"),'utf8')
            logger.info(`Remove admin {red}${message.mentions.members.first().user.tag}`);
            message.channel.send(`ユーザーを削除しました`);
            break;

        case "list" :
            let adminList = `**${BOT_DATA.NAME} Adminリスト**\nOwner : *${(await client.users.fetch(message.guild.ownerID)).tag}*\nAdmin :`;
            if(guildData.Admin.length<1){
                adminList = `${adminList} なし`;
            }
            for(let i=0;i<guildData.Admin.length;i++){
                adminList = `${adminList}\n*${(await client.users.fetch(guildData.Admin[i])).tag}*`;
            };
            message.channel.send(adminList)
            break;

        default :
            message.reply(`unknown command.`);
            break;
    };
};


exports.adminManager = adminManager