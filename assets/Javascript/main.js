let camera, scene, renderer;
let cameraControls;
let effectController;

let tess = 0;
let shading;

let sphere, texturecube;

let wireMaterial, pointsMaterial;
let gui


function main() {
    if (tess === 0) {
        tess += 1;
        init();
        render();

        function init() {
            const container = document.createElement('div');
            document.body.appendChild(container);

            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;
            
            //Camera
            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
            camera.position.set( 100, 100, 100 );

            //LIGHTS
            ambientLight = new THREE.AmbientLight( 0x333333);
        
            light = new THREE.DirectionalLight( 0xffffff, 1.0);
            // direction is Set in Gui

            //RENDER
            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( canvasWidth, canvasHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;
            container.appendChild( renderer.domElement );

            // EVENTS
            window.addEventListener('resize', onWindowResize);

            //CONTROLS
            cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
            cameraControls.addEventListener('change', render);

            //TEXTURE MAP

            // REFILECTION MAP

            // MATERIALS

            wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } );
            pointsMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: false} ); //wireframe false will not show wireframe
            var pointsMaterial = new THREE.PointsMaterial({
                size: 0.5
            });

            // scene itself
            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xAAAAAA);

            scene.add(ambientLight);
            scene.add(light);

            setupGui();
        }

        function onWindowResize() {

            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;
            renderer.setSize(canvasWidth, canvasHeight);

            camera.aspect = canvasWidth/canvasHeight;
            camera.updateProjectionMatrix();

            render();
        }

        function setupGui() {

            effectController = {
                newShading: "WireFrame"
            };

            let h;
            
            gui = new dat.GUI();
            console.log(gui)

            // materials (attributes)
            
            gui.add(effectController, "newShading", ["WireFrame", "Point"]).name("shading").onChange( render );
        }

        function render() {
            if ( effectController.newShading !== shading ) {
                shading = effectController.newShading;
                createNewSphere();
            }

            renderer.render(scene, camera);
        }

        function createNewSphere(){

            if (sphere !== undefined) {

                sphere.geometry.dispose();
                scene.remove( sphere );

            }

            const sphereGeometry = new THREE.SphereGeometry(30,20,20);
            if (shading === "Point") {
                sphere = new THREE.Points(sphereGeometry, pointsMaterial);
            } else {
                sphere = new THREE.Mesh(sphereGeometry,wireMaterial);
            }

            
            
            scene.add( sphere );
        }
    }
}