import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadSink(world, refs) {
  const loader = new GLTFLoader(world.loadingManager);


    loader.load("/models/Sink.glb", (gltf) => {

        let sink = gltf.scene;
        world.scene.add(sink);


        let box = new THREE.Box3().setFromObject(sink);
        let center = box.getCenter(new THREE.Vector3());

        sink.position.sub(center);


        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        const radius = sphere.radius;

        const fov = world.camera.fov * (Math.PI / 180);
        let distance = radius / Math.sin(fov / 0.65);

        world.camera.position.set(0, 0, distance);

        world.controls.minDistance = 1;
        world.controls.maxDistance = 2.5;



        world.controls.update();

        world.camera.updateProjectionMatrix();


    });

    loader.load("/models/Silverfish.glb", (gltf) => {
        const silverfish = gltf.scene;
  

        silverfish.position.set(-0.9, -0.4, 0);
        silverfish.scale.set(0.5, 0.5, 0.5);

             const objects = [
            "Tail",
            "SilverfishLeg",
        ];

        objects.forEach(name => {
            refs[name.toLowerCase()] = silverfish.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }
        });
        refs.silverfish = silverfish;

        registerAnimal("silverfish", silverfish, world.scene);
    });

}