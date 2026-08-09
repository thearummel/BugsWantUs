"use client";

import { useEffect, useRef, useState } from "react";
import { setupScene } from "@/three/setupScene";
import { loadBush } from "@/three/loadBush";
import { setupInteractions } from "@/three/interactions";
import { animate } from "@/three/animate";
import { useRouter } from "next/navigation";
import Loader from "./Loader/Loader";
import "./Loader/Loader.css";

export default function BushScene() {

    const [loading, setLoading] = useState(true);

    let canvasRef = useRef(null);
    let router = useRouter();

    useEffect(() => {

        let world = setupScene(canvasRef.current);
        world.loadingManager.onLoad = () => {
            setLoading(false);
        };



        let refs = {
            plant2: null,
            plant2BaseScale: null,
            door: null
        };
        let state = {
            targetZ: 20
        };


        loadBush(world, refs, () => {
            setLoading(false);
        });
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
            world.renderer.domElement = null

        };

    }, []);

    return (
        <>
            {loading && <Loader />}

            <canvas
                ref={canvasRef}
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "block"
                }}
            />
        </>
    );

}