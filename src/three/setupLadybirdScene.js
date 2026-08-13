import * as THREE from "three";

export function setupLadybirdScene(canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 0, 10);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setClearColor(0x000000, 0);

  /*
   * Lighting
   */
  const ambient = new THREE.AmbientLight(
    0xffffff,
    2
  );

  scene.add(ambient);

  const directional = new THREE.DirectionalLight(
    0xffffff,
    3
  );

  directional.position.set(5, 10, 10);

  scene.add(directional);

  function updateCamera() {
    camera.aspect =
      window.innerWidth / window.innerHeight;

    camera.fov =
      window.innerHeight <= 400 ? 15 :
      window.innerHeight <= 700 ? 18 :
      30;

    camera.updateProjectionMatrix();
  }

  function onWindowResize() {
    updateCamera();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }

  window.addEventListener(
    "resize",
    onWindowResize
  );

  updateCamera();

  return {
    scene,
    camera,
    renderer,

    cleanup() {
      window.removeEventListener(
        "resize",
        onWindowResize
      );

      renderer.dispose();
    },
  };
}