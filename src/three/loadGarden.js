import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadGarden(world, refs) {
    const loader = new GLTFLoader();

    loader.load("/models/garden.glb", (gltf) => {
        const garden = gltf.scene;
        world.scene.add(garden);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(garden);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        garden.position.sub(center);

        // compute bounding sphere (radius)
        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        const radius = sphere.radius;

        // compute an appropriate camera distance so the whole model fits in view.
        // using vertical fov (camera.fov is degrees)
        const fov = world.camera.fov * (Math.PI / 180); // radians
        // distance so that sphere fits vertically in frustum: d = r / sin(fov/2)
        let distance = radius / Math.sin(fov / 0.8);

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

  world.controls.minDistance = 0.1;
    world.controls.maxDistance = 14;


        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;




        world.controls.update();
     



        world.camera.updateProjectionMatrix();

        refs.plant2 = garden.getObjectByName("Plant2");
        if (refs.plant2) {
            refs.plant2BaseScale = refs.plant2.scale.clone();
            console.log("Plant2 found");
        }

        refs.door = garden.getObjectByName("Door");
        if (refs.door) {
            console.log("Door found");
        }

        refs.lake = garden.getObjectByName("Lake");
        if (refs.lake){
             console.log("Lake found");
        }


    });
}