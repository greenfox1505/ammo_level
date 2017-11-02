var THREE = require("three")
var CANNON = require("cannon")

var GeoBuilder = require("./GeoBuilder.js")
var MatBuilder = require("./MatBuilder.js")

module.exports = function (interfaces, rawLevel) {
    var scene = new THREE.Scene();

    var player = {};
    if (rawLevel.player) {
        player = JSON.parse(JSON.stringify(rawLevel.player))
    }
    var renderer = interfaces.renderer;
    if (rawLevel.world.background) { renderer = renderer.setClearColor(rawLevel.world.background, 1); }


    var world = new CANNON.World();
    world.gravity.set(rawLevel.world.grav[0], rawLevel.world.grav[1], rawLevel.world.grav[2]); // m/s²

    var level = { //fully loaded level
        mats: {},
        geos: {},
        objs: {},
        renderWorld: scene,
        phyWorld: world,
        player: player,
    }

    for (var i in rawLevel.geos) {
        level.geos[i] = GeoBuilder(rawLevel.geos[i])
    }
    for (var i in rawLevel.mats) {
        level.mats[i] = MatBuilder(rawLevel.mats[i])
    }
    for (var i in rawLevel.objs) {
        try {
            var geo = level.geos[rawLevel.objs[i][0]]
            var mat = level.mats[rawLevel.objs[i][1]]
            var obj = level.objs[i] = new THREE.Mesh(geo.render, mat.render);
            // if (rawLevel.objs[i][2]) {//positions
            //     obj.position.x = rawLevel.objs[i][2][0]
            //     obj.position.y = rawLevel.objs[i][2][1]
            //     obj.position.z = rawLevel.objs[i][2][2]
            // }
            // if (rawLevel.objs[i][3]) {//rotations,radians
            //     obj.rotation.x = rawLevel.objs[i][3][0] * Math.PI * 2
            //     obj.rotation.y = rawLevel.objs[i][3][1] * Math.PI * 2 * 360
            //     obj.rotation.z = rawLevel.objs[i][3][2] * Math.PI * 2
            // }
            var pos = rawLevel.objs[i][2];
            obj.phys = new CANNON.Body({
                mass: mat.physics.mass,
                position: new CANNON.Vec3(pos[0], pos[1], pos[2]),
                material: mat.physics,
                shape: geo.physics
            });
            console.log(rawLevel.objs[i][0],geo.physics)
            var rot = rawLevel.objs[i][3]
            var tau = Math.PI * 2
            obj.phys.quaternion.setFromEuler(rot[0] * tau, rot[1] * tau, rot[2] * tau, "XYZ")

            world.addBody(obj.phys);

        } catch (e) {
            console.error("Error Loading Object(" + i + ")!");
            if (geo) { console.error("geo:", geo) }

            throw ("Error Loading " + i, e);

        }
    }
    level.physicsTick = function (time) {
        //copy physics data to world data
        world.step(1 / 60);

        for (var i in level.objs) {
            var obj = level.objs[i];
            obj.position.x = obj.phys.position.x
            obj.position.y = obj.phys.position.y
            obj.position.z = obj.phys.position.z
            obj.quaternion.w = obj.phys.quaternion.w
            obj.quaternion.x = obj.phys.quaternion.x
            obj.quaternion.y = obj.phys.quaternion.y
            obj.quaternion.z = obj.phys.quaternion.z

        }
        // and copy position and rotation to three mesh
        // myMesh.position.copy( body.getPosition() );
        // myMesh.quaternion.copy( body.getQuaternion() );
    }

    for (var i in level.objs) {
        level.renderWorld.add(level.objs[i]);
    }

    console.log(level);
    return level;
}