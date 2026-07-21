import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function setupScene(canvas) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        5000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.zoomToCursor = true;
    controls.enablePan = true;

   

  

    // lights
    const dir = new THREE.DirectionalLight(0xffffff, 4);
    dir.position.set(35, 20, 100);
    scene.add(dir);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // handle resize to keep aspect/fov correct
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onWindowResize);

    return {
        scene,
        camera,
        renderer,
        controls,
        raycaster,
        mouse
    };
}