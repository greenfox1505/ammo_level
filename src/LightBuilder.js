var THREE = require("three")
var CANNON = require("cannon")

module.exports = function (name, lightArgs) {//todo verify input
    console.log(this,lightArgs);
    if(this.lights[name]){
        throw ("LIGHT BY THIS NAME ALREADY EXISTS!:" + name)
    }

    var ambientLight = new THREE.AmbientLight( 0xFFFFFF );
    this.renderWorld.add( ambientLight );


    var output;
    this.geos[name] = output;
    return {name:name,geo:this.geos[name]};
}    
