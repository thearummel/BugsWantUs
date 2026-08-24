
"use client";
import KitchenScene from "@/components/KitchenScene";
import { useEffect, useRef } from "react";

export default function Kitchen() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.1;
        }
      }, []);
    
      return (
        <>
         <KitchenScene />
          <audio
        ref={audioRef}
        autoPlay
     
        preload="auto"
        src="/audio/koiroylers-open-and-close-door-351942.mp3"
        style={{ display: "none" }}
      />
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}