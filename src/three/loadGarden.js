import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js"; 

export function loadGarden(world, refs) {
    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/garden.glb", (gltf) => {
        const garden = gltf.scene;
        world.scene.add(garden);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(garden);

        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        garden.position.sub(center);


        world.camera.position.set(0, 0, 14);

        //world.camera.lookAt(0, 1000, 0);

        // set control target to origin (the model is centered at origin now)
       // world.controls.target.set(0, 0, 0);

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 14;

        world.controls.update();

        world.camera.updateProjectionMatrix();
   
        const objects = [
            "Plant2",
            "Door",
            "Lake",
            "Flower",
            "Bush",
            "River",
            "gardengrasone",
            "gardengrastwo",
            "gardengrasthree",
            "GardenSmallFlowerone",
            "GardenSmallFlowertwo",
            "GardenPlant",
            "GardenPlantTwo"
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = garden.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });


    });

    loader.load("/models/Moth.glb", (gltf) => {
        const moth = gltf.scene;
        world.scene.add(moth);

        moth.position.set(-1.6, -0.2, 2);

      refs.moth = moth;

    registerAnimal("moth", moth, world.scene);

        const objects = [
            "Moth",
        ];
            });

      
}