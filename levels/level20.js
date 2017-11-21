

//a pure-data level. to be processed later!
var s = 1;

var level = {
    name: "The Padded Platform!",
    world: {
        grav: [0, -10, 0],
        background: 0x0,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s, s, s],
        ball: ["sphere", 2, 64, 32],
        floorGeo: ["cube", 100, 1, 100],
        cylinder: ["cylinder", .5, 0.25, 1, 32],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], { mass: 0, fric: 0.9, res: 0.1 }],
        wallColor: [["pbr", { normalMap: "assets/cush/normal.png" }], { mass: 0, fric: 0.9, res: 0.1 }],
        blue: [["pbr", {
            color: 0x0000ff,
            normalMap: "assets/Asphalt_New/Asphalt_New_Nor.jpg", 
            metalness:0.5,
            roughness:0.25,
            castShadow: false, 
            transparent: true, opacity: 0.75
        }], { mass: 10, fric: 0.9, res: 0.1 }],
        red: [["pbr", {
            color: 0xff0000,
            normalMap: "assets/Asphalt_New/Asphalt_New_Nor.jpg", 
            metalness:0.5,
            roughness:0.25,
            castShadow: false, 
            transparent: true, opacity: 0.75
        }], { mass: 10, fric: 0.9, res: 0.1 }],
    },
    objs: {//todo add all kinds of new properties, 
        door: [[
            ["cubeGeo", "wallColor", [1, 0, 0]],
            ["cubeGeo", "wallColor", [1, 1, 0]],
            ["cubeGeo", "wallColor", [1, 2, 0]],
            ["cubeGeo", "wallColor", [0, 2, 0]],
            ["cubeGeo", "wallColor", [-1, 2, 0]],
            ["cubeGeo", "wallColor", [-1, 1, 0]],
            ["cubeGeo", "wallColor", [-1, 0, 0]],
        ], "floorColor", [0, 1, 5], [0, 0, 0]],

        box1: ["cubeGeo", "blue", [0, 1, 0], [0, 0, 0]],
        box2: ["cubeGeo", "red", [.6, 2, 0], [0, 0, 0]],
        
    },
    lights: {
        amb: ["amb", { color: 0xffffff, brightness: 0.75 }],
        point1: ["point", { color: 0xFFFFFF, pos: [-5, 5, -5], shadow: true, brightness: 1 }],
    },
    player: {
        starting: { pos: [2, 2, 2], lookAt: [0, 0, 0] },
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

platform = [[], "wallColor", [-5, 0, -5], [0, 0, 0]]
platform2 = [[], "wallColor", [1, 0, -5], [0, 0, 0]]
platform2[0] = platform[0]
var n = 25
for (var i = 0; i < (n * n); i++) {
    x = (i / n) | 0
    z = (i % n)
    var element = ["cubeGeo", "wallColor", [x - ((n / 2) | 0), 0, z - ((n / 2) | 0)]]
    platform[0].push(element);
}

level.objs.platform = platform;
//level.objs.platform2= platform2;

GameEngine.Game(level)