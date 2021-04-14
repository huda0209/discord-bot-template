/*

created by huda0209

 -logger.js :module
  ver. 3.0.0
 
ran by node.js

2021-4-14

*/
'use strict'

const version = "3.0.0";

const color = require('../util/color.js')

function color_replace(content){
   content = content.replace(/{black}/g, color.chcol.black );
   content = content.replace(/{red}/g, color.chcol.red );
   content = content.replace(/{green}/g, color.chcol.green );
   content = content.replace(/{yellow}/g, color.chcol.yellow );
   content = content.replace(/{magenta}/g, color.chcol.magenta );
   content = content.replace(/{cyan}/g, color.chcol.cyan );
   content = content.replace(/{white}/g, color.chcol.white );

   content = content.replace(/{bdblack}/g, color.bgcolor.black );
   content = content.replace(/{bdred}/g, color.bgcolor.red );
   content = content.replace(/{bdgreen}/g, color.bgcolor.green );
   content = content.replace(/{bgyellow}/g, color.bgcolor.yellow );
   content = content.replace(/{bdmagenta}/g, color.bgcolor.magenta );
   content = content.replace(/{bdcyan}/g, color.bgcolor.cyan );
   content = content.replace(/{bdwhite}/g, color.bgcolor.white );
   content = content.replace(/{reset}/g, color.reset);
   return content
}

function contentChecker(content){
   if(Object.prototype.toString.call(content).slice(8, -1).toLowerCase() == "string"){
      return true;
   }else return false;
}

const info = function(content){
   if(contentChecker(content)) content = color_replace(content);
   console.log(`${color.header.info}${content}${color.reset}`);
};

const warn = function(content){
   if(contentChecker(content)) content = color_replace(content);
   console.log(`${color.header.warn}${content}${color.reset}`);
};

const error = function(content){
   if(contentChecker(content))content = color_replace(content);
   console.log(`${color.header.error}${content}${color.reset}`);
};


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
         error("{red}failed to run https request.");
         console.log(error);
      };

      try{
         OriginalVersion = JSON.parse(body).logger;
      }catch(e){
         error("{red}failed to parse text to json.");
         console.log(e);
      };

      if(OriginalVersion != version) warn(`{cyan}"logger.js"{reset} has an {green}update{reset}. {red}${version}{reset}(now)=>{green}${OriginalVersion}{reset}(new)`);
   });
}());