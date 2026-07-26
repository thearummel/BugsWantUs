// Fruitbowl

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadCounter(world, refs) {
    const loader = new GLTFLoader();

    loader.load("/models/Counter.glb", (gltf) => {
        const counter = gltf.scene;
        world.scene.add(counter);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(counter);
         
        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        counter.position.sub(center);

       
        world.camera.position.set(0, 0, 3);
       
        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
 

         world.controls.minDistance = 0.1;
         world.controls.maxDistance = 3;


    




        world.controls.update();
     



        world.camera.updateProjectionMatrix();

    });
}