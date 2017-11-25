//a pure-data level. to be processed later!
var s = 1;

var opacity = 0.5

var Room1Size = 50
var HallSize = 5
var level = {
    name: "Welcome",
    world: {
        grav: [0, -10, 0],
        background: 0xff,
        camera: [5, 5, 5]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        cubeGeo: ["cube", s, s, s],
        ball: ["sphere", 1, 64, 32],
        room1Edge: ["cube", Room1Size, 1, Room1Size],
        room1DoorBottom: ["cube", Room1Size, 1, (Room1Size - HallSize) / 2],
        room1DoorSide: ["cube", (Room1Size - 4) / 2, 1, (Room1Size) / 2],
        platform: ["cube", HallSize, 1, HallSize],
        hallBox: ["cube", HallSize, HallSize, HallSize],
        ramp: ["cube", HallSize, 1, HallSize * Math.SQRT2],
        longBarGeo: ["cube", 20, 1, HallSize],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["pbr", { color: 0xffffff }], { mass: 0, fric: 0.9, res: 0.1 }],
        red: [["pbr", { color: 0xff0000 }], { mass: 0, fric: 0.9, res: 0.1 }],
        green: [["pbr", { color: 0x00ff00 }], { mass: 0, fric: 0.9, res: 0.1 }],
        rust: [["pbr", {
            map: "assets/rustyIron/basecolor.png",
            normalMap: "assets/rustyIron/normal.png",
            roughnessMap: "assets/rustyIron/roughness.png",
            metalnessMap: "assets/rustyIron/metallic.png",
            // metalness:100000,
            castShadow: true,
            envMap: true
        }], { mass: 10, fric: 0.9, res: 0.1 }],
    },
    objs: {
        room1Floor: ["room1Edge", "floorColor", [0, 0, 0], [0, 0, 0]],
        room1Top: ["room1Edge", "floorColor", [0, Room1Size, 0], [0, 0, 0]],
        room1wall0: ["room1Edge", "floorColor", [Room1Size / 2, Room1Size / 2, 0], [0, 0, 1 / 4]],
        room1wall1: ["room1Edge", "floorColor", [-Room1Size / 2, Room1Size / 2, 0], [0, 0, 1 / 4]],
        room1wall2: ["room1Edge", "floorColor", [0, Room1Size / 2, -Room1Size / 2], [1 / 4, 0, 0]],
        room1wall3pT: ["room1DoorBottom", "floorColor", [0, Room1Size / 2 + (Room1Size / 4 + HallSize / 4), Room1Size / 2], [1 / 4, 0, 0]],
        room1wall3pB: ["room1DoorBottom", "floorColor", [0, Room1Size / 2 - (Room1Size / 4 + HallSize / 4), Room1Size / 2], [1 / 4, 0, 0]],
        room1wall3pL: ["room1DoorBottom", "floorColor", [0 + (Room1Size / 4 + HallSize / 4), Room1Size / 2, (Room1Size / 2)], [1 / 4, 1 / 4, 0]],
        room1wall3pR: ["room1DoorBottom", "floorColor", [0 - (Room1Size / 4 + HallSize / 4), Room1Size / 2, (Room1Size / 2)], [1 / 4, 1 / 4, 0]],
        // room1wall3pB: ["room1Door", "debugColor", [0, Room1Size/2 +12.5, Room1Size/2], [1/4, 0, 0]],
        // hallMessure: ["hallBox", "green", [0, Room1Size / 2, Room1Size / 2], [0, 0, 0]],

        rustBall: ["ball", "rust", [2, 2, -5], [0, 0, 0]],

    },
    lights: {
        amb: ["amb", { color: 0xffffff, brightness: 0.75 }],
        overhead: ["point", { color: 0xFFFFFF, pos: [0, Room1Size / 2, 0], shadow: true, brightness: 0.5 ,resolution:1028}],

    },
    player: {
        starting: { pos: [2, 5, 2], lookAt: [7, 2, 7] },
        type: "FPS"
    },
    triggers: {
        postLoad: function () {
        },
        onFrame: function (t) {
            this.mats.rust.render.envCamera.position.copy(this.objs.rustBall.position)
            this.mats.rust.render.envCamera.update(this.interfaces.renderer, this.renderWorld);

            //console.log("Called onFrame",this)
        }
    }
}

var list = {
    ramp1: { type: "ramp", pos: [22, 0, -2], rot: [0, 0, 0] },
    ramp2: { type: "ramp", pos: [22, 5, -12], rot: [0, 0, 0] },
    ramp3: { type: "ramp", pos: [22, 10, -22], rot: [0, 0, 0] },
    ramp4: { type: "ramp", pos: [22, 10, -22], rot: [0, -1 / 4, 0] },
    bar1: { type: "longBar", pos: [4, 10, -22], rot: [0, 0, 0] },
    ramp5: { type: "ramp", pos: [-14, 10, -22], rot: [0, 1 / 4, 0] },
}
for (i in list) {
    var groups = {
        ramp: [["platform", "red", [0, 5, 0], [0, 0, 0]],
        ["ramp", "red", [0, 2.5, 5], [1 / 8, 0, 0]]],
        longBar: [["longBarGeo", "red", [0, 0, 0], [0, 0, 0]]]

    }
    var rampGroup = [groups[list[i].type]
        , "red", list[i].pos, list[i].rot];
    level.objs[i] = rampGroup;

}

GameEngine.Game(level)