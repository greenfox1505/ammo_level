var THREE = require("three/build/three.min.js")

var threeData = require("./ThreeSettup.js")(THREE,{});
var scene = threeData[0];var camera = threeData[1];var renderer = threeData[2]


var level = require("./levelLoader.js")({scene:scene},require("./level1.js"));



camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3( 0, 0, 0 ))

var animate = function () {
    level.physicsTick(1/60);
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    renderer.render(scene, camera);

    requestAnimationFrame( animate );
};

animate();