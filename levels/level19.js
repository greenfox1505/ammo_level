//a pure-data level. to be processed later!

var s = 1;

var level = {
    name:"Wonky Cylinders and Compound Shapes!",
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
        boxColor0: [["pbr", { color: 0xff0000 ,roughness:0.5,normalMap: "assets/cush/normal.png",transparent:true,opacity:0.75,castShadow:false}], { mass: 1, fric: 0.9, res: 0.1 }],
        boxColor1: [["pbr", { color: 0xff ,roughness:0.5,roughnessMap: "assets/Panel_Mahogany/Panel_Mahogany_Rou.jpg",normalMap: "assets/Panel_Mahogany/Panel_Mahogany_Nor.jpg",transparent:true,opacity:0.75,castShadow:true}], { mass: 1, fric: 0.9, res: 0.1 }],
        compoundColor: [["pbr", { color: 0x00FF00,roughness:1 ,metalness:1}], { mass: 1, fric: 0.9, res: 0.1 }],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, -1, 0], [0, 0, 0]],
        compound: [
            [
                ["cubeGeo", "compoundColor", [-1, -1, 0]],
                ["cubeGeo", "boxColor1", [0, 0, 0]],
                ["cubeGeo", "compoundColor",      [1, 1, 0]],
            ],"compoundColor", [-5, 10, 0], [0, 0, 0]],
        door:[[
            ["cubeGeo", "floorColor", [1, 0, 0]],
            ["cubeGeo", "floorColor", [1, 1, 0]],
            ["cubeGeo", "floorColor", [1, 2, 0]],
            ["cubeGeo", "floorColor", [0, 2, 0]],
            ["cubeGeo", "floorColor", [-1, 2, 0]],
            ["cubeGeo", "floorColor", [-1, 1, 0]],
            ["cubeGeo", "floorColor", [-1, 0, 0]],
        ],"floorColor", [0,0,5], [0, 0, 0]]

        
    },
    lights: {
        amb: ["amb", { color: 0xffffff, brightness: 0.1 }],
        point1: ["point", { color: 0xFFFFFF, pos: [-5, 5, -5], shadow: true, brightness: 1 }],
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
console.log(level.objs.compound)



var b = 0;
for (var i = 0; i < 10; i++) {
    level.objs["box" + b++] = ["cubeGeo", "boxColor" + (i%2), [0, i + 1, 0], [0, 0, 0]]
}
for (var i = 0; i < 10; i++) {
    level.objs["box" + b++] = ["cylinder", "boxColor" + (i%2), [0, i + 1, -5], [0, 0, 0]]
}
for (var i = 0; i < 10; i++) {
    level.objs["box" + b++] = ["cubeGeo", "floorColor", [i + 5, i, 0], [0, 0, 0]]

}

GameEngine.Game(level)