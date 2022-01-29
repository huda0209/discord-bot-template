/*

created by huda0209
discord-bot for discord bot 
 
ran by node.js

2022-1-29

*/

/*
DON'T TOUCH!!
*/

module.exports =  {
    "setting.json" : {
        pass : "./config/setting.json",
        keys : {
            NAME : {
                canEmpty : false,
                replace : false,
                default : ""
            },
            MAIN_TOKEN : {
                canEmpty : false,
                replace : false,
                default : ""
            },
            DEV_TOKEN : {
                canEmpty : true,
                replace : false,
                default : ""
            },
            PREFIX : {
                canEmpty : false,
                replace : false,
                default : ""
            },
            COMMAND : {
                canEmpty : false,
                replace : false,
                default : ""
            }
        }
    },

    "guildData.json" : {
        pass : "./config/guildData.json",
        keys : {
            GuildId : {
                canEmpty : true,
                replace : false,
                default : ""
            },
            Admin : {
                canEmpty : true,
                replace : false,
                default : ""
            }
        }
    }
}
