/*

created by huda0209

 -logger.js :module
 
ran by node.js

2020-10-11

*/

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

const info = function(content){
   content = color_replace(content);
   console.log(`${color.header.info}${content}${color.reset}`);
};

const warn = function(content){
   content = color_replace(content);
   console.log(`${color.header.warn}${content}${color.reset}`);
};

const error = function(content){
   content = color_replace(content);
   console.log(`${color.header.error}${content}${color.reset}`);
};

const debug = function(content){
   content = color_replace(content);
   console.log(` ${color.bgcolor.white}${color.chcol.magenta} DEBUG ${color.reset} ${content}${color.reset}`);
};


exports.info = info;
exports.warn = warn;
exports.error = error;
exports.debug = debug;