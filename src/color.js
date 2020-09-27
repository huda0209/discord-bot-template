/*

created by huda0209
discord-bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS  'liten some event and sort the task'
 -color.js :module  <= this
 
ran by node.js

2020-9-27

*/

exports.chcol = function(col){
    switch(col.toLowerCase()){
        case 'black':
            return '\u001b[30m';
        case 'red':
            return '\u001b[31m';
        case 'green':
            return '\u001b[32m';
        case 'yellow':
            return '\u001b[33m';
        case 'magenta' : 
            return '\u001b[34m';
        case 'cyan':
            return '\u001b[36m';
        case 'white':
            return '\u001b[37m';
    }
}

exports.bgcolor = function(col){
    switch(col.toLowerCase()){
        case 'black':
            return '\u001b[40m';
        case 'red':
            return '\u001b[41m';
        case 'green':
            return '\u001b[42m';
        case 'yellow':
            return '\u001b[43m';
        case 'magenta' : 
            return '\u001b[44m';
        case 'cyan':
            return '\u001b[46m';
        case 'white':
            return '\u001b[47m';
    }
}

exports.reset = function(){
    return '\u001b[0m'
}

exports.header = function(col){
    switch(col.toLowerCase()){
        case 'info':
            return `[\u001b[32mINFO\u001b[0m]`;
        case 'warn':
            return `[\u001b[33mWARN\u001b[0m]`;
        case 'error':
            return `[\u001b[31mERROR\u001b[0m]`;
    }
}