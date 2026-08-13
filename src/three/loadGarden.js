import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals.js";

function saveCameraPosition(world) {
    const cameraData = {
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
        JSON.stringify(cameraData)
    );
}

function restoreCameraPosition(world) {
    const saved = localStorage.getItem("gardenCamera");

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
        const garden = gltf.scene;
        world.scene.add(garden);

        const box = new THREE.Box3().setFromObject(garden);
        const center = box.getCenter(new THREE.Vector3());

        garden.position.sub(center);

        // Try to restore previous camera position
        const restored = restoreCameraPosition(world);

        // If there is no saved position, use the default
        if (!restored) {
            world.camera.position.set(0, 0, 15);

            const narrow = window.innerHeight;

            if (narrow >= 900) {
                world.camera.position.set(0, 0, 14);
            } else if (narrow <= 300) {
                world.camera.position.set(0, 0, 13);
            }

            world.controls.target.set(0, -0.7, 0);
        }

        world.controls.minDistance = 0.1;
        world.controls.maxDistance = 15;

        world.controls.update();
        world.camera.updateProjectionMatrix();

        // Save camera whenever user moves it
        world.controls.addEventListener("change", () => {
            saveCameraPosition(world);
        });

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
            "GardenSmallFlowerone",
            "GardenSmallFlowertwo",
            "GardenPlant",
            "GardenPlantTwo"
        ];

        objects.forEach(name => {
            refs[name.toLowerCase()] = garden.getObjectByName(name);

            if (refs[name.toLowerCase()]) {
                console.log(`${name} found`);
            }
        });
    });

    loader.load("/models/Moth.glb", (gltf) => {
        const moth = gltf.scene;

        moth.position.set(-1.6, -1.2, 2);

        refs.moth = moth;
        registerAnimal("moth", moth, world.scene);
    });
}