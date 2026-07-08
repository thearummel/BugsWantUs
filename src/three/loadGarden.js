import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function loadGarden(world, refs) {

    let loader = new GLTFLoader();

    loader.load("/models/garden.glb", (gltf) => {

        let garden = gltf.scene;
        world.scene.add(garden);


        let box = new THREE.Box3().setFromObject(garden);
        let size = box.getSize(new THREE.Vector3());
        let center = box.getCenter(new THREE.Vector3());

        garden.position.sub(center);



        let maxDim = Math.max(size.x, size.y, size.z);


        
        world.camera.position.set(-0.8,5,15)

        world.camera.lookAt(0, 0, 20);

        world.controls.target.set(0, 0, 0);
        world.controls.update();


        refs.plant2 = garden.getObjectByName("Plant2");

        if (refs.plant2) {

            refs.plant2BaseScale = refs.plant2.scale.clone();

            console.log("Plant2 found");
        }



        refs.door = garden.getObjectByName("Door");

        if (refs.door) {
            console.log("Door found");
        }

        console.log(garden);

    });

}