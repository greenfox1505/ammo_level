var THREE = require("three")
var CANNON = require("cannon")

function squishy(a, b, rate) {
    return (a * rate) + (b * (1 - rate));
}

//require("Player.js")(level,camera);
module.exports = function (level, camera, playerData) {
    level.GeoBuilder("PlayerGeo", ["cube", 0.75, 2, 0.75]);
    level.MatBuilder("PlayerMat", [["pbr", {color:0xffffff}], { mass: 1, fric: 0, res: 1 }]);
    var player = level.ObjBuilder("PLAYER", ["PlayerGeo", "PlayerMat", playerData.starting.pos, [0, 0, 0]])
    player.castShadow = true;
    player.phys.angularDamping = 1;

    var keys = { w: 0, a: 0, s: 0, d: 0 }
    keys[" "] = 0;
    document.body.addEventListener("keydown", function (e) {
        if (keys[e.key] != null) {
            keys[e.key] = 1;
        }
        if (e.key == " " && keys[" "] == -1) {
            keys[" "] = 1;
        }
    })
    document.body.addEventListener("keyup", function (e) {
        if (keys[e.key] != null) {
            keys[e.key] = 0;
        }
        if (e.key == " ") {
            keys[" "] = 0;
        }
    })
    var yAngle = 0;
    player.grounded = false;
    player.onFrame = function onFrame(e) {

        var speed = {
            movement: 25,
            rotation: 0.01,
            jump: 8
        }
        var movement = new THREE.Vector3(0, 0, 0);
        if (keys.w) movement.z += 1;
        if (keys.s) movement.z -= 1;
        if (keys.a) yAngle += speed.rotation
        if (keys.d) yAngle -= speed.rotation
        movement.applyAxisAngle(new THREE.Vector3(0, 1, 0), yAngle * Math.PI * 2).multiplyScalar(5);
        //todo rotate these by some Y angle?
        player.phys.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yAngle * Math.PI * 2)

        if ((movement.x || movement.z )&& player.grounded) {
            player.phys.velocity.x = movement.x//squishy(player.phys.velocity.x, movement.x, 0.95);
            player.phys.velocity.z = movement.z//squishy(player.phys.velocity.z, movement.z, 0.95);
        }
        if (player.grounded && keys[" "] == 1) {
            player.grounded = false; keys[" "] = -1;
            player.phys.velocity.y = speed.jump;
        }
        //player.phys.velocity.y = 0//(10 * player.phys.velocity.z + movement.z) / 11;

        //move camera to some close proximity of player!
        var playerPos = player.phys.position;
        var cameraBack = new THREE.Vector3(0, 2, 4).applyAxisAngle(new THREE.Vector3(0, 1, 0), (yAngle - 0.5) * Math.PI * 2);
        var cameraDest = playerPos.clone().vadd(new CANNON.Vec3(cameraBack.x, cameraBack.y, cameraBack.z));

        var squishSpeed = 0.95;
        camera.position.x = squishy(camera.position.x, cameraDest.x, squishSpeed)
        camera.position.y = squishy(camera.position.y, cameraDest.y, squishSpeed)
        camera.position.z = squishy(camera.position.z, cameraDest.z, squishSpeed)


        camera.lookAt(new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z))

    }
    player.phys.addEventListener("collide", function (e) {
        if (e.contact.ni.dot(new CANNON.Vec3(0, 1, 0)) > 0.5) {
            player.grounded = true;
        };
    })

    //floor: ["floorGeo", "floorColor", [0, -0.75, 0],];
    return player;
}

