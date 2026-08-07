import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js"; 

export function loadKitchen(world, refs) {

    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/kitchen.glb", (gltf) => {

        let kitchen = gltf.scene;
        world.scene.add(kitchen);


        let box = new THREE.Box3().setFromObject(kitchen);
        let center = box.getCenter(new THREE.Vector3());

        kitchen.position.sub(center);


        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        const radius = sphere.radius;

        // compute an appropriate camera distance so the whole model fits in view.
        // using vertical fov (camera.fov is degrees)
        const fov = world.camera.fov * (Math.PI / 180); // radians
        // distance so that sphere fits vertically in frustum: d = r / sin(fov/2)
        let distance = radius / Math.sin(fov / 0.65);

        // place camera straight on along +Z axis looking to origin
        world.camera.position.set(0, 0, distance);
       
        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 6;


        world.controls.update();
   
  world.camera.updateProjectionMatrix();

        refs.bowl = kitchen.getObjectByName("Bowl");
        if (refs.bowl) {
            console.log("bowl found");
        }

        refs.sink = kitchen.getObjectByName("Sink");
        if (refs.sink) {
            console.log("sink found");
        }

    });

}