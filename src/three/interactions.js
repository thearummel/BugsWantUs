// src/three/interactions.js

import { getObject, collectAnimal, getCollectedIds } from "./animals.js";



export function setupInteractions(world, refs, router) {

  const animalClickSound = new Audio("/audio/soundreality-pop-423717.mp3");
  animalClickSound.volume = 0.2;

  const animalIds = [
    "fly",
    "beetlebody",
    "moth",
    "yellowsally",
    "silverfish",
    "butterfly",
    "grashopper",
    "ladybird",
    "ant",
  ];
  function handleAllAnimalsCollected() {
    setTimeout(() => {
      router.push("/Finale");
    }, 3000);
  }

  window.addEventListener("allAnimalsCollected", handleAllAnimalsCollected);

  function onClick(event) { //https://www.ramijames.com/learn-threejs/interaction/raycasting-and-mouse-events
    world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    world.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    world.raycaster.setFromCamera(world.mouse, world.camera);


    const interactables = [
      {
        object: refs.door, action: () => router.push("/Kitchen")
      },
      { object: refs.lake, action: () => router.push("/Beetle") },
      { object: refs.bowl, action: () => router.push("/Counter") },
      {
        object: refs.garden,action: () => router.push("/Garden")
      },
      { object: refs.anthill, action: () => router.push("/Anthill") },
      { object: refs.flower, action: () => router.push("/Flowers") },
      { object: refs.bush, action: () => router.push("/Bush") },
      { object: refs.river, action: () => router.push("/River") },
      { object: refs.sink, action: () => router.push("/Sink") },
    ];

    for (let item of interactables) {
      if (!item.object) continue;
      const hits = world.raycaster.intersectObject(item.object, true);
      if (hits.length > 0) {

        item.action();

        return;
      }
    }

    for (const id of animalIds) {
      const obj = getObject(id);
      if (!obj) continue;
      if (getCollectedIds().includes(id)) continue;
      const hits = world.raycaster.intersectObject(obj, true);

      if (hits.length > 0) {
        animalClickSound.currentTime = 0;
        animalClickSound.play().catch((error) => {
          console.warn("Could not play animal sound:", error);
        });

        collectAnimal(id);
        return;
      }
    }

  }

  function onMouseMove(event) {
    world.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    world.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    world.raycaster.setFromCamera(world.mouse, world.camera);

    const interactables = [
      refs.door,
      refs.lake,
      refs.bowl,
      refs.garden,
      refs.anthill,
      refs.flower,
      refs.bush,
      refs.river,
      refs.sink,
    ].filter(Boolean);

    for (const object of interactables) {
      if (world.raycaster.intersectObject(object, true).length > 0) {
        world.renderer.domElement.style.cursor = "pointer";
        return;
      }
    }

    for (const id of animalIds) {
      const obj = getObject(id);
      if (!obj) continue;

      if (getCollectedIds().includes(id)) continue;

      if (world.raycaster.intersectObject(obj, true).length > 0) {
        world.renderer.domElement.style.cursor = "pointer";
        return;
      }
    }

    world.renderer.domElement.style.cursor = "default";
  }


  

  function onResize() {
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();
    world.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener("click", onClick);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("resize", onResize);


  return () => {
    window.removeEventListener("click", onClick);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);
    window.removeEventListener(
      "allAnimalsCollected",
      handleAllAnimalsCollected
    );
  };
}