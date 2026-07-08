import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function setupScene(canvas) {


    let scene = new THREE.Scene();


    let camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );


    let renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    let controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomToCursor = true;
    controls.enablePan = false;

    const limit = THREE.MathUtils.degToRad(0);

   controls.minPolarAngle = Math.PI / 2 - limit ;
   controls.maxPolarAngle = Math.PI / 2 + limit;

    controls.minAzimuthAngle = Math.PI / 40;
    controls.maxAzimuthAngle = Math.PI / 40;

    controls.minDistance = 0;
    controls.maxDistance = 18;



    let dir = new THREE.DirectionalLight(0xffffff, 4);
    dir.position.set(35, 20, 100);
    scene.add(dir);


    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    return {
        scene,
        camera,
        renderer,
        controls,
        raycaster,
        mouse
    };
}