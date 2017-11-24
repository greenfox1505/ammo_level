var THREE = require("three")
var CANNON = require("cannon")

function vCannon2Three(cannonVector) {
    return new THREE.Vector3(cannonVector.x, cannonVector.y, cannonVector.z)
}
function vThree2Cannon(threeVector) {
    return new CANNON.Vec3(threeVector.x, threeVector.y, threeVector.z)
}

var xAxis = new THREE.Vector3(1, 0, 0)
var yAxis = new THREE.Vector3(0, 1, 0)


//Helper for checking what the pawn is standing on
var checkStandingCreator = function (scene) {
    var StandingRaycaster = new THREE.Raycaster();
    var down = new THREE.Vector3(0, -1, 0);
    return function checkStanding(pawn) {
        StandingRaycaster.set(pawn.position, down);
        var interescts = StandingRaycaster.intersectObjects(scene.children)
        try {
            return interescts[0];
        }
        catch (e) {
            return null;
        }
    }
}

var contactNormal = new CANNON.Vec3();
var upAxis = new CANNON.Vec3(0, 1, 0);
function PlayerTouchs(phyWorld, body) {
    //console.log(body)
    var contacts = [];
    var touchList = [];
    var resting = false;
    for (var i in phyWorld.contacts) {
        var c = phyWorld.contacts[i];
        if (c.bi.id == body.id) {
            touchList.push(c.bj.id)
            contacts.push(c);
        }
        else if (c.bj.id == body.id) {
            touchList.push(c.bi.id)
            contacts.push(c);
        }
    }
    for (var i in contacts) {
        var contact = contacts[i];
        if (contact.bi.id == body.id) {
            //            movementData.restingOn = contact.ai.id;
            contact.ni.negate(contactNormal);
        } else
            contactNormal.copy(contact.ni);

        if (contactNormal.dot(upAxis) > 0.5)
            resting = true;

    }
    function isTouching(touchingBody) {
        for (var i in contacts) {
            if (contacts[i].bi.id == touchingBody.id || contacts[i].bj.id == touchingBody.id) {
                return true;
            }
        }
        return false;
    }

    return {
        contacts: contacts,
        resting: resting,
        isTouching: isTouching,
        touchList: touchList
    }

}

//require("Player.js")(level,camera);
module.exports = function Fly(level, camera, playerData) {
    var checkStanding = checkStandingCreator(level.renderWorld);
    level.GeoBuilder("PlayerGeo", ["sphere", 0.50, 32, 16]);
    level.GeoBuilder("PlayerGeo2", ["cylinder", 0.50, 0.50, 1, 16]);
    // debugger;
    level.MatBuilder("PlayerMat", [["basic", { color: 0xffffff }], { mass: 0.01, fric: 0, res: 0 }]);
    var pawn = playerData.pawn = level.ObjBuilder("PLAYER", [[["PlayerGeo", "PlayerMat", [0, 0, 0]], ["PlayerGeo2", "PlayerMat", [0, -0.5, 0]], ["PlayerGeo", "PlayerMat", [0, -1, 0]]], "PlayerMat", playerData.starting.pos, [0, 0, 0]])
    pawn.visible = false;
    pawn.phys.angularDamping = 1;
    var movementData = {
        rotX: 0,
        rotY: 0,
        ctrlVector: new THREE.Vector3(),
        cameraIsThrid: false,
        reach: 100,
        touches: {}
    }
    var speed = { mouseSensitivity: 0.0025, moveSpeed: 3 }

    var domElement = level.interfaces.renderer.domElement;

    //wasd space c camera
    camera.position.x = -5;
    camera.position.y = 5
    camera.position.z = 5
    camera.lookAt(new THREE.Vector3(-2.5, 0, -2.5));



    playerData.onFrame = function (deltaTime) {
        movementData.touches = PlayerTouchs(level.phyWorld, pawn.phys)
        //instead of applying this to a camera, we're goiing to apply this as a force to a player pawn

        // pawn.phys.quaternion.x = pawn.phys.quaternion.y = pawn.phys.quaternion.z = 0; pawn.phys.quaternion.w = 1;
        var move = new THREE.Vector3()
        if (keys.w) move.z -= 1;
        if (keys.s) move.z += 1;
        if (keys.a) move.x -= 1;
        if (keys.d) move.x += 1;
        move.normalize();
        move.multiplyScalar(speed.moveSpeed);
        move.applyAxisAngle(yAxis, movementData.rotY)

        pawn.phys.velocity.x = move.x
        pawn.phys.velocity.z = move.z

        if (movementData.touches.resting && keys[" "]) {
            pawn.phys.velocity.y = 5;
        }


        camera.position.x = pawn.phys.position.x
        camera.position.y = pawn.phys.position.y
        camera.position.z = pawn.phys.position.z
        camera.rotation.order = "YXZ"
        camera.rotation.x = movementData.rotX
        camera.rotation.y = movementData.rotY
        camera.rotation.z = 0;


        if (movementData.cameraIsThrid) {
            camera.position.x = camera.position.y = camera.position.z = 1;
            camera.lookAt(vCannon2Three(pawn.phys.position))
        }

        if (keys.f == 1) {
            console.log(checkStanding(pawn));
        }

        //move hinge object

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
            controlFrame.innerHTML = "<div id='instructions'><h2>wasd to move, space to jump, left click to push, right click to hit yourself in the face</h2><p>cross hairs? who needs crosshairs?</p></div>";
            document.body.removeEventListener("click", MouseCapture);
        }
        else {
            console.log('unlocked')
            controlFrame.style.backgroundColor = "rgba(0,0,0,0.5)"
            controlFrame.innerHTML = "<h1>Click To Control</h1>"
        }
        document.body.addEventListener("click", MouseCapture);
    })

    //onclick capture camera, listen for wasdc
    function MouseCapture(e) {
        domElement.requestPointerLock();
    }

    var raycaster = new THREE.Raycaster();
    raycaster.far = movementData.reach;

    var PushVector = new THREE.Vector3();

    domElement.addEventListener("mousedown", function (e) {
        movementData.touches = PlayerTouchs(level.phyWorld, pawn.phys);
        console.log("DOM CLICK", e.button)
        if (e.button == 0 || e.button == 2) {
            raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
            var intersects = raycaster.intersectObjects(level.renderWorld.children, true);
            // debugger

            console.log(intersects[0].point)
            if ((!movementData.touches.isTouching(intersects[0].object.phys)) && intersects[0].object.phys.material.mass != 0) {
                PushVector.copy(intersects[0].point);
                PushVector.sub(camera.position);
                if (e.button == 0) {
                    PushVector.normalize().multiplyScalar(10);
                }
                else {
                    PushVector.normalize().multiplyScalar(-10);
                }

                intersects[0].object.phys.velocity.x = PushVector.x;
                intersects[0].object.phys.velocity.y = PushVector.y;
                intersects[0].object.phys.velocity.z = PushVector.z;
            }
            console.log({ raycaster: raycaster, intersects: intersects[0].object.phys.id })

        }

        // if (e.button == 2) {
        //     movementData.cameraIsThrid = true
        //     pawn.visible = true;
        // }
    })
    domElement.addEventListener("mouseup", function (e) {
        console.log("DOM CLICK", e.button)
        // if (e.button == 0) {
        //     //put down object
        // }
        // if (e.button == 2) {
        //     movementData.cameraIsThrid = false;
        //     pawn.visible = false;
        // }
    })

    document.body.addEventListener("click", MouseCapture);
    domElement.addEventListener("mousemove", function (e) {
        //console.log(e.movementX);
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
    var keys = { w: 0, a: 0, s: 0, d: 0, c: 0, " ": 0, f: 0 }
    document.body.addEventListener("keydown", function (e) {
        if (keys[e.key] != null) {
            keys[e.key] = 1;
        }
        if (e.key == " " && keys[" "] == -1) {
            keys[" "] = 1;
        }
        // console.log(e)
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

