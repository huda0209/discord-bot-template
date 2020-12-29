/*

created by huda0209

 -config.js :module  Check config data
 ver. 1.0.2
 
ran by node.js

2020-12-29

*/
'use strict'
const fs = require('fs');
const logger = require('./logger')

function getConfig(){
    try{
        const guildData = JSON.parse(fs.readFileSync('./config/guild/guildData.json', 'utf8'));
        return guildData;
    }catch(e){
        logger.error(`Failed to load file! {cyan}guildData.json{reset} Please check config file.\nIf this code ran first time, this error can ignore.`);
    };
}

function getBotData(){
    try{
        const BOT_DATA = JSON.parse(fs.readFileSync('./config/setting.json', 'utf8'));
        check(BOT_DATA);
        return BOT_DATA;
    }catch(e){
        logger.error(`Failed to load file! {cyan}setting.json{reset} Please check config file.`);
        const DATA = {
            "NAME" : "",
            "MAIN_TOKEN" : "",
            "DIV_TOKEN" : "",
            "VERSION" : "0.0.0",
            "PREFIX" : "/",
            "COMMAND" : ""
        };
        fs.writeFileSync(`./config/setting.json`, JSON.stringify(DATA, null, '\t'),'utf8');
        process.exit(0);
    };
}

function check(config){
    if(config.MAIN_TOKEN === null || config.MAIN_TOKEN === undefined || config.MAIN_TOKEN == ""){
        logger.error(`please set setting.json : {cyan}MAIN_TOKEN`);
        process.exit(0);
    };
    if(config.PREFIX === null || config.PREFIX === undefined || config.PREFIX == ""){
        logger.error(`please set setting.json : {cyan}PREFIX`);
        process.exit(0);
    };
    if(config.VERSION === null || config.VERSION === undefined || config.VERSION == ""){
        logger.error(`please set setting.json : {cyan}VERSION`);
        process.exit(0);
    };
    if(config.COMMAND === null || config.COMMAND === undefined || config.COMMAND == ""){
        logger.error(`please set setting.json : {cyan}COMMAND`);
        process.exit(0);
    };
}

function divCheck(config){
    if(config.DIV_TOKEN === null || config.DIV_TOKEN === undefined || config.DIV_TOKEN == ""){
        logger.error(`please set setting.json : {cyan}DIV_TOKEN`);
        process.exit(0);
    };
}

exports.getBotData = getBotData;
exports.getConfig = getConfig;
exports.divCheck = divCheck;