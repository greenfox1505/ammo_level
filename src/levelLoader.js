var THREE = require("three")
var OIMO = require("oimo")

var GeoBuilder = require("./GeoBuilder.js")
var MatBuilder = require("./MatBuilder.js")

module.exports = function(interfaces,rawLevel){
    var scene = interfaces.scene;
    var renderer = interfaces.renderer;
    if(rawLevel.world.background) {renderer = renderer.setClearColor( rawLevel.world.background, 1 );}

    var world = interfaces.world = new OIMO.World({ 
        timestep: 1/60, //probably needs to become dynamic for framerate reasons
        iterations: 8, 
        broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
        worldscale: 1, // scale full world 
        random: true,  // randomize sample
        info: false,   // calculate statistic or not
        gravity: rawLevel.world.grav
    });

    var level = { //fully loaded level
        mats:{},
        geos:{},
        objs:{},
        phyWorld:world
    }

    for( var i in rawLevel.geos){
        level.geos[i] = GeoBuilder(rawLevel.geos[i])
    }
    for( var i in rawLevel.mats){
        level.mats[i] = MatBuilder(rawLevel.mats[i])
    }
    for( var i in rawLevel.objs){
        var geo = level.geos[rawLevel.objs[i][0]]
        var mat = level.mats[rawLevel.objs[i][1]]
        //todo physics stuffs!
        var obj = level.objs[i] = new THREE.Mesh(geo[0],mat[0]);
        if(rawLevel.objs[i][2]){//positions
            obj.position.x = rawLevel.objs[i][2][0]
            obj.position.y = rawLevel.objs[i][2][1]
            obj.position.z = rawLevel.objs[i][2][2]
        }
        if(rawLevel.objs[i][3]){//rotations,radians
            obj.rotation.x = rawLevel.objs[i][3][0]*Math.PI*2
            obj.rotation.y = rawLevel.objs[i][3][1]*Math.PI*2*360
            obj.rotation.z = rawLevel.objs[i][3][2]*Math.PI*2
        }
        console.log(geo[1],mat[1]);
        obj.phys = world.add({
            type:geo[1].type, // type of shape : sphere, box, cylinder 
            size:geo[1].size, // size of shape
            pos:rawLevel.objs[i][2],
            rot:[
                rawLevel.objs[i][3][0]*360,
                rawLevel.objs[i][3][1]*360,
                rawLevel.objs[i][3][2]*360
            ], // start rotation in degree
            move:mat[1].move, // dynamic or statique
            density: mat[1].density,
            friction: mat[1].friction,
            restitution: mat[1].restitution,
            belongsTo: 1, // The bits of the collision groups to which the shape belongs.
            collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
        })
    }

    level.physicsTick= function(time){
        //copy physics data to world data
        world.step();
        
        for( var i in level.objs){
            var obj = level.objs[i];
            //console.log(obj.phys.getPosition())
            obj.position.copy(obj.phys.getPosition())
            obj.quaternion.copy(obj.phys.getQuaternion())
            
        }

        // and copy position and rotation to three mesh
        // myMesh.position.copy( body.getPosition() );
        // myMesh.quaternion.copy( body.getQuaternion() );
    }

    for(var i in level.objs){
        scene.add(level.objs[i]);
    }

    console.log(level);
    return level;
}