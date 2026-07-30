import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadRiver(world, refs) {

    let loader = new GLTFLoader();

    loader.load("/models/byRiver.glb", (gltf) => {

        let river = gltf.scene;
        world.scene.add(river);


        let box = new THREE.Box3().setFromObject(river);
        let center = box.getCenter(new THREE.Vector3());

        river.position.sub(center);


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
        world.controls.maxDistance = 6;


        world.controls.update();

        world.camera.updateProjectionMatrix();

    

        const objects = [
            "RiverGrasOne",
            "RiverGrasTwo",
            "RiverGrasThree"
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = river.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });

    });


    loader.load("/models/YellowSally.glb", (gltf) => {
        const yellowsally = gltf.scene;
        world.scene.add(yellowsally);

        yellowsally.position.set(0, -0.06, 0);
        yellowsally.scale.set(11, 11, 11);

           const objects = [
            "SallyBody",
            "SallyLegTwo",
            "SallyLegOne",
            "SallyLegLow",
            "SallyLegMiddle",
        ]
         objects.forEach(name => {

            refs[name.toLowerCase()] = yellowsally.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });

    });


}