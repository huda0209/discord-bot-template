/*
created by huda0209

color.js :module
 ver. 2.0.3

ran by node.js
2021-11-12
*/
'use strict'
exports.SourceInfo={name:"color", version:"2.0.3", requrl:"UtilsVersion"};


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