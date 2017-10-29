var THREE = require("three")

var threeData = require("./ThreeSettup.js")(THREE, {});


/*
Ways to load a level:
from URL
from tag in page
from text editor

Each of these will work best with a level callback. 

*/

function loadLevelScript(LevelURL) {
    var levelScript = document.createElement("script");
    levelScript.src = LevelURL
    document.body.appendChild(levelScript)
}
var query = location.href.substring(location.href.indexOf("?") + 1);
console.log(query == location.href)
if (query == location.href) { query = "levels/level1.js" }
loadLevelScript(query)

module.exports.Game = function (rawLevel) {
    var level = require("./levelLoader.js")(threeData, rawLevel);
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
            camera.position.z = camData.pos[0];
            camera.position.y = camData.pos[1];
            camera.position.x = camData.pos[2];
            if (camData.lookAt) {
                camera.lookAt(new THREE.Vector3(camData.lookAt[0], camData.lookAt[1], camData.lookAt[2]))
            }

        }
    }
    var animate = function () {
        level.physicsTick(1 / 60);


        if (level.player.attached) {
            //move camera to attached
            camera.position.copy(level.objs[level.player.attached].position);
            camera.rotation.copy(level.objs[level.player.attached].rotation);
            //camera.lookAt(new THREE.Vector3( 0, 0, 0 ))
        }
        threeData.renderer.render(level.renderWorld, camera);
        requestAnimationFrame(animate);
    };
    animate();

    document.onmousedown = onDocumentMouseDown;

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onDocumentMouseDown(event) {
        event.preventDefault();

        mouse.x = (event.clientX / threeData.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = - (event.clientY / threeData.renderer.domElement.clientHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(level.objs);

        console.log(intersects)
    }

}
