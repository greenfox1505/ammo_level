//a pure-data level. to be processed later!

module.exports = { 
    geos:{//cube and sphere gemoties are supports for MVP
        cubeGeo:["cube",1,1,1],
        floorGeo:["cube",10,1,10],
        ballGeo:["sphere",1,32,32],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        red:    ["basic",0xFF0000,0],
        green:  ["basic",0x00FF00,1],
        blue:   ["basic",0x0000FF,1]
    },
    objs:{//todo add all kinds of new properties, 
        floor:["floorGeo","red",[0,0,0]]
    }
}


for(var i = 1; i < 10; i++){
    var box = ["cubeGeo",["green","blue"][i%2],[0,i,0]]
    module.exports.objs["box" + i] = box;
}
