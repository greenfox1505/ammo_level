var THREE = require("three")
var CANNON = require("cannon")

var tau = Math.PI * 2
module.exports = function (name, objectArgs) {
    if (this.objs[name]) {
        throw "OBJECT WITH THIS NAME ALREADY EXISTS!:" + name;
    }
    try {
        if (Array.isArray(objectArgs[0])) {
            obj = this.objs[name] = new THREE.Group();


            console.error("I really need to rework this section to use a single codepath")
            {
                var pos = objectArgs[2];
                var mat = this.mats[objectArgs[1]]
                var PhyArgs = {
                    mass: mat.physics.mass,
                    position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
                    material: mat.physics,
                }
                //if has velocity
                if (objectArgs[4]) { vel = objectArgs[4]; PhyArgs.velocity = new CANNON.Vec3(vel[0], vel[1], vel[2]) }
                obj.phys = new CANNON.Body(PhyArgs);
                var rot = objectArgs[3]
                obj.phys.quaternion.setFromEuler(rot[0] * tau, rot[1] * tau, rot[2] * tau, "XYZ")
            }

            var parts = []
            for (i in objectArgs[0]) {
                var geo = this.geos[objectArgs[0][i][0]];
                var mat = this.mats[objectArgs[0][i][1]];
                var dis = objectArgs[0][i][2];
                var rot = objectArgs[0][i][3]?objectArgs[0][i][3]:[0,0,0];

                
                var part = new THREE.Mesh(geo.render, mat.render)
                part.castShadow = mat.render.castShadow;
                part.receiveShadow = true;
                part.position.x = dis[0]; part.position.y = dis[1]; part.position.z = dis[2];
                obj.add(part);
                part.phys = obj.phys;
                var quat = new CANNON.Quaternion()
                quat.setFromEuler(rot[0] * tau, rot[1] * tau, rot[2] * tau, "XYZ")
                part.quaternion.copy(quat)
                obj.phys.addShape(geo.physics, new CANNON.Vec3(dis[0], dis[1], dis[2]),quat)
            }

            obj.castShadow = true;
            obj.receiveShadow = true;

            this.phyWorld.addBody(obj.phys);
            this.renderWorld.add(obj);
            return obj

        } else {
            var geo = this.geos[objectArgs[0]];
            var mat = this.mats[objectArgs[1]]

            var obj = this.objs[name] = new THREE.Mesh(geo.render, mat.render);
            var pos = objectArgs[2];

            //debugger;

            var PhyArgs = {
                mass: mat.physics.mass,
                position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
                material: mat.physics,
                shape: geo.physics
            }
            if (objectArgs[4]) {
                vel = objectArgs[4];
                PhyArgs.velocity = new CANNON.Vec3(vel[0], vel[1], vel[2])
            }

            obj.phys = new CANNON.Body(PhyArgs);
            var rot = objectArgs[3]
            obj.phys.quaternion.setFromEuler(rot[0] * tau, rot[1] * tau, rot[2] * tau, "XYZ")

            obj.castShadow = mat.render.castShadow;
            obj.receiveShadow = mat.render.receiveShadow;

            this.phyWorld.addBody(obj.phys);
            this.renderWorld.add(obj);

            return obj
        }
    } catch (e) {
        throw ("Error Loading ", e);
        if (geo) { console.error("geo:", geo) }


    }

}    
