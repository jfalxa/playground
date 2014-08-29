var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var rectLength = 50, rectWidth = 50;

var rectShape = new THREE.Shape();
rectShape.moveTo( 0,0 );
rectShape.lineTo( 0, rectWidth );
rectShape.lineTo( rectLength, rectWidth );
rectShape.lineTo( rectLength, 0 );
rectShape.lineTo( 0, 0 );

var rectGeom = new THREE.ShapeGeometry( rectShape );

var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
material.wireframe = true;

var rectMesh = new THREE.Mesh( rectGeom, material ) ;

scene.add( rectMesh );

camera.position.z = 100;

var render = function ()
{
	requestAnimationFrame(render);

	// cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};
