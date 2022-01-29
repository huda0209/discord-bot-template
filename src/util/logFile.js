/*
created by huda0209

logFile.js :module  Create Log file.
 ver. 1.0.3

depend: logger.js
        fs
        date-utils
 
ran by node.js
2021-11-12
*/
'use strict'

const version = "1.0.3";
exports.SourceInfo={name:"logFIle", version:"1.0.3", requrl:"UtilsVersion"};

const fs = require("fs");
const logger = require("./logger");
require('date-utils');

function colorCode_remover(content){
    content = content.replace(/{black}/g, "");
    content = content.replace(/{red}/g, "");
    content = content.replace(/{green}/g, "");
    content = content.replace(/{yellow}/g, "");
    content = content.replace(/{magenta}/g, "");
    content = content.replace(/{cyan}/g, "");
    content = content.replace(/{white}/g, "");
 
    content = content.replace(/{bdblack}/g, "");
    content = content.replace(/{bdred}/g, "");
    content = content.replace(/{bdgreen}/g, "");
    content = content.replace(/{bgyellow}/g, "");
    content = content.replace(/{bdmagenta}/g, "");
    content = content.replace(/{bdcyan}/g, "");
    content = content.replace(/{bdwhite}/g, "");
    content = content.replace(/{reset}/g, "");
    return content
 }

function hasLastLog(){
    if(fs.existsSync("./logs/latest.log")){
        const date = (new Date()).toFormat('DDD_MMM_DD_YYYY_HH24-MI-SS');
        fs.renameSync('./logs/latest.log', `./logs/${date}.log`);
    }
}

function createlog(prefix,msg){
    const date = (new Date()).toFormat('DDD MMM DD YYYY HH24:MI:SS');
    if(fs.existsSync("./logs/latest.log")){
        let contents = fs.readFileSync("./logs/latest.log","utf8");
        contents = `${contents}
[${prefix}  ${date}] ${msg}`;
        fs.writeFileSync("./logs/latest.log",contents,"utf8");
    }else{
        let contents = `[${prefix}  ${date}] ${msg}`;
        if(!fs.existsSync("./logs")) fs.mkdirSync("./logs");
        fs.writeFileSync("./logs/latest.log",contents,"utf8");
    }
}

function info(msg){
    logger.info(msg);
    createlog("INFO ", logger.contentChecker(msg)? colorCode_remover(msg) : msg);
}

function warn(msg){
    logger.warn(msg);
    createlog("WARN ", logger.contentChecker(msg)? colorCode_remover(msg) : msg);
}

function error(msg){
    logger.error(msg);
    createlog("ERROR", logger.contentChecker(msg)? colorCode_remover(msg) : msg);
}

exports.hasLastLog = hasLastLog;
exports.createlog = createlog;
exports.info = info;
exports.warn = warn;
exports.error = error;