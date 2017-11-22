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
        var cubeCam;
        if (materialArgs[0][1].envMap == true) {
            //debugger
            cubeCam = new THREE.CubeCamera(1, 100000, 32);
            materialArgs[0][1].envMap = cubeCam.renderTarget;
        }else(materialArgs[0][1].envMap = null)
        var renderMat = new THREE.MeshStandardMaterial(TextureFilter(materialArgs[0][1]));
        if (materialArgs[0][1].envMap) {
            renderMat.envCamera = cubeCam;
        }

    }
    else { throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED" }
    renderMat.castShadow = true;
    if (materialArgs[0][1].castShadow != null) {
        renderMat.castShadow = materialArgs[0][1].castShadow;
    }
    renderMat.receiveShadow = true;
    if (materialArgs[0][1].receiveShadow != null) {
        renderMat.receiveShadow = materialArgs[0][1].receiveShadow;
    }

    this.mats[name] = { render: renderMat, physics: cannonMat }
    return this.mats[name];
}

var TextureLib = {}//todo cache textures with matching names
var mapTypes = ["map", "normalMap", "aoMap", "roughnessMap", "displacementMap"]
function TextureFilter(input) {
    for (j in mapTypes) {
        var i = mapTypes[j]
        if (input[i]) {
            input[i] = new THREE.TextureLoader().load(input[i]);
        }
    }
    return input
}