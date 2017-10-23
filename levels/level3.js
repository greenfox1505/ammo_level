//a pure-data level. to be processed later!

var brickRis = 0.1
var brickFric = 0.4
var level = { 
    world:{
        grav:[0,-10,0],
        background:0x444444,
        camera:[10,10,10]
    },
    geos:{//cube and sphere gemoties are supports for MVP
        brick:      ["cube",10,0.5,0.5],
        floorGeo:   ["cube",20,1,20],
        ballGeo:    ["sphere",1,32,32],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["basic",0x000000],[0,0.2,0.2]],
        bar:        [["normal"],[0,0.2,0.2]],
        ballColor:     [["basic",0x411E8F],[10,brickFric,brickRis]],
        box0:       [["normal"],[1,brickFric,brickRis]],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","floorColor",[0,0,0],[0,0,0]],
    },
}

var i = 0;
for( i of [1,2,3,4,5,6,7,8,9]){
    var brick = ["brick","box0",[i,4.75,0],[0,1/8,0]]
    level.objs["brick"+i] = brick;
    console.log(i);
}
var brick = ["brick","bar",[3,3,-3],[0,3/8,0]]
level.objs["bar"] = brick;

GameEngine.Game(level)