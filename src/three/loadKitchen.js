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

    

        let maxDim = Math.max(size.x, size.y, size.z);

   world.camera.position.set(
    0,
    0,
    maxDim * 1.6
);
        world.camera.lookAt(20, 0, 20);

        world.controls.target.set(0, 0, 0);
        world.controls.update();



        


    });

}