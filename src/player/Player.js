var THREE = require("three")
var CANNON = require("cannon")

function squishy(a, b, rate) {
    return (a * rate) + (b * (1 - rate));
}

//require("Player.js")(level,camera);
module.exports = function (level, camera, playerData) {
    if(playerData.type == "FPS"){
        return require("./FPS.js")(level, camera, playerData)
    }
    else if(playerData.type == "Fly"){
        return require("./Fly.js")(level, camera, playerData)
    }
    else if(playerData.type == "platformer"){
        return require("./Platformer.js")(level, camera, playerData)
    }
    throw "Bad Camera"
}