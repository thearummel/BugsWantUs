"use client";

import { useEffect, useRef, useState } from "react";
import { setupScene } from "@/three/setupScene";
import { loadBeetle } from "@/three/loadBeetle";
import { setupInteractions } from "@/three/interactions";
import { animate } from "@/three/animate";
import { useRouter } from "next/navigation";

export default function BeetleScene() {

    const [loading, setLoading] = useState(true);
   
    let canvasRef = useRef(null);
    let router = useRouter();

    useEffect(() => {

        let world = setupScene(canvasRef.current);
        world.loadingManager.onLoad = () => {
            setLoading(false);
        };

        let refs = {
           
        };
        let state = {
            targetZ: 20
        };


        loadBeetle(world, refs);

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