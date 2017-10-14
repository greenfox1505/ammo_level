var THREE = require("three/build/three.min.js")

module.exports = function(materialArgs){//todo verify input
    var physics = {
        move: materialArgs[1][0]?true:false, // dynamic or statique
        density: materialArgs[1][0]?materialArgs[1][0]:1,
        friction: materialArgs[1][1],
        restitution: materialArgs[1][2],
    }
    if(materialArgs[0][0] == "basic"){
        return [new THREE.MeshBasicMaterial( { color: materialArgs[0][1] } ),physics]
    }else if(materialArgs[0][0] == "normal"){
        return [new THREE.MeshNormalMaterial( ),physics]
    }
    else{throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED"}



}    