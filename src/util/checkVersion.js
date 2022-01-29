/*
created by huda0209

checkVersion.js :module  Check the version of the source code in the same directory.
 ver. 1.1.0

depend: fs
        request

ran by node.js
2021-1-24
*/

exports.SourceInfo={name:"checkVersion", version:"1.1.0", requrl:"UtilsVersion"};

const fs = require("fs");
const request = require("request");

const requestList = {
    "UtilsVersion" : "https://raw.githubusercontent.com/huda0209/Versions/main/UtilsVersion.json"
}

fs.readdir(__dirname, (err, files) => {
    files.forEach(fileName => {

        if(!fileName.endsWith(".js")) return;

        let sourceInfo = null;
        let source;
        let OriginalVersion;

        try{
            source = require(`./${fileName}`);
        }catch(e){
            console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to load "${fileName}.\u001b[0m`);
            console.log(e);
            return;
        }
        
        sourceInfo = source.SourceInfo;

        if(!sourceInfo){
            console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to read property "SourceInfo" in ${fileName}.\u001b[0m`);
            return;
        }

        
        const options = {
            url: requestList[sourceInfo.requrl] ?  requestList[sourceInfo.requrl] : sourceInfo.requrl,
            method: "GET"
        };

        request(options, (error, response, body) => {
            if(error){
                console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to run https request.\u001b[0m`)
                console.log(error);
                return;
            };

            try{
                OriginalVersion = JSON.parse(body)[sourceInfo.name];
            }catch(e){
                console.log(` \u001b[41m ERROR \u001b[0m \u001b[31mFailed to parse text to json.\u001b[0m`);
                console.log(e);
                return;
            };
            if(OriginalVersion==undefined){
                console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m \u001b[33mis NOT set to version data\u001b[0m in remote verseion file.\u001b[0m`);
                return;
            }
            if(OriginalVersion != sourceInfo.version) console.log(` \u001b[43m WARN \u001b[0m \u001b[36m${fileName}\u001b[0m has an \u001b[32mupdate\u001b[0m. \u001b[41m${sourceInfo.version}\u001b[0m(now)=>\u001b[32m${OriginalVersion}\u001b[0m(new)\u001b[0m`);
        });
    })
});