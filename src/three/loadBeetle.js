import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadBeetle(world, refs) {

    let loader = new GLTFLoader();

    loader.load("/models/Beetle.glb", (gltf) => {

        let beetle = gltf.scene;
        world.scene.add(beetle);


        let box = new THREE.Box3().setFromObject(beetle);
        let size = box.getSize(new THREE.Vector3());
        let center = box.getCenter(new THREE.Vector3());

        beetle.position.sub(center);


   
        // place camera straight on along +Z axis looking to origin
        world.camera.position.set(1, 0, 7.6 );
        world.camera.lookAt(0, 0, 0);

        // set control target to origin (the model is centered at origin now)
        world.controls.target.set(0, 0, 0);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 8;


        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;




        world.controls.update();



    });

}