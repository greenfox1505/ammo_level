var THREE = require("three/build/three.min.js")

module.exports = function(geoArgs){
    if(geoArgs[0] == "cube"){
        return [new THREE.BoxBufferGeometry( geoArgs[1],geoArgs[2],geoArgs[3] ),"PHYSICS GEOMETRY NOT IMPLEMENTED"]
    }
    else if(geoArgs[0] == "sphere"){
        return [new THREE.SphereBufferGeometry( geoArgs[1],geoArgs[2],geoArgs[3] ),"PHYSICS GEOMETRY NOT IMPLEMENTED"]
    }
    else{
        throw "GEOMETRY NOT SUPPORTED!"
    }
}    