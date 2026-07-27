import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

        // compute bounding sphere (radius)
        const sphere = new THREE.Sphere();
        box.getBoundingSphere(sphere);
        const radius = sphere.radius;

        // compute an appropriate camera distance so the whole model fits in view.
        // using vertical fov (camera.fov is degrees)
        const fov = world.camera.fov * (Math.PI / 180); // radians
        // distance so that sphere fits vertically in frustum: d = r / sin(fov/2)
        let distance = radius / Math.sin(fov / 0.8);


        // place camera straight on along +Z axis looking to origin
        world.camera.position.set(0, 0, distance);

        world.camera.lookAt(0, 0, 0);

        // set control target to origin (the model is centered at origin now)
        world.controls.target.set(0, 0, 0);

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
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = garden.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });


    });
}