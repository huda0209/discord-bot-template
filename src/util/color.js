/*

created by huda0209

 -color.js :module
  ver. 2.0.1
 
ran by node.js

2021-4-14

*/
const version = "2.0.1";


const color = {
   'black': '\u001b[30m',
   'red': '\u001b[31m',
   'green': '\u001b[32m',
   'yellow': '\u001b[33m',
   'magenta' :  '\u001b[34m',
   'cyan': '\u001b[36m',
   'white': '\u001b[37m'
}

const bgcolor = {
   'black': '\u001b[40m',
   'red': '\u001b[41m',
   'green': '\u001b[42m',
   'yellow': '\u001b[43m',
   'magenta' :  '\u001b[44m',
   'cyan': '\u001b[46m',
   'white': '\u001b[47m'
}

const reset = '\u001b[0m'

const header ={
   'info':  ` \u001b[42m INFO \u001b[0m `,
   'warn':  ` \u001b[43m WARN \u001b[0m `,
   'error':  ` \u001b[41m ERROR \u001b[0m `
}

exports.chcol = color;
exports.bgcolor = bgcolor;
exports.reset = reset;
exports.header = header;


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
         OriginalVersion = JSON.parse(body).color;
      }catch(e){
         console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to parse text to json.\u001b[0m`);
         console.log(e);
         return;
      };

      if(OriginalVersion != version) console.log(` \u001b[43m WARN \u001b[0m \u001b[36m"color.js"\u001b[0m has an \u001b[32mupdate\u001b[0m. \u001b[41m${version}\u001b[0m(now)=>\u001b[32m${OriginalVersion}\u001b[0m(new)\u001b[0m`);
   });
}());