"use client";

import { useEffect, useRef } from "react";
import { setupLadybirdScene } from "@/three/setupLadybirdScene";
import { createLadybird } from "./LadybirdScene";
import { animate } from "@/three/animate";

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

    const world = setupLadybirdScene(
      canvasRef.current
    );

    let cleanupAnimation;

    async function load() {
      const ladybirdData =
        await createLadybird(
          world.scene,
          refs.current
        );

      if (!ladybirdData) return;

      console.log(
        "Ladybird refs:",
        refs.current
      );


      refs.current.ladybirdStarted =
        ladybirdStarted;

      cleanupAnimation = animate(
        world,
        refs.current
      );
    }

    load();

    return () => {
      if (cleanupAnimation) {
        cleanupAnimation();
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