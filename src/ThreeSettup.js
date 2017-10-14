module.exports = function(THREE,args){
    var  builders = {
        createScene : function(){
            return new THREE.Scene()
        },
        createCamera: function(){
            return new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        }
    }
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    return {THREE:THREE,renderer:renderer,builders:builders};    
}