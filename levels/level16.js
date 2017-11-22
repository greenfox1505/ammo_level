//a pure-data level. to be processed later!

var s = 1;

var level = {
    world: {
        grav: [0, -10, 0],
        background: 0x0,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s, s, s],
        ball: ["sphere", 2, 64, 32],
    },
    floorGeo: ["cube", 100, 1, 100],
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], { mass: 0, fric: 0.9, res: 0.1 }],
        boxColor: [["pbr", { color: 0xff0000 }], { mass: 1, fric: 0.9, res: 0.1 }],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, -1, 0], [0, 0, 0]],
    },
    lights: {
        amb: ["amb", { color: 0xffffff,brightness:0.1 }],
        point1: ["point", { color: 0xFFFFFF, pos: [-5, 5, -5], shadow: true ,brightness:1}],
    },
    player: {
        starting: { pos: [-5, 5, -5], lookAt: [0, 0, 0] },
        type: "FPS"
    },
    triggers: {
        postLoad: function () {
            
        },
        onFrame: function (t) {
            //console.log("Called onFrame",this)
        }
    }
}

var b = 0;
for( var i = 0; i < 10; i++){
    level.objs["box" + b++] =  ["cubeGeo", "boxColor", [0, i+1, 0], [0, 0, 0]]
    
}
for( var i = 0; i < 10; i++){
    level.objs["box" + b++] =  ["cubeGeo", "floorColor", [i+5, i, 0], [0, 0, 0]]
    
}

GameEngine.Game(level)