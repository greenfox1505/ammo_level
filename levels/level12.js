//a pure-data level. to be processed later!

var s = 3;
var level = {
    world: {
        grav: [0, -10, 0],
        background: 0xFF00FF,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s,s,s],
        floorGeo: ["cube", 100, 1, 100],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", {color:0xff00ff}], [0, 0.2, 0.2]],
        wood: [["pbr", {
            roughnessMap:"assets/Panel_Mahogany/Panel_Mahogany_Rou.jpg",
            aoMap:"assets/Panel_Mahogany/Panel_Mahogany_AO.jpg",/*  */
            normalMap:"assets/Panel_Mahogany/Panel_Mahogany_Nor.jpg",
            map: "assets/Panel_Mahogany/Panel_Mahogany_Alb.jpg"
        }], [0.5, 0.2, 0.2]],
        tile: [["pbr", {
            roughnessMap:"assets/Tiles_2/Tiles_2_Rou.jpg",
            aoMap:"assets/Tiles_2/Tiles_2_AO.jpg",
            normalMap:"assets/Tiles_2/Tiles_2_Nor.jpg",
            map: "assets/Tiles_2/Tiles_2_Alb.jpg"
        }], [0.5, 0.2, 0.2]],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, 0, 0], [0, 0, 0]],
    },
    lights: {
        amb: ["amb", { color: 0x40464f }],
        point1: ["point", { color: 0xff0000,pos:[0,1,5],shadow:true }],
        point2: ["point", { color: 0x00ff00,pos:[5,1,0],shadow:true }],
    },
    player: {
        starting: { pos: [5, 5, 0], lookAt: [0, 0, 0] }
    }
}

for (var i = 1; i < 10; i++) {
    var box = ["cubeGeo", ["tile","wood"][i%2], [0, s*i, 0], [0, i / 32, 0]]
    level.objs["box" + i] = box;
}

GameEngine.Game(level)