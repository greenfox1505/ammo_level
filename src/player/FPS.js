var THREE = require("three")
var CANNON = require("cannon")

function vCannon2Three(cannonVector) {
    return new THREE.Vector3(cannonVector.x, cannonVector.y, cannonVector.z)
}
function vThree2Cannon(threeVector) {
    return new CANNON.Vec3(threeVector.x, threeVector.y, threeVector.z)
}

//require("Player.js")(level,camera);
module.exports = function Fly(level, camera, playerData) {
    level.GeoBuilder("PlayerGeo", ["sphere", 0.50, 4, 2 ]);
    console.log(level)
    debugger;
    level.MatBuilder("PlayerMat", [["pbr", { color: 0xffffff }], { mass: 0.01, fric: 0, res: 0 }]);
    var pawn = playerData.pawn = level.ObjBuilder("PLAYER", ["PlayerGeo", "PlayerMat", playerData.starting.pos, [0, 0, 0]])
    pawn.castShadow = false;
    //pawn.phys.angularDamping = 1;
    var movementData = {
        rotX: 0,
        rotY: 0,
        ctrlVector: new THREE.Vector3()
    }
    var speed = { mouseSensitivity: 0.0025, moveSpeed: 3 }

    var domElement = level.interfaces.renderer.domElement;

    //wasd space c camera
    camera.position.x = -5;
    camera.position.y = 5
    camera.position.z = 5
    camera.lookAt(new THREE.Vector3(-2.5, 0, -2.5));




    playerData.onFrame = function (deltaTime) {
        //instead of applying this to a camera, we're goiing to apply this as a force to a player pawn

        var move = new THREE.Vector3()
        if (keys.w) move.z -= 1;
        if (keys.s) move.z += 1;
        if (keys.a) move.x -= 1;
        if (keys.d) move.x += 1;
        move.normalize();
        move.multiplyScalar(speed.moveSpeed);
        move.applyAxisAngle(new THREE.Vector3(0, 1, 0), movementData.rotY)
        var phyVect = vThree2Cannon(move)
        pawn.phys.velocity.x = phyVect.x
        pawn.phys.velocity.z = phyVect.z

        camera.position.x = pawn.phys.position.x
        camera.position.y = pawn.phys.position.y
        camera.position.z = pawn.phys.position.z
        camera.rotation.order = "YXZ"
        camera.rotation.x = movementData.rotX
        camera.rotation.y = movementData.rotY
        camera.rotation.z = 0;
    }



    //place instructions for controls
    var controlFrame = document.createElement("div");
    controlFrame.className = "controlFrame"
    console.log(controlFrame)
    document.body.appendChild(controlFrame)
    controlFrame.innerHTML = "<h1>Click To Control</h1>"


    //camera lock change, is locked, hide
    //isunlocked, show

    var isCaptured = (document.pointerLockElement == domElement)
    document.addEventListener('pointerlockchange', function (e) {
        isCaptured = (document.pointerLockElement == domElement)
        if (document.pointerLockElement == domElement) {
            console.log('locked')
            controlFrame.style.backgroundColor = "rgba(0,0,0,0)"
            controlFrame.innerHTML = "<p>wasd plus spcae and c to move</p>";
            document.body.removeEventListener("click", MouseCapture);
        }
        else {
            console.log('unlocked')
            controlFrame.style.backgroundColor = "rgba(0,0,0,0.5)"
            controlFrame.innerHTML = "<h1>Click To Control</h1>"
            document.body.addEventListener("click", MouseCapture);
        }
    })

    //onclick capture camera, listen for wasdc
    function MouseCapture(e) {
        domElement.requestPointerLock();
    }

    document.body.addEventListener("click", MouseCapture);
    domElement.addEventListener("mousemove", function (e) {
        if (document.pointerLockElement === domElement) {
            movementData.rotY -= e.movementX * speed.mouseSensitivity;
            movementData.rotX -= e.movementY * speed.mouseSensitivity;
            if (movementData.rotX > (Math.PI / 2)) {
                movementData.rotX = Math.PI / 2
            }
            if (movementData.rotX < (-Math.PI / 2)) {
                movementData.rotX = -Math.PI / 2
            }
        }
    })
    var keys = { w: 0, a: 0, s: 0, d: 0, c: 0 }
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
    return playerData;
}

