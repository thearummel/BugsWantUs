
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js"; 
import { addSparkles } from "./sparkels.js";

export function loadBog(world, refs) {
       const loader = new GLTFLoader(world.loadingManager);


    loader.load("/models/Bog.glb", (gltf) => {
        const bog = gltf.scene;
        world.scene.add(bog);

         const box = new THREE.Box3().setFromObject(bog);

        const center = box.getCenter(new THREE.Vector3());

       
        bog.position.sub(center);


        world.camera.position.set(0, 0, 7);


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


        const clickableObjects = [
           "Forest",
        ];

        clickableObjects.forEach(name => {
            const object = bog.getObjectByName(name);

            if (object) {
                refs[`${name.toLowerCase()}sparkles`] =
                    addSparkles(object, world);
            }
        });

    });


    loader.load("/models/Grashopper.glb", (gltf) => {
        const grashopper = gltf.scene;

        const objects =[
            "GrashopperAntenna",
        ];
        objects.forEach(name => {
            refs[name.toLowerCase()] = grashopper.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }
        });
         grashopper.position.set(-3.25, -1.2, 4.2);
       /*  grashopper.scale.set(2, 2, 2); */

        refs.grashopper = grashopper;

        registerAnimal("grashopper", grashopper, world.scene);



       
    });

}