import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


export function loadFinale(world, refs) {

    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/Finale.glb", (gltf) => {

        let finale = gltf.scene;
        world.scene.add(finale);


        let box = new THREE.Box3().setFromObject(finale);
        let center = box.getCenter(new THREE.Vector3());

        finale.position.sub(center);


     world.camera.position.set(0, 0, 6);

        // Restrict vertical rotation to be "straight on" (no tilt) if you want:
        // This will lock the polar angle so camera cannot tilt up/down.

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 6;
        world.controls.update();


        world.camera.updateProjectionMatrix();

      

    

    });



}