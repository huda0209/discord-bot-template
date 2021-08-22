/*
created by huda0209

 -logFile.js :module  Create Log file.
 ver. 1.0.0

 depend : logger.js
 
ran by node.js
2021-7-26
*/
const version = "1.0.0";


const fs = require("fs");
const logger = require("./logger");

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
        contents = `[${prefix}  ${date}] ${msg}`;
        fs.writeFileSync("./logs/latest.log",contents,"utf8");
    }
}

function info(msg){
    logger.info(msg);
    createlog("INFO ",colorCode_remover(msg));
}

function warn(msg){
    logger.warn(msg);
    createlog("WARN ",colorCode_remover(msg));
}

function error(msg){
    logger.error(msg);
    createlog("ERROR",colorCode_remover(msg));
}

exports.hasLastLog = hasLastLog;
exports.createlog = createlog;
exports.info = info;
exports.warn = warn;
exports.error = error;


//verison checker
(function(){
    const request = require("request");
 
    let OriginalVersion;
 
    const options = {
       url : "https://raw.githubusercontent.com/huda0209/Versions/main/UtilsVersion.json",
       method : "GET"
    };
 
    request(options, (error, response, body)=>{
       if(error){
          console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to run https request.\u001b[0m`);
          console.log(error);
          return;
       };
 
       try{
          OriginalVersion = JSON.parse(body).logFIle;
       }catch(e){
          console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to parse text to json.\u001b[0m`);
          console.log(e);
          return;
       };
 
       if(OriginalVersion != version) console.log(` \u001b[43m WARN \u001b[0m \u001b[36m"logFile.js"\u001b[0m has an \u001b[32mupdate\u001b[0m. \u001b[41m${version}\u001b[0m(now)=>\u001b[32m${OriginalVersion}\u001b[0m(new)\u001b[0m`);
    });
 }());