var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (name, geoArgs) {//todo verify input
    if(this.geos[name]){
        throw ("GEOMETRY BY THIS NAME ALREADY EXISTS!:" + name)
    }

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
    this.geos[name] = output;
    return {name:name,geo:this.geos[name]};
}    
