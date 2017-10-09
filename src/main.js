var THREE = require("three/build/three.min.js")

var threeData = require("./ThreeSettup.js")(THREE,{});
var scene = threeData[0];var camera = threeData[1];var renderer = threeData[2]


//read url, pull level, add it to script:
function loadLevelScript(LevelURL){
    var levelScript = document.createElement("script");
    levelScript.src = LevelURL
    document.body.appendChild(levelScript)
    
}
var query = location.href.substring(location.href.indexOf("?")+1);
console.log(query == location.href)
if(query == location.href){query = "levels/level1.js"}
loadLevelScript(query)

window.sideLoadLevel = function(rawLevel){

    var level = require("./levelLoader.js")({scene:scene,renderer:renderer},rawLevel);
    
    camera.position.z = rawLevel.world.camera[0];
    camera.position.y = rawLevel.world.camera[1];
    camera.position.x = rawLevel.world.camera[2];
    camera.lookAt(new THREE.Vector3( 0, 0, 0 ))
    
    var animate = function () {
        level.physicsTick(1/60);
        // cube.rotation.x += 0.1;
        // cube.rotation.y += 0.1;
    
        renderer.render(scene, camera);
    
        requestAnimationFrame( animate );
    };
    
    animate();
}
