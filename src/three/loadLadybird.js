import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export function loadLadybird(refs = {}) {
  return new Promise((resolve, reject) => {
    loader.load(
      "/models/ladybird.glb",

      (gltf) => {
        const ladybird = gltf.scene;

        const objects = [
          "LadybirdLegOne",
          "LadybirdLegTwo",
          "LadybirdLegThree",
          "LadybirdLegFour",
          "LadybirdLegFive",
          "LadybirdLegSix",
        ];

        objects.forEach((name) => {
          const key = name.toLowerCase();

          refs[key] = ladybird.getObjectByName(name);

          if (refs[key]) {
            console.log(`${name} found`);
          } else {
            console.warn(`${name} NOT found`);
          }
        });

   
        refs.ladybird = ladybird;

        resolve(gltf);
      },

      undefined,

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