//a pure-data level. to be processed later!

if(!module){var module = {}}
var level = module.exports = { 
    world:{
        grav:[0,-10,0],
        background:0x444444,
        camera:[20,20,20]
    },
    geos:{//cube and sphere gemoties are supports for MVP
        bar:      ["cube",2.9,1,1],
        floorGeo:   ["cube",50,1,50],
        ballGeo:    ["sphere",1,32,32],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        solidBlack: [["basic",0x000000],[0,0.2,0.2]],
        yellowDyn: [["basic",0xFFFF00],[25,0.2,0.2]],
        normal:        [["normal"],[1,0.2,0.2]],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","solidBlack",[0,-1,0],[0,0,0]],
        floor2:  ["floorGeo","solidBlack",[-40,15,0],[0,0,-1/8]],
        ball:["ballGeo","yellowDyn",[-40,20,0],[0,0,0]]
    },
}

for( var layer = 0; layer  < 10; layer++){
    for( var i = -5; i < 5; i++){
        var bar = ["bar","normal",[0,layer,i*3+(1.5*(layer%2))],[0,1/4,0]]
        level.objs["bar" + layer + "l" + i] = bar;    
    }
    var bar = ["bar","normal",[0,layer,(layer%2*2-1)*-15.25 - 1],[0,0,0]]
    level.objs["barEnd" + layer +"l"] = bar;    
    
}
console.log(level.objs)
sideLoadLevel(module.exports)
