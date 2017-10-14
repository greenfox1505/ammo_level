//a pure-data level. to be processed later!

if(!module){var module = {}}
module.exports = { 
    world:{
        grav:[0,-10,0],
        background:0xFF00FF,
        camera:[5,5,5]
    },
    geos:{//cube and sphere gemoties are supports for MVP
        cubeGeo:    ["cube",1,1,1],
        floorGeo:   ["cube",10,1,10],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        floorColor: [["basic",0x261D1D],[0,0.2,0.2]],
        box0:       [["basic",0xF49393],[1,0.2,0.2]],
        box1:       [["basic",0xF21368],[1,0.2,0.2]],
        box2:       [["basic",0xAA236D],[1,0.2,0.2]],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","floorColor",[0,0,0],[0,0,0]],
    },
    lights:{
        global: ["amb",0xffe3d3,0.25]
    },
    player:{
        position:[5,5,5],
        rotation:""
    }
}

for(var i = 1; i < 10; i++){
    var box = ["cubeGeo","box"+i%3,[0,i,0],[1/64,i/32,0]]
    module.exports.objs["box" + i] = box;
}

window.sideLoadLevel(module.exports)