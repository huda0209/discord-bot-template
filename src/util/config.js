/*
created by huda0209

config.js
 
ran by node.js
2022-1-29
*/

`use strict`
const fs = require("fs");
const log = require("./logFile");

function loadConfig(configName){
    let resource = require("../../resource/resource");
    if(!resource[configName]){
        log.error(`can't find that file({red}${configName}{reset}).`);
        throw Error(`can't find that file({red}${configName}{reset}).`);
    }

    const data = JSON.parse(fs.readFileSync(resource[configName].pass,"utf-8"));

    for(const key in resource[configName].keys){
            if(!resource[configName].keys[key].canEmpty) continue;
            if(Object.hasOwnProperty.call(data, key)) continue;
            log.error(`Don't have a property "{red}${key}{reset}" in {green}${configName}{reset}.`);
            throw Error(`Don't have a property "{red}${key}{reset}" in {green}${configName}{reset}.`);
        
    }

    for(const key in resource[configName].keys) {
        if(Object.hasOwnProperty.call(data, key) && data[key]) continue;
        if(!resource[configName].keys[key].replace) continue;
        data[key] = resource[configName].keys[key].default;
    }
    log.info(`succeed to load "${configName}".`);
    return data;
}

function exist(createMode){
    let resource;
    try{
        resource = require("../../resource/resource");
    }catch(e){
        log.error(e);
        throw e;
    }

    if(!fs.existsSync("./config")){
        fs.mkdirSync("./config");
        log.info(`Succeed to create "{red}config directory{reset}".`);
    }
    let result = false;

    for(const key in resource){
        if(fs.existsSync(resource[key].pass)){
            result = true;
            continue;
        }
        log.warn(`there is not "{red}${key}{reset}".`);

        if(!createMode) continue;
        try {
            fs.copyFileSync(`./resource/${key}`, resource[key].pass, fs.constants.COPYFILE_EXCL);
            log.info(`Succeed to create "{red}${key}{reset}".`);
            result = true;
        }catch(e) {
            log.error(e);
        }
    }

    return result;
}

function save(configName, data){
    let resource;
    try{
        resource = require("../../resource/resource");
    }catch(e){
        log.error(e);
        throw e;
    }

    if(!resource[configName]){
        log.error(`can't find that file({red}${configName}{reset}).`);
        throw Error(`can't find that file({red}${configName}{reset}).`)
    }
    
    for(const key in resource[configName].keys){
        if(!resource[configName].keys[key].canEmpty) continue;
        if(Object.hasOwnProperty.call(data, key)) continue;
        log.error(`Don't have a property "{red}${key}{reset}" in {green}${configName}{reset}.`);
        throw Error(`Don't have a property "{red}${key}{reset}" in {green}${configName}{reset}.`);
    }
    
    for(const key in resource[configName].keys) {
        if(Object.hasOwnProperty.call(data, key) && data[key]) continue;
        if(!resource[configName].keys[key].replace) continue;
        data[key] = resource[configName].keys[key].default;
    }
    
    fs.writeFileSync(resource[configName].pass, JSON.stringify(data, null, "\t"), "utf8");
    log.info(`succeed to save "${configName}".`);
}

exports.exist = exist;
exports.loadConfig = loadConfig;
exports.save = save;