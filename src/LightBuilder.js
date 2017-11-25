var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (name, lightArgs) {//todo verify input
    if (this.lights[name]) {
        throw ("LIGHT BY THIS NAME ALREADY EXISTS!:" + name)
    }
    var output;

    if(lightArgs[0] == "amb"){
        var brightness = 1;
        if(lightArgs[1].brightness){brightness = lightArgs[1].brightness}
        var output = new THREE.AmbientLight(lightArgs[1].color,brightness);
    }
    else if(lightArgs[0] == "point"){
        var pos = lightArgs[1].pos
        var brightness = 1;
        var resolution = lightArgs[1].resolution?lightArgs[1].resolution:256
        if(lightArgs[1].brightness){brightness = lightArgs[1].brightness}
        output = new THREE.PointLight( lightArgs[1].color, brightness, 100 );
        output.position.set(pos[0],pos[1],pos[2]);
        if(lightArgs[1].shadow){
            output.castShadow = true;
            output.shadow.mapSize.width = 256;  // default
            output.shadow.mapSize.height = 256; // default
            output.shadow.camera.near = 1;       // default
            output.shadow.camera.far = 500  
        }
//        output.castShadow = lightArgs[1].shadow
    }
    else{
        throw "LIGHT TYPE NOT SUPPORTED"
    }


    this.renderWorld.add(output);
    
    this.lights[name] = output;
    return { name: name, light: output };
}    
