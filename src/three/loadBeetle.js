import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadBeetle(world, refs) {
 console.log(refs)
   const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/Beetle.glb", (gltf) => {

        let beetle = gltf.scene;
        world.scene.add(beetle);

        let box = new THREE.Box3().setFromObject(beetle);
        let center = box.getCenter(new THREE.Vector3());

        beetle.position.sub(center);



        // place camera straight on along +Z axis looking to origin
        world.camera.position.set(1, 0, 7.6);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.


        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 8;

        world.controls.update();
const objects = [
       "Ranke",
            "BeetlePflanze",

  ];
   objects.forEach(name => {

            refs[name.toLowerCase()] = beetle.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });
    });

    loader.load("/models/BeetleBody.glb", (gltf) => {
        const beetlebody = gltf.scene;

        beetlebody.position.set(-2.7, -1, 3.6);
        beetlebody.scale.set(1, 1, 1);

        refs.beetlebody = beetlebody;
        registerAnimal("beetlebody", beetlebody, world.scene);

        const objects = [
            "beetlewingleft",
            "beetlewingright",
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = beetlebody.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });
    });

}