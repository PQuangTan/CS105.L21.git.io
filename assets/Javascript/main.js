var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(document.getElementById('webglll'))
document.getElementById('webglll').appendChild(renderer.domElement);

// create the shape
var geometry = new THREE.SphereGeometry(1, 8, 10); // size of box

//create material, color or image
var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ); //wireframe false will not show wireframe
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

//game login
var update = function() {
// Just for fun
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.005;
};

// draw scene
var render = function() {
    renderer.render(scene, camera);
};

//run gameloop (update, render, repeat)
var GameLoop = function() {
    requestAnimationFrame(GameLoop);
    update();
    render();
};

GameLoop();
// Just for fun
scene.background = new THREE.Color( 'skyblue' );
