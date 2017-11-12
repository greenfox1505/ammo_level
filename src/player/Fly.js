var THREE = require("three")
var CANNON = require("cannon")


//require("Player.js")(level,camera);
module.exports = function Fly(level, camera, playerData){
    //place instructions for controls
    var controlFrame=  document.createElement("div");
    controlFrame.className = "controlFrame"
    console.log(controlFrame)
    document.body.appendChild(controlFrame)
    controlFrame.innerHTML ="<h1>Click To Control</h1>"

    var domElement =level.interfaces.renderer.domElement;
    var speed = {mouseSensitivity : 0.0025,moveSpeed:0.1}
    
    camera.rotation.order = "YXZ"
    //wasd space c camera
    camera.position.x = playerData.starting.pos[0]
    camera.position.y = playerData.starting.pos[1]
    camera.position.z = playerData.starting.pos[2]
    if(playerData.starting.lookAt){
        var l = playerData.starting.lookAt;
        camera.lookAt(new THREE.Vector3(l[0], l[1], l[2]))
    }

    rotX = 0;
    rotY = 0;
    
    playerData.onFrame = function(){
        var move = new THREE.Vector3()
        if (keys.w) move.z -= 1;
        if (keys.s) move.z += 1;
        if (keys.a) move.x -= 1;
        if (keys.d) move.x += 1;
        if (keys.c) move.y -= 1;
        if (keys[" "]) move.y += 1;
        move.applyAxisAngle(new THREE.Vector3(1,0,0),camera.rotation.x)
        move.applyAxisAngle(new THREE.Vector3(0,1,0),camera.rotation.y)
        move.multiplyScalar(speed.moveSpeed)
        camera.position.add(move);
    }

    //onclick capture camera, listen for wasdc
    document.body.addEventListener("click",function(e){
        console.log("asdf")
        controlFrame.style.backgroundColor = "#0000"
        controlFrame.innerHTML = "<p>wasd plus spcae and c to move</p>";
        domElement.requestPointerLock();
    })
    domElement.addEventListener("mousemove",function(e){
        if(document.pointerLockElement === domElement){
            camera.rotation.y -= e.movementX*speed.mouseSensitivity;
            camera.rotation.x -= e.movementY*speed.mouseSensitivity;
            camera.rotation.z =0;
            //camera.rotation.x = camera.rotation.x%Math.PI
            if( camera.rotation.x > (Math.PI/2)){
                camera.rotation.x = Math.PI/2
            }
            if( camera.rotation.x < (-Math.PI/2)){
                camera.rotation.x = -Math.PI/2
            }
        }
    })
    var keys = { w: 0, a: 0, s: 0, d: 0 ,c:0}
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

