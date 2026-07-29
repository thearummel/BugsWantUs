// Fruitbowl

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadBush(world, refs) {
    const loader = new GLTFLoader();

    loader.load("/models/bush.glb", (gltf) => {
        const bush = gltf.scene;
        world.scene.add(bush);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(bush);
         
        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        bush.position.sub(center);

       
        world.camera.position.set(0, 0, 7);
        world.camera.lookAt(0, 0, 0);

        // set control target to origin (the model is centered at origin now)
        world.controls.target.set(0, 0, 0);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
 

         world.controls.minDistance = 0.1;
         world.controls.maxDistance = 7;

        world.controls.update();

        world.camera.updateProjectionMatrix();

    });

    loader.load("/models/butterfly.glb", (gltf) => {
        const butterfly = gltf.scene;
        world.scene.add(butterfly);

        butterfly.position.set(0, -0.8, 3.7);
        butterfly.scale.set(0.5, 0.5, 0.5);
            });
}