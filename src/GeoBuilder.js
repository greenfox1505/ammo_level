var THREE = require("three/build/three.min.js")

module.exports = function(geoArgs){//todo verify input
    if(geoArgs[0] == "cube"){
        var physics = {
            type:'box', 
            size: [geoArgs[1],geoArgs[2],geoArgs[3]]
        }
        return [new THREE.BoxBufferGeometry( geoArgs[1],geoArgs[2],geoArgs[3] ),physics]
    }
    else if(geoArgs[0] == "sphere"){
        var physics = {
            type:'sphere', 
            size: [geoArgs[1],geoArgs[2],geoArgs[3]]
        }
        return [new THREE.SphereBufferGeometry( geoArgs[1],geoArgs[2],geoArgs[3] ),physics]
    }
    else{
        throw "GEOMETRY NOT SUPPORTED!"
    }
}    