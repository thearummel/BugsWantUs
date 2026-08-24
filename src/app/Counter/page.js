

"use client";
import CounterScene from "@/components/CounterScene";
import { useEffect, useRef } from "react";

export default function Counter() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
        }
      }, []);
    
      return (
        <>
         <CounterScene />
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