// Fruitbowl

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadCounter(world, refs) {
       const loader = new GLTFLoader(world.loadingManager);

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

    loader.load("/models/Fly.glb", (gltf) => {
        const fly = gltf.scene;

        // set transforms before adding to scene
        fly.position.set(0, 0, 0.8);
        fly.scale.set(0.5, 0.5, 0.5);

        // add to refs for indivisual objects later
        refs.fly = fly;

        // register with centralized registry; it will add to scene only if not collected
        registerAnimal("fly", fly, world.scene);


        //call names of animatabel items
        const objects = [
            "FlyRightWing",
            "FlyLeftWing",
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = fly.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });
    });

}