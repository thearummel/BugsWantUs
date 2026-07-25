"use client";

import { useEffect, useRef } from "react";

import { setupScene } from "@/three/setupScene";
import { loadFlowers } from "@/three/loadFlowers";
import { setupInteractions } from "@/three/interactions";
import { animate } from "@/three/animate";
import { useRouter } from "next/navigation";

export default function FlowerScene() {

    let canvasRef = useRef(null);
    let router = useRouter();

    useEffect(() => {

        let world = setupScene(canvasRef.current);


  
        let refs = {
            plant2: null,
            plant2BaseScale: null,
            door: null
        };
        let state = {
        targetZ: 20
};

      
        loadFlowers(world, refs);

        // Setup mouse / resize / click events
let cleanupInteractions = setupInteractions(
    world,
    refs,
    state,
    router
);

        // Start render loop
       let cleanupAnimation = animate(
    world,
    refs,
    state
);
        return () => {

            cleanupAnimation();
            cleanupInteractions();

            world.controls.dispose();
            world.renderer.dispose();

        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100vw",
                height: "100vh",
                display: "block"
            }}
        />
    );

}