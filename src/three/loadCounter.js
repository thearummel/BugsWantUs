
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadCounter(world, refs) {
    const loader = new GLTFLoader();

    loader.load("/models/Counter.glb", (gltf) => {
        const counter = gltf.scene;
        world.scene.add(counter);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(counter);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        counter.position.sub(center);

       
        world.camera.position.set(0, 0, 3);
        world.camera.lookAt(0, 0, 0);

        // set control target to origin (the model is centered at origin now)
        world.controls.target.set(0, 0, 0);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;

  world.controls.minDistance = 0.1;
    world.controls.maxDistance = 3;


        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;




        world.controls.update();
     



        world.camera.updateProjectionMatrix();

    });
}