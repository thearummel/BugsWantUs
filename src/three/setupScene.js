import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function setupScene(canvas) {

    const loadingManager = new THREE.LoadingManager();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

   function updateCamera() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.fov =
        window.innerHeight <= 400 ? 15 :
        window.innerHeight <= 700 ? 18 :
        
        30;

    camera.updateProjectionMatrix();
}
updateCamera();

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    /*   controls.zoomToCursor = true; */



    const dir = new THREE.DirectionalLight(0xffffff, 4);
    dir.position.set(35, 20, 100);
    scene.add(dir);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // handle resize to keep aspect/fov correct
    function onWindowResize() {
        updateCamera();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize);


    return {
        scene,
        camera,
        renderer,
        controls,
        raycaster,
        mouse,
        loadingManager
    };
}