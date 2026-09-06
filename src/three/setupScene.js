import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function setupScene(canvas) {
    let loadingManager = new THREE.LoadingManager();
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    function updateCamera() {
      /*   camera.aspect = window.innerWidth / window.innerHeight; */

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
    renderer.shadowMap.enabled = false;

    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );

    const isMobile = () => window.innerWidth < 450;

    controls.enablePan = isMobile();
    controls.enableRotate = false;
    controls.enableZoom = true;

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Prevent vertical movement.
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

   

    const minPanX = -1;
    const maxPanX = 1;
    

    controls.addEventListener("change", () => {
        if (!isMobile()) return; //https://medium.com/swlh/return-early-pattern-3d18a41bba8

        controls.target.x = THREE.MathUtils.clamp(
            controls.target.x,
            minPanX,
            maxPanX
        );
         controls.target.y = THREE.MathUtils.clamp(
            controls.target.y,
            minPanX,
            maxPanX
        );
    });

  

    const dir = new THREE.DirectionalLight(
        0xffffff,
        4
    );

    dir.position.set(35, 20, 100);
    scene.add(dir);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();


    function onWindowResize() {
        updateCamera();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        controls.enablePan = isMobile();

        if (!isMobile()) {
            controls.target.x = 0;
        }

        controls.update();
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