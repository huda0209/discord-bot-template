/*

created by huda0209
discord-bot for discord bot 

ran by node.js

2022-1-29

*/

"use strict"

const config = require("../util/config");

config.exist(true);
const BOT_DATA = config.loadConfig("setting.json");
const guildData = config.loadConfig("guildData.json");


exports.getBotData = (key)=>{
    return BOT_DATA[key];
}

exports.getGuildtData = (key)=>{
    return guildData[key];
}

exports.setGuildtData = (key, value)=>{
    return guildData[key] = value;
}

exports.saveConfig = ()=>{
    config.save("guildData.json", guildData);
}