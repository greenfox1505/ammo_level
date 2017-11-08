var THREE = require("three")
var CANNON = require("cannon")

var tau = Math.PI * 2
module.exports = function (name, objectArgs) {
    if (this.objs[name]) {
        throw "OBJECT WITH THIS NAME ALREADY EXISTS!:" + name;
    }
    try {
        var geo = this.geos[objectArgs[0]];
        var mat = this.mats[objectArgs[1]]
        var obj = this.objs[name] = new THREE.Mesh(geo.render, mat.render);
        var pos = objectArgs[2];

        var PhyArgs = {
            mass: mat.physics.mass,
            position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
            material: mat.physics,
            shape: geo.physics
        }
        if (objectArgs[4]) {
            vel = objectArgs[4];
            console.log("HAS ARGS!")
            PhyArgs.velocity = new CANNON.Vec3(vel[0], vel[1], vel[2])
        }

        obj.phys = new CANNON.Body(PhyArgs);
        var rot = objectArgs[3]
        obj.phys.quaternion.setFromEuler(rot[0] * tau, rot[1] * tau, rot[2] * tau, "XYZ")

        this.phyWorld.addBody(obj.phys);
        this.renderWorld.add(obj);

        return obj
    } catch (e) {
        console.error("Error Loading Object(" + i + ")!");
        if (geo) { console.error("geo:", geo) }

        throw ("Error Loading " + i, e);

    }

}    
