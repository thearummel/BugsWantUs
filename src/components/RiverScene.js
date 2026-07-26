"use client";

import { useEffect, useRef } from "react";

import { setupScene } from "@/three/setupScene";
import { loadRiver } from "@/three/loadRiver";
import { setupInteractions } from "@/three/interactions";
import { animate } from "@/three/animate";
import { useRouter } from "next/navigation";

export default function RiverScene() {

    let canvasRef = useRef(null);
    let router = useRouter();

    useEffect(() => {

        let world = setupScene(canvasRef.current);



        let state = {
            targetZ: 20
        };


        loadRiver(world);

        // Setup mouse / resize / click events
        let cleanupInteractions = setupInteractions(
            world,
     
            state,
            router
        );

        // Start render loop
        let cleanupAnimation = animate(
            world,
          
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