"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupLadybirdScene } from "@/three/setupLadybirdScene";
import { createLadybird } from "./LadybirdScene";
import { animate } from "@/three/animate";
import { collectAnimal } from "@/three/animals"; 

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
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    async function load() {
      const ladybirdData = await createLadybird(world.scene, refs.current);

      if (!ladybirdData) return;

      console.log("Ladybird refs:", refs.current);

      refs.current.ladybirdStarted = ladybirdStarted;

      cleanupAnimation = animate(world, refs.current);

      function onPointerDown(e) {
        const lady = refs.current.ladybird;
        if (!lady) return;

      
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, world.camera);

        const hits = raycaster.intersectObject(lady, true);
        if (hits.length > 0) {
          collectAnimal("ladybird");
        }
      }

      window.addEventListener("pointerdown", onPointerDown);

      
      refs.current._onPointerDown = onPointerDown;
    }

    load();

    return () => {
      if (cleanupAnimation) cleanupAnimation();
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