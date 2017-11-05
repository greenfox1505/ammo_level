var THREE = require("three")
var CANNON = require("cannon")

//require("Player.js")(level,camera);
module.exports = function (level, camera, playerData) {
    level.GeoBuilder("PlayerGeo", ["cube", 0.75, 2, 0.75]);
    level.MatBuilder("PlayerMat", [["basic", 0xFFFFFF], { mass: 1, fric: 0.9, res: 0.0 }]);
    console.log(playerData);
    var player = level.ObjBuilder("PLAYER", ["PlayerGeo", "PlayerMat", playerData.starting.pos, [0, 0, 0]])
    console.log(player);
    player.phys.angularDamping = 1;

    var keys = { w: 0, a: 0, s: 0, d: 0 }
    document.body.addEventListener("keydown", function (e) {
        if (keys[e.key] != null) {
            console.log("hitme")
            keys[e.key] = 1;
        }
        else if (e.key == " ") {
            console.log(player.phys);
        }
    })
    document.body.addEventListener("keyup", function (e) {
        if (keys[e.key] != null) {
            keys[e.key] = 0;
        }
        else if (e.key == " ") {
            console.log(player.phys);
        }
    })
    var yAngle = 0;
    player.onFrame = function onFrame(e) {

        var speed = {
            movement: 2,
            rotation: 0.01
        }
        var movement = new THREE.Vector3(0, 0, 0);
        if (keys.w) movement.z += 1;
        if (keys.s) movement.z -= 1;
        if (keys.a) yAngle += speed.rotation
        if (keys.d) yAngle -= speed.rotation
        movement.applyAxisAngle(new THREE.Vector3(0, 1, 0), yAngle * Math.PI * 2).multiplyScalar(5);
        //todo rotate these by some Y angle?
        player.phys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yAngle * Math.PI * 2)

        player.phys.velocity.x = (10*player.phys.velocity.x + movement.x) / 11;
        player.phys.velocity.z = (10*player.phys.velocity.z + movement.z) / 11;

    }

    //floor: ["floorGeo", "floorColor", [0, -0.75, 0],];
    return player;
}

