//a pure-data level. to be processed later!

var level = { 
    world:{
        grav:[0,-10,0],
        background:0x444444,
        camera:{
            pos:[20,20,20],
            lookAt:[0,0,0]
        }
    },
    geos:{//cube and sphere gemoties are supports for MVP
        bar:      ["cube",2.9,1,1],
        floorGeo:   ["cube",50,1,50],
        ballGeo:    ["sphere",1,32,32],
    },
    mats:{//[COLOR,WEIGHT] todo, more complex physics and material properties
        solidBlack: [["basic",0x000000],[0,0.2,0.2]],
        yellowDyn: [["basic",0xFFFF00],[25,0.2,0.2]],
        normal:        [["normal"],{mass:1,fric:0.01,res:0.05}],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","solidBlack",[0,-1,0],[0,0,0]],
        floor2:  ["floorGeo","solidBlack",[-40,15,0],[0,0,-1/8]],
        floor3:  ["floorGeo","solidBlack",[25,25,0],[0,0,-1/4]],
        ball:["ballGeo","yellowDyn",[-40,20,0],[0,-1/4,0]]
    },
    player:{
        //attached:"ball",
    }
}

for( var layer = 0; layer  < 10; layer++){
    for( var i = -5; i < 5; i++){
        var bar = ["bar","normal",[0,layer,i*3+(1.5*(layer%2))],[0,1/4,0]]
        level.objs["bar" + layer + "l" + i] = bar;    
    }
    var bar = ["bar","normal",[0,layer,(layer%2*2-1)*-15.25 - 1],[0,0,0]]
    level.objs["barEnd" + layer +"l"] = bar;    
    
}

GameEngine.Game(level)