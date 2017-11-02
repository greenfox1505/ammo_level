var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (geoArgs) {//todo verify input
    var output;
    if (geoArgs[0] == "cube") {
        output = {
            render: new THREE.BoxBufferGeometry(geoArgs[1], geoArgs[2], geoArgs[3]),
            physics: new CANNON.Box(new CANNON.Vec3(geoArgs[1] / 2, geoArgs[2] / 2, geoArgs[3] / 2))
        }
    }
    else if (geoArgs[0] == "sphere") {
        output = {
            render: new THREE.SphereBufferGeometry(geoArgs[1], geoArgs[2], geoArgs[3]),
            physics: new CANNON.Sphere(geoArgs[1])
        }
        console
    }
    else {
        throw "GEOMETRY NOT SUPPORTED!"
    }
    console.log(output)
    return output;
}    
