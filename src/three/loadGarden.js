import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";
import { addSparkles } from "./sparkels.js";

function saveCameraPosition(world) {
    let cameraData = {
        position: {
            x: world.camera.position.x,
            y: world.camera.position.y,
            z: world.camera.position.z,
        },
        target: {
            x: world.controls.target.x,
            y: world.controls.target.y,
            z: world.controls.target.z,
        }
    };

    localStorage.setItem(
        "gardenCamera",
        JSON.stringify(cameraData) //https://www.youtube.com/watch?v=AwicscsvGLg
    );
}

function restoreCameraPosition(world) {
    let saved = localStorage.getItem("gardenCamera");

    if (!saved) {
        return false;
    }

    try {
        const cameraData = JSON.parse(saved);

        world.camera.position.set(
            cameraData.position.x,
            cameraData.position.y,
            cameraData.position.z
        );

        world.controls.target.set(
            cameraData.target.x,
            cameraData.target.y,
            cameraData.target.z
        );

        world.controls.update();

        return true;
    } catch (error) {
        console.error("Could not restore camera position:", error);
        return false;
    }
}

export function loadGarden(world, refs) {
    const loader = new GLTFLoader(world.loadingManager);

    loader.load("/models/garden.glb", (gltf) => {
        let garden = gltf.scene;
        world.scene.add(garden);

        const box = new THREE.Box3().setFromObject(garden);
        const center = box.getCenter(new THREE.Vector3());

        garden.position.sub(center);

    
        let restored = restoreCameraPosition(world);

     
        if (!restored) {
            world.camera.position.set(0, 0, 15);

            let narrow = window.innerHeight;

            if (narrow >= 900) {
                world.camera.position.set(0, 0, 14);
            } else if (narrow <= 300) {
                world.camera.position.set(0, 0, 13);
            }

            world.controls.target.set(0, -0.6, 0);
        }

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 15;

        world.controls.update();
        world.camera.updateProjectionMatrix();

       
        world.controls.addEventListener("change", () => {
            saveCameraPosition(world);
        });

        const objects = [
            "Plant2",
            "Door",
            "Lake",
            "Flower",
            "Anthill",
            "Bush",
            "River",
            "gardengrasone",
            "gardengrastwo",
            "gardengrastthree",
            "GardenSmallFlowerone",
            "GardenSmallFlowertwo",
            "GardenPlant",
            "GardenPlantTwo"
        ];

        objects.forEach(name => {
            const object = garden.getObjectByName(name);

            refs[name.toLowerCase()] = object;

            if (object) {
                console.log(`${name} found`);
            }
        });

    
        const clickableObjects = [
            "Door",
            "Bush",
            "Lake",
            "Anthill",
            "River"
        ];

        clickableObjects.forEach(name => {
            const object = garden.getObjectByName(name);

            if (object) {
                refs[`${name.toLowerCase()}sparkles`] =
                    addSparkles(object, world);
            }
        });

    });



    loader.load("/models/Moth.glb", (gltf) => {
        const moth = gltf.scene;

        moth.position.set(-1.5, -1.6, 2);
        const objects = [
            "MothAntenna",
            "MothAntennaTwo",
        ];

        objects.forEach(name => {
            refs[name.toLowerCase()] = moth.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }
        });
        refs.moth = moth;
        registerAnimal("moth", moth, world.scene);
    });
}