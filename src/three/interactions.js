// src/three/interactions.js
import * as THREE from "three";
import { getObject, collectAnimal } from "./animals.js";

export function setupInteractions(world, refs, state, router) {
  function onWheel(event) {
    state.targetZ += event.deltaY * 0.01;
    state.targetZ = THREE.MathUtils.clamp(state.targetZ, 10, 30);
  }

  const animalIds = [
    "fly",
    "beetlebody",
    "moth",
    "yellowsally",
    "silverfish",
    "butterfly",
    "grashopper",
    "ladybird",
    "bee"
      ];

  function onClick(event) {
    world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    world.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    world.raycaster.setFromCamera(world.mouse, world.camera);

    // Static interactables (doors, bowls, etc.)
    const interactables = [
      { object: refs.door, action: () => router.push("/Kitchen") },
      { object: refs.lake, action: () => router.push("/Beetle") },
      { object: refs.bowl, action: () => router.push("/Counter") },
      { object: refs.garden, action: () => router.push("/Garden") },
      { object: refs.flower, action: () => router.push("/Flowers") },
      { object: refs.bush, action: () => router.push("/Bush") },
      { object: refs.river, action: () => router.push("/River") },
      { object: refs.sink, action: () => router.push("/Sink") },
    ];

    for (const item of interactables) {
      if (!item.object) continue;
      const hits = world.raycaster.intersectObject(item.object, true);
      if (hits.length > 0) {
        item.action();
        return;
      }
    }

    // Animal collection: check each registered animal at click time
    for (const id of animalIds) {
      const obj = getObject(id);
      if (!obj) continue; // not loaded yet
      const hits = world.raycaster.intersectObject(obj, true);
      if (hits.length > 0) {
        collectAnimal(id);
        return;
      }
    }
  }

  function onResize() {
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();
    world.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("wheel", onWheel);
  window.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);

  // cleanup function — ALWAYS returned
  return () => {
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("click", onClick);
    window.removeEventListener("resize", onResize);
  };
}