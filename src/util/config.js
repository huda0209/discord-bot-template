/*

created by huda0209

 -config.js :module  Check config data
 
ran by node.js

2020-10-23

*/
'use strict'

const logger = require('./logger')

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
}

function divCheck(config){
    if(config.DIV_TOKEN === null || config.DIV_TOKEN === undefined || config.DIV_TOKEN == ""){
        logger.error(`please set setting.json : {cyan}DIV_TOKEN`);
        process.exit(0);
    };
}

exports.check = check;
exports.divCheck = divCheck;