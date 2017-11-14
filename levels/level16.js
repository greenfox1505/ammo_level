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
        floorGeo: ["cube", 100, 1, 100],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], [0, 0.2, 0.2]],
        boxColor: [["pbr", { color: 0xff0000 }], [1, 0.2, 0.2]],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, -1, 0], [0, 0, 0]],
        box1: ["cubeGeo", "boxColor", [0, 1, 0], [0, 0, 0]],
    },
    lights: {
        amb: ["amb", { color: 0xffffff }],
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


GameEngine.Game(level)