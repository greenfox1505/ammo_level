var THREE = require("three/build/three.min.js")
var Ammo = require("ammo.js/builds/ammo.js")

var GeoBuilder = require("./GeoBuilder.js")
var MatBuilder = require("./MatBuilder.js")


//todo level loader module!
var rawLevel = require("./level1.js");
var level = { //fully loaded level
    mats:{},
    geos:{},
    objs:{}
}

for( var i in rawLevel.geos){
    level.geos[i] = GeoBuilder(rawLevel.geos[i])
}
for( var i in rawLevel.mats){
    console.log(i)
    level.mats[i] = MatBuilder(rawLevel.mats[i])
    console.log(level.mats[i][0].color)
}
for( var i in rawLevel.objs){
    var geo = level.geos[rawLevel.objs[i][0]]
    var mat = level.mats[rawLevel.objs[i][1]]
    console.log(rawLevel.objs[i][1])
    //todo physics stuffs!
    level.objs[i] = new THREE.Mesh(geo[0],mat[0]);
    console.log(rawLevel.objs[i][2])
    level.objs[i].position.x = rawLevel.objs[i][2][0]
    level.objs[i].position.y = rawLevel.objs[i][2][1]
    level.objs[i].position.z = rawLevel.objs[i][2][2]
}
console.log(level)


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
for(var i in level.objs){
    scene.add(level.objs[i]);
}


camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(new THREE.Vector3( 0, 0, 0 ))

var animate = function () {
    level;
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    renderer.render(scene, camera);

    requestAnimationFrame( animate );
};

animate();

