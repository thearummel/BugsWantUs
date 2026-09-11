import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadRiver(world, refs) {

    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/byRiver.glb", (gltf) => {

        const river = gltf.scene;
        world.scene.add(river);


        let box = new THREE.Box3().setFromObject(river);
        let center = box.getCenter(new THREE.Vector3());

        river.position.sub(center);

        world.camera.position.set(0, 0, 6);

        world.controls.target.set(0, 0, 0);

        world.controls.minDistance = 2;
        world.controls.maxDistance = 6;

        world.controls.update();
        world.camera.updateProjectionMatrix();



        const objects = [
            "RiverGrasOne",
            "RiverGrasTwo",
            "RiverGrasThree"
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = river.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });

    });


    loader.load("/models/YellowSally.glb", (gltf) => {
        const yellowsally = gltf.scene;

        yellowsally.position.set(-0.8, -0.4, 0);
        yellowsally.rotation.set(0, 0, -0.1)
        yellowsally.scale.set(21, 21, 21);

        refs.yellowsally = yellowsally;

        registerAnimal("yellowsally", yellowsally, world.scene);

        const objects = [
            "SallyBody",
            "SallyLegTwo",
            "SallyLegOne",
            "SallyLegLow",
            "SallyLegMiddle",
        ]
        objects.forEach(name => {

            refs[name.toLowerCase()] = yellowsally.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });

    });


}