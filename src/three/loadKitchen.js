import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addSparkles } from "./sparkels.js";
import { isCollected } from "./animals.js";

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

       
        const fov = world.camera.fov * (Math.PI / 180); // radians
        let distance = radius / Math.sin(fov / 0.65);

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


        const clickableObjects = [
            "Bowl",
            "Sink",
        ];

        clickableObjects.forEach(name => {
            const object = kitchen.getObjectByName(name);

          if (object) {
        if ((name === "Bowl" && isCollected("fly"))|| (name === "Sink" && isCollected("silverfish"))) {
            return;
        }

        refs[`${name.toLowerCase()}sparkles`] =
            addSparkles(object, world);
    }
});

    });



}