import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadSink(world, refs) {

    let loader = new GLTFLoader();

    loader.load("/models/Silverfish.glb", (gltf) => {

        let sink = gltf.scene;
        world.scene.add(sink);


        let box = new THREE.Box3().setFromObject(sink);
        let center = box.getCenter(new THREE.Vector3());

        sink.position.sub(center);


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
       
        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 2.5;


        world.controls.update();
   
  world.camera.updateProjectionMatrix();


    });

}