var THREE = require("three")
var CANNON = require("cannon")
//CANNON.Material("groundMaterial");

module.exports = function (name, materialArgs) {//todo verify input
    if (this.mats[name]) {
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
    else if (materialArgs[0][0] == "pbr") {
        var renderMat = new THREE.MeshStandardMaterial(TextureFilter(materialArgs[0][1]));
        console.log(materialArgs[0], renderMat)
    }
    else { throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED" }

    this.mats[name] = { render: renderMat, physics: cannonMat }
    return this.mats[name];
}

var TextureLib = {}//todo cache textures with matching names
function TextureFilter(input) {
    const mapTypes = ["map", "normalMap"]
    for (i of mapTypes) {
        if (input[i]) {
            input[i] = new THREE.TextureLoader().load(input[i]);
        }
    }
    console.log("TEXTURE FILTER" , input);
    return input
}