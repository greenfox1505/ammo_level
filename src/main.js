var Params = require("./URLGrabber.js")

var THREE = require("three")
var stats = new (require("stats.js"))();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


var threeData = require("./ThreeSettup.js")(THREE);

module.exports.THREE = THREE;

/*
Ways to load a level:
from URL
from tag in page
from text editor

Each of these will work best with a level callback. 
The level file builds a veriable and calls `Game(myLevel)`
*/

//load level through URL.
function loadLevelScript(LevelURL) {
    var levelScript = document.createElement("script");
    levelScript.src = LevelURL
    document.body.appendChild(levelScript)
}
if (Params["level"]) {
    loadLevelScript(Params["level"])
} else {
    window.location.href = window.location.href + "?level=levels/level1.js"
    //loadLevelScript("levels/level11.js")
}


Math.TU = Math.PI * 2;

module.exports.Game = function (rawLevel) {
    if(rawLevel.name){document.title = rawLevel.name}
    level = module.exports.level = require("./levelLoader.js")(threeData, rawLevel);
    // var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var camera = threeData.camera;
    {
        var camData = rawLevel.world.camera;
        if (Array.isArray(camData)) {
            camera.position.z = camData[0];
            camera.position.y = camData[1];
            camera.position.x = camData[2];
            camera.lookAt(new THREE.Vector3(0, 0, 0))
        }
        else {
            camera.position.x = camData.pos[0];
            camera.position.y = camData.pos[1];
            camera.position.z = camData.pos[2];
            if (camData.lookAt) {
                camera.lookAt(new THREE.Vector3(camData.lookAt[0], camData.lookAt[1], camData.lookAt[2]))
            } else if (camData.rot) {
                camera.rotateY(camData.rot[1] * Math.TU)
                camera.rotateX(camData.rot[0] * Math.TU)
                camera.rotateZ(camData.rot[2] * Math.TU)
                //throw "camera rotation not yet supported"
            } else {
                camera.lookAt(new THREE.Vector3(0, 0, 0))
            }

        }
    }
    var animate = function () {
        if(debugBreak == 1){debugBreak=-1; debugger}
        stats.begin();
        level.physicsTick(1 / 60);
        if (player) player.onFrame()
        if (level.onFrame) level.onFrame();

        if (level.onFrame) {
            level.onFrame();
        }

        threeData.renderer.render(level.renderWorld, camera);
        requestAnimationFrame(animate);
        stats.end();
    };
    animate();
    var player = null;
    if (rawLevel.player) {
        player = require("./player/Player.js")(level, camera, rawLevel.player);
    }

}


var debugBreak = 0;
document.body.addEventListener("keydown", function (e) {
    if (debugBreak == 0 && e.key == "p") {
        debugBreak = 1;
    }
})
document.body.addEventListener("keyup", function (e) {
    debugBreak = 0;

})

