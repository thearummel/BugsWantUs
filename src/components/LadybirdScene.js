import { loadLadybird } from "../three/loadLadybird";
import { registerAnimal } from "../three/animals";

export async function createLadybird(scene, refs) {
  try {
    const gltf = await loadLadybird(refs);

    const ladybird = gltf.scene;

    ladybird.name = "ladybird";
    ladybird.userData.animalId = "ladybird";

    ladybird.scale.setScalar(1.5);

    ladybird.position.set(-7, 0, 0);

 

    registerAnimal(
      "ladybird",
      ladybird,
      scene
    );

    return {
      object: ladybird,
      animations: gltf.animations,
    };

  } catch (error) {
    console.error(
      "Could not create ladybird:",
      error
    );

    return null;
  }
}