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

            world.controls.target.set(0, -0.6, 0);
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
            "Anthill",
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
            const object = garden.getObjectByName(name);

            refs[name.toLowerCase()] = object;

            if (object) {
                console.log(`${name} found`);
            }
        });

  setTimeout(() => {
    const door = garden.getObjectByName("Door");

    if (door) {
        door.traverse((child) => {
            if (child.isMesh && child.material) {
                const material = child.material;

                // Save original material state
                const originalEmissive = material.emissive
                    ? material.emissive.clone()
                    : null;

                const originalEmissiveIntensity =
                    material.emissiveIntensity ??   0;

                // Set glow
                material.emissive = new THREE.Color(0xffffff)

                const startTime = performance.now();
                const duration = 20000;      // Effect lasts 10 seconds
                const pulseDuration = 5000;  // Slow pulse
                const maxIntensity = 1;

                function glow(time) {
                    const elapsed = time - startTime;

                    if (elapsed >= duration) {
                        // Restore original material
                        if (originalEmissive) {
                            material.emissive.copy(originalEmissive);
                        }

                        material.emissiveIntensity =
                            originalEmissiveIntensity;

                        return;
                    }

                    // Smooth pulse between 0 and 1
                    const pulse =
                        (Math.sin(
                            (elapsed / pulseDuration) * Math.PI * 2
                        ) + 1) / 2;

                    material.emissiveIntensity =
                        pulse * maxIntensity;

                    requestAnimationFrame(glow);
                }

                requestAnimationFrame(glow);
            }
        });
    }
}, 5000);


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