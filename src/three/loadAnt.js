import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

export function loadAnt(world, refs) {
console.log(refs)
    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/anthill.glb", (gltf) => {

        const anthill = gltf.scene;
        world.scene.add(anthill);

       

        const box = new THREE.Box3().setFromObject(anthill);
        const center = box.getCenter(new THREE.Vector3());

        anthill.position.sub(center);

        world.camera.position.set(0, 20, 8);

        world.controls.target.set(0, 0, 0);

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 8;

        world.controls.update();
        world.camera.updateProjectionMatrix();

    });

    loader.load("/models/ant.glb", (gltf) => {
        const ant = gltf.scene;

        ant.position.set(-3.5, -2.2, 0);
        ant.scale.set(1, 1,1);

         const objects = [
            "antantennatwo",
            "antantennaone",
            "antleglow",
        ];

        objects.forEach(name => {
            refs[name.toLowerCase()] = ant.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }
        });

        refs.ant = ant;
        registerAnimal("ant", ant, world.scene);


    });

}