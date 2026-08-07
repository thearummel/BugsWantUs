import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadFlowers(world, refs) {
console.log(refs)
    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/flower.glb", (gltf) => {

        const flowers = gltf.scene;
        world.scene.add(flowers);

        // Find grass groups

        refs.grasses = [];

        for (let i = 1; i <= 8; i++) {

            const name = `gras${i}`;

            const grass = flowers.getObjectByName(name);

            if (grass) {

                console.log("Found grass group:", name, grass);

                refs.grasses.push({
                    object: grass,
                    baseRotation: grass.rotation.y,
                    offset: i * 0.7
                });

            } else {

                console.warn("Missing grass group:", name);

            }
        }

        console.log("Total grasses found:", refs.grasses.length);

        //
        // Center model
        //

        const box = new THREE.Box3().setFromObject(flowers);
        const center = box.getCenter(new THREE.Vector3());

        flowers.position.sub(center);

        world.camera.position.set(0, 20, 5);

        world.controls.target.set(0, 0, 0);

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 5;

        world.controls.update();
        world.camera.updateProjectionMatrix();

    });

    loader.load("/models/bee.glb", (gltf) => {
        const bee = gltf.scene;

        bee.position.set(-1.2, -0.2, 0.8);
        bee.scale.set(0.5, 0.5, 0.5);

        refs.bee = bee;
        registerAnimal("bee", bee, world.scene);


    });

}