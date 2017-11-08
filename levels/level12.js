//a pure-data level. to be processed later!

var level = { 
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
        wood:       [["pbr",{
            map:"assets/Panel_Mahogany/Panel_Mahogany_Alb.jpg"
        }],[1,0.2,0.2]],
    },
    objs:{//todo add all kinds of new properties, 
        floor:  ["floorGeo","floorColor",[0,0,0],[0,0,0]],
    },
    lights:{
        global: ["amb",{color:0xffffff}]
    },
    player:{
        position:[5,5,5],
        rotation:""
    }
}

for(var i = 1; i < 10; i++){
    var box = ["cubeGeo","wood",[0,i,0],[1/64,i/32,0]]
    level.objs["box" + i] = box;
}

GameEngine.Game(level)