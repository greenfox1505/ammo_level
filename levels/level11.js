var THREE = GameEngine.THREE 

//a pure-data level. to be processed later!

var brickRis = 0.9
var brickFric = 0.8
var level = {
    world: {
        grav: [0, -10, 0],
        background: 0x444444,
        camera: {pos:[8,8,8],lookAt:[0,2,0]}
    },
    geos: {//cube and sphere gemoties are supports for MVP
        brick: ["cube", 1, 0.5, 0.5],
        floorGeo: ["cube", 20, 1, 20],
        ballGeo: ["sphere", 0.5, 32, 32],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["normal", 0x000000], [0, 0.2, 0.2]],
        ballColor: [["basic", 0x411E8F], [100, brickFric, brickRis]],
        box0: [["basic", 0x335C49], [1, brickFric, brickRis]],
        box1: [["basic", 0x678C40], [1, brickFric, brickRis]],
        box2: [["basic", 0xBDBE36], [1, brickFric, brickRis]],
        box3: [["basic", 0xE5DD90], [1, brickFric, brickRis]],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, 0, 0], [0, 0, 0]],
        northWall: ["floorGeo", "floorColor", [10, 10, 0], [0, 0, 1/4]],
        southWall: ["floorGeo", "floorColor", [-10, 10, 0], [0, 0, 1/4]],
        eastWall: ["floorGeo", "floorColor", [0, 10, 10], [1/4, 0, 0]],
        eastWall: ["floorGeo", "floorColor", [0, 10, -10], [1/4, 0, 0]],
        ball: ["ballGeo", "ballColor", [7, 5, 7], [0, 0, 0],[-75,0,-75]],
    },
    player:{
        starting:{pos:[5,5,0],lookAt:[0,0,0]}
    }
}
var ballCount = 0;
var bCount = 0;

var v3 = THREE.Vector3;


for(var i = 0; i < 8; i++){
    var  v = new THREE.Vector3(2,0,0);
    v.applyAxisAngle(new THREE.Vector3(0,1,0), i*Math.PI/4)

    console.log(v)
}

function layer(offsetVect,isOdd) {
    var count = 16;
    for (var i = 0; i < count; i++) {
        var angleOffset = isOdd?1/(count*2):0
        var v = new THREE.Vector3(2.8, 0, 0);
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), (i/count+ angleOffset)*Math.PI*2).add(offsetVect);
        var brick = ["brick", "box"+(i%4), [v.x, v.y, v.z], [0, i/count+1/4 + angleOffset, 0]]
        level.objs["brink" + (bCount++)] = brick
    }
}
for( var i = 0; i < 20; i++){
    layer(new THREE.Vector3(0,i/2+ .75,0),i%2)
}
console.log(bCount + " BRICKS!")
// var radius = 1.5;
// var TU = Math.PI * 2
// for(var i = 0 ; i < 128 ;i++){
//     var layerAOffSet = (((i/8)|0)%4)*(1/16)
//     var angle = i/8 + layerAOffSet
//     var x = Math.sin(TU*angle)*radius
//     var z = Math.cos(TU*angle)*radius
//     var brick = ["brick","box"+(i%4),[x,.75+((i/8|0)*0.5),z],[0,angle,0]]
//     console.log("box"+(i%3))
//     level.objs["brick"+i] = brick;
// }

GameEngine.Game(JSON.parse(JSON.stringify(level)))