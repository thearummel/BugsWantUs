import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { registerAnimal } from "./animals";

const loader = new GLTFLoader();

export function loadLadybird(scene) {
  return new Promise((resolve, reject) => {
    if (!scene) {
      reject(new Error("loadLadybird: scene is required"));
      return;
    }

    loader.load(
      "/ladybird.glb",

      (gltf) => {
        const ladybird = gltf.scene;

        ladybird.name = "ladybird";

        // Initial position.
        // animate.js can move it later.
        ladybird.position.set(0, 0, 0);

        // Adjust this once you know the model's desired size.
        ladybird.scale.setScalar(100);

        // Register with the animal system.
        // registerAnimal() also adds it to the scene.
        registerAnimal(
          "ladybird",
          ladybird,
          scene
        );

        console.log("Ladybird registered:", ladybird);

        resolve(ladybird);
      },

      (progress) => {
        if (progress.total) {
          console.log(
            `Ladybird loading: ${(
              (progress.loaded / progress.total) *
              100
            ).toFixed(0)}%`
          );
        }
      },

      (error) => {
        console.error(
          "Failed to load ladybird.glb:",
          error
        );

        reject(error);
      }
    );
  });
}

