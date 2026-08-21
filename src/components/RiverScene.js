"use client";

import { useEffect, useRef, useState } from "react";
import { setupScene } from "@/three/setupScene";
import { loadRiver } from "@/three/loadRiver";
import { setupInteractions } from "@/three/interactions";
import { animate } from "@/three/animate";
import { useRouter } from "next/navigation";
import Loader from "./Loader/Loader";
import "./Loader/Loader.css";

export default function RiverScene() {

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

        


        loadRiver(world, refs, () => {
            setLoading(false);
        });


       
        let cleanupInteractions = setupInteractions(
            world,
            refs,
              
            router
        );

    
        let cleanupAnimation = animate(
            world,
            refs,
        );
        return () => {

            cleanupAnimation?.();
            cleanupInteractions?.();
            world.controls?.dispose();
            world.renderer?.dispose();
            world.renderer.domElement = null;

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