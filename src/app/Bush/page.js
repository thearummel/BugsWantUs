
"use client";
import BushScene from "@/components/BushScene";
import { useEffect, useRef } from "react";

export default function BushPage() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 1;
        }
      }, []);
    
      return (
        <>
         <BushScene />
          <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/soul_serenity_sounds-leaves-rustling-236742.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}