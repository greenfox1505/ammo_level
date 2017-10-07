var THREE = require("three/build/three.min.js")

module.exports = function(materialArgs){//todo verify input
    var physics = {
        move: materialArgs[2][0]?true:false, // dynamic or statique
        density: materialArgs[2][0]?materialArgs[2][0]:1,
        friction: materialArgs[2][1],
        restitution: materialArgs[2][2],
    }
    if(materialArgs[0] == "basic"){
        return [new THREE.MeshBasicMaterial( { color: materialArgs[1] } ),physics]
    }else{throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED"}



}    