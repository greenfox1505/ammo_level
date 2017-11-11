//a pure-data level. to be processed later!

var s = 1;
var level = {
    world: {
        grav: [0, -10, 0],
        background: 0x888888,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s, s, s],
        ball: ["sphere", 2, 64, 32],
        floorGeo: ["cube", 100, 1, 100],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], [0, 0.2, 0.2]],
        iron: [["pbr", {
            roughnessMap: "assets/rustyIron/roughness.png",
            aoMap: "assets/rustyIron/metallic.png",
            normalMap: "assets/rustyIron/normal.png",
            map: "assets/rustyIron/basecolor.png"
        }], [0, 0.2, 0.2]],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, -1, 0], [0, 0, 0]],
    },
    lights: {
        amb: ["amb", { color: 0xffffff }],
        point1: ["point", { color: 0xFFFFFF, pos: [-5, 5, -5], shadow: true }],
    },
    player: {
        starting: { pos: [-5, 5, -5], lookAt: [0, 0, 0] },
        type: "Fly"
    },
    triggers: {
        postLoad: function () {
        },
        onFrame: function (t) {
            //console.log("Called onFrame",this)
        }
    }
}

for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
        for (var z = 0; z < 10; z++) {
            var name = "cube" + x + "." + y + "." + z
            level.objs[name] = ["cubeGeo", "iron", [x, y, z], [0, 0, 0]]
        }
    }
}

GameEngine.Game(level)