var THREE = require("three")
var CANNON = require("cannon")
//CANNON.Material("groundMaterial");

module.exports = function (name, materialArgs) {//todo verify input
    if(this.mats[name]){
        throw ("MATERIAL BY THIS NAME ALREADY EXISTS!:" + name)
    }
    {
        var physicData = materialArgs[1];
        if (Array.isArray(physicData)) {
            physicData = {
                mass: physicData[0],
                friction: physicData[1],
                restitution: physicData[2],
            }
        }
    }
    var cannonMat = new CANNON.Material();
    cannonMat.friction = physicData.friction;
    cannonMat.restitution = physicData.restitution;
    cannonMat.mass = physicData.mass;
    var renderMat;
    if (materialArgs[0][0] == "basic") {
        var renderMat = new THREE.MeshBasicMaterial({ color: materialArgs[0][1] })
    } else if (materialArgs[0][0] == "normal") {
        var renderMat = new THREE.MeshNormalMaterial();
    }
    else { throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED" }
    
    this.mats[name] = { render: renderMat,physics: cannonMat}
    return this.mats[name];
}    

