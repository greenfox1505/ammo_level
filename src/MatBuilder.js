var THREE = require("three")

module.exports = function (materialArgs) {//todo verify input
    {
        var physicData = materialArgs[1];
        if (Array.isArray(physicData)) {
            var physics = {
                move: physicData[0] ? true : false, // dynamic or statique
                density: physicData[0] ? physicData[0] : 1,
                friction: physicData[1],
                restitution: physicData[2],
            }
        }
        else {
            var physics = {
                move: physicData.mass ? true : false, // dynamic or statique
                density: physicData.mass,
                friction: physicData.fric,
                restitution: physicData.rest,
            }
        }
    }
    if (materialArgs[0][0] == "basic") {
        return [new THREE.MeshBasicMaterial({ color: materialArgs[0][1] }), physics]
    } else if (materialArgs[0][0] == "normal") {
        return [new THREE.MeshNormalMaterial(), physics]
    }
    else { throw "ERROR, THIS MATERIAL IS NOT IMPLEMENTED" }



}    
