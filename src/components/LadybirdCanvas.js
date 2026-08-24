"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupLadybirdScene } from "@/three/setupLadybirdScene";
import { createLadybird } from "./LadybirdScene";
import { animate } from "@/three/animate";
import { collectAnimal } from "@/three/animals"; // <-- ADD THIS

export default function LadybirdCanvas({
  ladybirdStarted,
}) {
  const canvasRef = useRef(null);

  const refs = useRef({
    ladybird: null,
    ladybirdlegone: null,
    ladybirdlegtwo: null,
    ladybirdlegthree: null,
    ladybirdlegfour: null,
    ladybirdlegfive: null,
    ladybirdlegsix: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const world = setupLadybirdScene(canvasRef.current);

    let cleanupAnimation;
    // create local raycaster & mouse for ladybird interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    async function load() {
      const ladybirdData = await createLadybird(world.scene, refs.current);

      if (!ladybirdData) return;

      console.log("Ladybird refs:", refs.current);

      refs.current.ladybirdStarted = ladybirdStarted;

      cleanupAnimation = animate(world, refs.current);

      // Add a pointer handler that raycasts against the ladybird using world.camera
      function onPointerDown(e) {
        // don't handle if ladybird not present or already collected
        const lady = refs.current.ladybird;
        if (!lady) return;

        // compute normalized device coords relative to the canvas
        // If the canvas is full-screen you can use window inner dims:
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, world.camera);

        const hits = raycaster.intersectObject(lady, true);
        if (hits.length > 0) {
          // call existing collection helper
          collectAnimal("ladybird");
        }
      }

      window.addEventListener("pointerdown", onPointerDown);

      // keep reference to remove on cleanup
      // attach to cleanup function below by closing over it
      // (we remove inside return below)
      // store it so cleanup can remove it
      refs.current._onPointerDown = onPointerDown;
    }

    load();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
      // remove the pointer listener if we added it
      if (refs.current._onPointerDown) {
        window.removeEventListener("pointerdown", refs.current._onPointerDown);
      }
      world.cleanup();
    };
  }, [ladybirdStarted]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}