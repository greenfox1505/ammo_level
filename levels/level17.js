var THREE = GameEngine.THREE

//a pure-data level. to be processed later!

var brickRis = 0.9
var brickFric = 0.8
var level = {
    world: {
        grav: [0, -10, 0],
        background: 0x444444,
        camera: [10, 10, 10]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        brick: ["cube", 1, 0.5, 0.5],
        floorGeo: ["cube", 20, 1, 20],
        ballGeo: ["sphere", 0.5, 32, 32],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], [0, 0.2, 0.2]],
        ballColor: [["basic", 0xffffff], [100, brickFric, brickRis]],
        box0: [["pbr", { color: 0xffffff }], [1, brickFric, brickRis]],
        box1: [["pbr", { color: 0xffffff }], [1, brickFric, brickRis]],
        box2: [["pbr", { color: 0xffffff }], [1, brickFric, brickRis]],
        box3: [["pbr", { color: 0xffffff }], [1, brickFric, brickRis]],
        wood: [["pbr", {
            roughnessMap: "assets/Panel_Mahogany/Panel_Mahogany_Rou.jpg",
            aoMap: "assets/Panel_Mahogany/Panel_Mahogany_AO.jpg",
            normalMap: "assets/Panel_Mahogany/Panel_Mahogany_Nor.jpg",
            map: "assets/Panel_Mahogany/Panel_Mahogany_Alb.jpg"
        }], [0.5, 0.2, 0.2]],
    },
    lights: {
        amb: ["amb", { color: 0x40464f }],
        point1: ["point", { color: 0xff8888, pos: [-8, 8, 0], shadow: true, brightness: 0.25 }],
        point2: ["point", { color: 0x88ff88, pos: [0, 8, -8], shadow: true, brightness: 0.25 }],
        point3: ["point", { color: 0x8888ff, pos: [8, 8, 8], shadow: true, brightness: 0.25 }],
        ballLight: ["point", { color: 0xffffff, pos: [0, 0, 0], shadow: true, brightness: 1 }],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "floorColor", [0, -0.75, 0], [0, 0, 0]],
        floor2: ["floorGeo", "floorColor", [-10, 9, 0], [0, 0, 1 / 4]],
        floor3: ["floorGeo", "floorColor", [0, 9, -10], [1 / 4, 0, 0]],
        floor5: ["floorGeo", "floorColor", [10, 9, 0], [0, 0, 1 / 4]],
        floor6: ["floorGeo", "floorColor", [0, 9, 10], [1 / 4, 0, 0]],
        ball: ["ballGeo", "ballColor", [8, 5, 0], [0, 0, 0], [-50, 0, 0]],
    },
    triggers: {
        postLoad: function () {
            var level = this;
            level.objs.ball.add(level.lights.ballLight);
        }
    }
}
var ballCount = 0;
var bCount = 0;

var v3 = THREE.Vector3;


for (var i = 0; i < 8; i++) {
    var v = new THREE.Vector3(2, 0, 0);
    v.applyAxisAngle(new THREE.Vector3(0, 1, 0), i * Math.PI / 4)

    console.log(v)
}

function layer(offsetVect, isOdd) {
    var count = 16;
    for (var i = 0; i < count; i++) {
        var angleOffset = isOdd ? 1 / (count * 2) : 0
        var v = new THREE.Vector3(2.8, 0, 0);
        v.applyAxisAngle(new THREE.Vector3(0, 1, 0), (i / count + angleOffset) * Math.PI * 2).add(offsetVect);
        var brick = ["brick", "wood", [v.x, v.y, v.z], [0, i / count + 1 / 4 + angleOffset, 0]]
        level.objs["brink" + (bCount++)] = brick
    }
}
for (var i = 0; i < 20; i++) {
    layer(new THREE.Vector3(0, i / 2, 0), i % 2)
}
console.log(bCount + " BRICKS!")

GameEngine.Game(level)