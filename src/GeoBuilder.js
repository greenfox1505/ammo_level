var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (name, geoArgs) {//todo verify input
    if(this.geos[name]){
        throw ("GEOMETRY BY THIS NAME ALREADY EXISTS!:" + name)
    }

    var output;
    /**
     * geoArgs[0] is shape.
     * For cube, geoArgs[1 to 3] are xyz
     * For Sphere, geoArg[1] is radius, geoArgs[2] is horizontal lines, 3 is vertical lines in the sphere
     */
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
    }
    else if (geoArgs[0] == "obj") {
        var loader = new THREE.OBJLoader();
        loader.load('models/monster.obj')

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
