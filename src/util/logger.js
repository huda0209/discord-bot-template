/*

created by huda0209

 -logger.js :module
 
ran by node.js

2020-10-10

*/

const color = require('../util/color.js')

function color_replace(content){
   content = content.replace('{black}', color.chcol.black );
   content = content.replace('{red}', color.chcol.red );
   content = content.replace('{green}', color.chcol.green );
   content = content.replace('{yellow}', color.chcol.yellow );
   content = content.replace('{magenta}', color.chcol.magenta );
   content = content.replace('{cyan}', color.chcol.cyan );
   content = content.replace('{white}', color.chcol.white );

   content = content.replace('{bdblack}', color.bgcolor.black );
   content = content.replace('{bdred}', color.bgcolor.red );
   content = content.replace('{bdgreen}', color.bgcolor.green );
   content = content.replace('{bgyellow}', color.bgcolor.yellow );
   content = content.replace('{bdmagenta}', color.bgcolor.magenta );
   content = content.replace('{bdcyan}', color.bgcolor.cyan );
   content = content.replace('{bdwhite}', color.bgcolor.white );
   content = content.replace('{reset}', color.reset);
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