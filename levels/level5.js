var level = {
    world: {
        grav: [0, -10, 0],
        background: 0x444444,
        //camera: [40, 30, 30]
        camera: [30, 20, 10]
    },
    geos: {//cube and sphere gemoties are supports for MVP
        domino: ["cube", 0.25, 1.5, 0.75],
        floorGeo: ["cube", 50, 1, 50],
        ballGeo: ["sphere", 1, 32, 32],
    },
    mats: {//[COLOR,WEIGHT] todo, more complex physics and material properties
        solidBlack: [["basic", 0x000000], [0, 0.3, 0.1]],
        normal: [["normal"], [1, 0.3, 0.1]],
    },
    objs: {//todo add all kinds of new properties, 
        floor: ["floorGeo", "solidBlack", [0, -0.5, 0], [0, 0, 0]],
    },
}

var sizeX = level.geos.domino[1]
var sizeY = level.geos.domino[2]
var sizeZ = level.geos.domino[3]

dominoCount = 0;
/**
* Draws a line with Dominos
*/
function DominoLine(a, b, spacing) {
    var delta = {
        x: (b.x - a.x),
        y: (b.y - a.y)
    };
    var length = Math.sqrt((delta.x * delta.x) + (delta.y*delta.y))
    var count = (length/spacing)|0
    var realSpacing = {x:(delta.x/length)*spacing,y:(delta.y/length)*spacing}
    var theta =(Math.atan(delta.y/delta.x)/(-2*Math.PI));
    console.log(delta.y,delta.x,theta);
    for( var i = 0; i < count ; i ++){
        //place domino
        var x = a.x + realSpacing.x*i;
        var y = a.y + realSpacing.y*i;
        var dom = ["domino", "normal", [x, level.geos.domino[2]/2, y], [0, theta, 0]];
        //add domino
        level.objs["dom" + (dominoCount++)] = dom;
    }
}
function DominoArry(myDominos,spacing){
    for(var i = 0; i < (myDominos.length-1); i++){
        DominoLine(myDominos[i],myDominos[i+1],spacing);
    }
}

DominoArry([
    {x:20,y:20},
    {x:20,y:5},
    {x:20,y:0},
    {x:19,y:-2},
    {x:00,y:-20},
    {x:-18,y:-20},
    {x:-20,y:-18},
    {x:-20,y:-10},
],0.75)


//Domino Tower!
function DominoTower(x,y,h,size)
{
    if(size > 1){
        for(var i = 0; i < size; i++){
        var dom = ["domino", "normal", [x,sizeY/2+h,sizeY*i+y], [0, 1/4, 0]];    
        level.objs["dom" + (dominoCount++)] = dom;
        if(i !=(size-1)){
            var dom = ["domino", "normal", [x,sizeY+sizeX/2 + h,sizeY*(i+0.5)+y], [1/4, 1/4, 0]];    
            level.objs["dom" + (dominoCount++)] = dom;    
        }
    }
        DominoTower(x,y+sizeY/2,h+sizeX+sizeY,size-1)
    }
}
DominoTower(-20,-10,0,3);
DominoLine({x:-20,y:-7}, {x:-20,y:0}, 0.75)
DominoTower(-20,0,0,4);
DominoLine({x:-20,y:5}, {x:-20,y:10}, 0.75)
DominoTower(-20,10,0,6);



level.objs.dom0[3][2] = -0.1

console.log("DomminoCount:",dominoCount)
GameEngine.Game(level)
