var THREE = require("three/build/three.min.js")

module.exports = function(materialArgs){
    if(materialArgs[0] == "basic"){
        return [new THREE.MeshBasicMaterial( { color: materialArgs[1] } ),"PHYSICS MATERIAL NOT IMPLEMENTED"]
    }else{throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED"}
}    