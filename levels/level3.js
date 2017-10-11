//a pure-data level. to be processed later!

var brickRis = 0.0001
var brickFric = 0.3
var y = 0.5
if(!module){var module = {}}
var level = module.exports = { 
    world:{
        grav:[0,-10,0],
        background:0x444444,
        camera:[10,10,10]
    },
    geos:{//cube and sphere gemoties are supports for MVP
        brick:      ["cube",1,y,0.5],
        floorGeo:   ["cube",20,1,20],
        ballGeo:    ["sphere",1,32,32],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: ["basic",0x000000,[0,0.2,0.2]],
        ballColor:     ["basic",0x411E8F,[10,brickFric,brickRis]],
        box0:       ["basic",0x335C49,[1,brickFric,brickRis]],
        box1:       ["basic",0x678C40,[1,brickFric,brickRis]],
        box2:       ["basic",0xBDBE36,[1,brickFric,brickRis]],
        box3:       ["basic",0xE5DD90,[1,brickFric,brickRis]],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","floorColor",[0,0,0],[0,0,0]],
        floor2: ["floorGeo","floorColor",[15,5,0],[0,0,-7/8]],
        ball:   ["ballGeo","ballColor",[15,10,0],[0,0,0]],
    },
}

var radius = 1.5;
var TU = Math.PI * 2
for(var i = 0 ; i < 32 ;i++){
	var angle = i/4;
    var loc = [Math.sin(TU*angle)*radius,0.75 + (0.5*((i/4)|0)),Math.cos(TU*angle)*radius]
    var brick = ["brick","box"+(i%4),loc,[0,angle,0]]
    console.log("box"+(i%3))
    level.objs["brick"+i] = brick;
}

sideLoadLevel(module.exports)
