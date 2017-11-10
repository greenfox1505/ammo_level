var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (name, lightArgs) {//todo verify input
    console.log(this, lightArgs);
    if (this.lights[name]) {
        throw ("LIGHT BY THIS NAME ALREADY EXISTS!:" + name)
    }
    var output;

    if(lightArgs[0] == "amb"){
        var output = new THREE.AmbientLight(lightArgs[1].color);
    }
    else if(lightArgs[0] == "point"){
        var pos = lightArgs[1].pos
        output = new THREE.PointLight( lightArgs[1].color, 1, 100 );
        output.position.set(pos[0],pos[1],pos[2]);
        if(lightArgs[1].shadow){
            output.castShadow = true;
            output.shadow.mapSize.width = 512;  // default
            output.shadow.mapSize.height = 512; // default
            output.shadow.camera.near = 0.5;       // default
            output.shadow.camera.far = 500  
            console.log("SHADOW CAST!")
        }
//        output.castShadow = lightArgs[1].shadow
        console.log(this, output);
    }
    else{
        throw "LIGHT TYPE NOT SUPPORTED"
    }


    this.renderWorld.add(output);
    
    this.lights[name] = output;
    return { name: name, light: output };
}    
