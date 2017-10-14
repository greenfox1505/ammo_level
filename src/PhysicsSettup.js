var AMMO = require("ammo.js");

module.exports = function (args) {
    var Create = {}
    Create.PhysicsWorld = function(grav) {
        var collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
            dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
            overlappingPairCache = new Ammo.btDbvtBroadphase(),
            solver = new Ammo.btSequentialImpulseConstraintSolver(),
            dynamicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
        dynamicsWorld.setGravity(new Ammo.btVector3(grav[0], grav[1], grav[2]));

        dynamicsWorld.distroy = function () {
            Ammo.destroy(dynamicsWorld);
            Ammo.destroy(solver);
            Ammo.destroy(overlappingPairCache);
            Ammo.destroy(dispatcher);
            Ammo.destroy(collisionConfiguration);
        }

        return dynamicsWorld;
    };
    Create.Box = function(size){
        var output = new Ammo.btBoxShape(new Ammo.btVector3(size[0], size[1], size[2]));
        output.delete = function(){
            Ammo.distroy(output);
        }
        return output;
    }
    Create.Sphere = function(radius){
        return new Ammo.btSphereShape(radius);
    }
    Create.Sphere = function(args){
        //mass
        //friction
        
    }
    

    return {
        AMMO: AMMO,
        Create:Create
    }
}