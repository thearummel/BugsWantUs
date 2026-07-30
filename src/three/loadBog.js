
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadBog(world, refs) {
    const loader = new GLTFLoader();

    loader.load("/models/Bog.glb", (gltf) => {
        const bog = gltf.scene;
        world.scene.add(bog);

        // compute bounding box & sphere BEFORE we recenter the model
        const box = new THREE.Box3().setFromObject(bog);

        const center = box.getCenter(new THREE.Vector3());

        // move model so center sits at (0,0,0)
        bog.position.sub(center);


        world.camera.position.set(0, 0, 7);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 7;
        world.controls.update();


        world.camera.updateProjectionMatrix();

        refs.garden = bog.getObjectByName("Forest");
        if (refs.garden) {
            console.log("garden found");
        }


        const objects = [
            "Clouds",
            "BogPlantTwo",
            "BogPlantOne",
        
        ];

        objects.forEach(name => {

            refs[name.toLowerCase()] = bog.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }

        });


    });
}