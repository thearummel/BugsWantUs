import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadKitchen(world, refs) {

    let loader = new GLTFLoader();

    loader.load("/models/kitchen.glb", (gltf) => {

        let kitchen = gltf.scene;
        world.scene.add(kitchen);


        let box = new THREE.Box3().setFromObject(kitchen);
        let size = box.getSize(new THREE.Vector3());
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

        // add a little margin
        // distance *= 1.2;

        // place camera straight on along +Z axis looking to origin
        world.camera.position.set(0, 0, distance);
        world.camera.lookAt(0, 0, 0);

        // set control target to origin (the model is centered at origin now)
        world.controls.target.set(0, 0, 0);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.
        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;




        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 6;


        world.controls.update();
   
  world.camera.updateProjectionMatrix();

        refs.bowl = kitchen.getObjectByName("Bowl");
        if (refs.bowl) {
            console.log("bowl found");
        }





    });

}